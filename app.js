const express = require('express');
const ejs = require('ejs');
const app = express();
const _ = require('lodash');
const port = 3000;
const content = require(__dirname + "/content.js");

let posts = [];

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));


app.get('/', (req,res) => {
    let homeStartingContent = content.homeStartingContent();

    res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
});

app.get('/about', (req,res) => {
    let aboutContent = content.aboutContent();
    res.render("about", {aboutContent: aboutContent});
});

app.get('/contactus', (req,res) => {
    let contactContent = content.contactContent();
    res.render("contact", {contactContent: contactContent});
});

app.get('/compose', (req,res) => {
    res.render("compose");
});

app.post('/compose', (req,res) => {
    const blogPost = {
        postTitle: req.body.postTitle,
        postText: req.body.postText
    }
    posts.push(blogPost);
    res.redirect('/');
});

app.get('/posts/:id', (req,res) => {
    posts.forEach(post => {
        if (_.lowerCase(req.params.id) == _.lowerCase(post.postTitle)) {
            res.render('post', {postTitle: post.postTitle, postText: post.postText});
        } else {
            console.log('error');
        }
    });
});



app.listen(process.env.PORT || port, () => {
    console.log('Server running on port ' + port);
});