import express from "express";
import bodyParser from "body-parser"; 

const app = express();
const port = 3000;
const blogs = [];

// middleware for geting access to the request that the user makes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req, res)=>{
    res.render("index.ejs");
})
app.post("/add",(req, res) =>{
    res.render("add.ejs",{blogs});
})

app.post("/submit",(req,res)=>{
    // adding post to the index 0 in blogs=[] array;
    blogs.unshift(req.body);
    res.render("index.ejs",{blogs});
})

app.post("/edit",(req,res)=>{
    const blog = JSON.parse(req.body["blog-post"]);
    const index = blogs.findIndex(item => item.title === blog.title);
    const pTitle = blog.title;
    const pContent = blog.content;
    // now to edit ,i need to replace the existing value with a new value.
    // sending the previous title and content to the edit file 
    res.render("edit.ejs",{pTitle,pContent,index})
    // console.log(pTitle+pContent);

})

app.post("/update",(req,res)=>{
    // replace the prev dec with the new one using splice
    blogs.splice(req.body.index,1,req.body);
    console.log(blogs);
    res.render("index.ejs",{blogs});
});

app.post("/cancell",(req,res)=>{
    res.render("index.ejs", {blogs});
})

app.post("/delete",(req,res)=>{
    const blog = JSON.parse(req.body["blog-post"]);
    const index = blogs.findIndex(item => item.title === blog.title);
    // deleting means removing the file from the blogs array
    blogs.splice(index,1);
    res.render("index.ejs",{blogs});
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})