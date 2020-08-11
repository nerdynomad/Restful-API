const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')

//Getting all the posts
router.get('/', async (req,res) => {
    try {
        const allPosts = await Post.find().limit(5)
        res.status(200).json(allPosts)
    } catch (err) {
        res.status(500).send('Server Error')        
    }    
})

//Saving the post in database
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })  
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).send('Server Error')         
    }
          
}) 

//Getting a specific post
router.get('/:postId', async (req,res) => {
    try {
        const getPostyID = await Post.findById({_id: req.params.postId})         
        res.status(200).json(getPostyID)
    } catch (err) {
        res.status(500).send('Server Error') 
    }
    
})

//Deleting a post
router.delete('/:postId', async (req,res) =>{
    try {
        await Post.findByIdAndRemove({_id: req.params.postId})
        res.status(200).send('Deleted')
    } catch (err) {
        res.status(500).send('Server Error')     
    }
})

//Updating a post
router.patch('/:postId', async (req,res) =>{
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, {$set:{title:req.body.title}})
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).send('Server Error')     
    }
})

module.exports = router