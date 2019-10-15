const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function (req,res) {
    db.post.findAll().then(function(posts) {
        res.render('posts/show', {posts})
    })
});

router.get('/:id', function(req,res) {
    db.post.findByPk(parseInt(req.params.id))
    .then(function(post) {
        post.getAuthor().then(function(author) {
            post.getComments().then(function(comments) {
                res.render('posts/show', {post, author, comments})
            })
        })
    })
});

//PUT / Post Comment
router.post('/:id/', function(req,res) {
    db.post.findByPk(parseInt(req.params.id))
    .then(function(post) {
        post.createComment(req.body).then(function(comment) {
            res.redirect(`/posts/${post.id}`)
        })
    })
})

module.exports = router;