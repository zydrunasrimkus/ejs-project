const express = require("express");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
const port = 3000;
const content = require(__dirname + "/content.js");

mongoose.connect(
  "mongodb+srv://godlesas:test123@cluster0.ijgn0.mongodb.net/blogDB",
  { useNewUrlParser: true }
);

const postSchema = {
  postTitle: String,
  postText: String,
};

const Post = mongoose.model("Post", postSchema);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let homeStartingContent = content.homeStartingContent();
  Post.find({}, (err, posts) => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/about", (req, res) => {
  let aboutContent = content.aboutContent();
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contactus", (req, res) => {
  let contactContent = content.contactContent();
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = new Post({
    postTitle: req.body.postTitle,
    postText: req.body.postText,
  });
  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, (err, post) => {
    res.render("post", {
      postTitle: post.postTitle,
      postText: post.postText,
    });
  });
  /*     posts.forEach(post => {
        if (_.lowerCase(req.params.id) == _.lowerCase(post.postTitle)) {
            res.render('post', {postTitle: post.postTitle, postText: post.postText});
        } else {
            console.log('error');
        }
    }); */
});

app.listen(process.env.PORT || port, () => {
  console.log("Server running on port " + port);
});
