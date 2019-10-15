const express = require('express');
const router = express.Router();
const db = require('../models');

//GET / authors
router.get('/', function(req,res) {
    db.author.findAll().then(function(authors) {
        res.render('authors/index', {authors});
    });
});

//GET / new authors
router.get('/new', function (req,res) {
    res.render('authors/new');
});

//PUT / New author
router.post('/', function(req,res) {
    db.author.create(req.body)
    .then(function(author) {
        res.redirect('/authors', {author})
    });
});

//GET / One author
router.get('/:id', function(req,res) {
    db.author.findByPk(parseInt(req.params.id))
    .then(function(author) {
        author.getPosts().then(function(posts) {
            res.render('authors/show', {author, posts})
        })
    })
})

//PUT / Author post
router.post('/:id/', function(req,res) {
    db.author.findByPk(parseInt(req.params.id))
    .then(function(author) {
        author.createPost(req.body).then(function(post) {
            res.redirect(`/authors/${author.id}`)
        })
    })
})

module.exports = router;

