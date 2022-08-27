const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// const aboutContent = "Hello, my name is Weiqian Ni, and this is my personal blog website. I will update my thoughts and any interest things I have seen on this site from time to time. Hopefully in the future this blog will be full of content. If you are interested and want to know more about me, please find the details in the Contact Page:)";
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-pete:<password>@cluster0.rmzh4kn.mongodb.net/?retryWrites=true&w=majority");

const postSchema = {
  title:String,
  content:String
};

const Post = mongoose.model("Post",postSchema);

app.get("/", function(req, res){
  Post.find((err,results)=>{
    res.render("home", {
      posts: results
      });
  });
});

app.get("/about", function(req, res){
  res.render("about");
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId", (req, res)=>{
  const requestedId = req.params.postId;
  Post.findOne({_id: requestedId},(err, result)=>{
    if(result){
      res.render("post",{
        title:result.title,
        content:result.content
      })
    }
  });
});
// process.env.PORT
app.listen(process.env.PORT, function() {
  console.log("Server started");
});
