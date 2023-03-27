const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/user');
const Comment = require('../models/comment');


// const followUser = require('../follow');

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().limit(20);
        res.send(posts);
    } catch (error) {
        res.json({ message: error });
    }
});

// CREATE NEW POST
router.post('/:userId/post', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
        });
        await post.save();
        user.posts1.push(post);
        await user.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// GET SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.send(post);
    } catch (error) {
        res.json({ message: error });
    }
});

// UPDATE
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title, description: req.body.description } }
        );
        console.log(updatedPost);
        res.send(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// DELETE
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.send(removedPost);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

const followUser = async (followerId, followeeUsername) => {
    try {
      // Find the followee user
      const followee = await User.findOne({ username: followeeUsername });
  
      // If the followee user exists
      if (followee) {
        // Update the followers list of the followee user
        followee.followers.push(followerId);
        await followee.save();
  
        console.log(`User ${followerId} is now following ${followeeUsername}`);
      } else {
        console.log(`User ${followeeUsername} not found`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  
//how to write code for follow user in nodejs?
router.post('/follow/:followerId/:followeeId', async (req, res) => {
    try {
        if (req.params.followerId === req.params.followeeId) {
            return res.status(400).json({ message: "Follower and followee cannot be the same" });
          }
      
    //   const user = await User.findOne({ username: req.params.name });

        // await followUser(req.params.userId,"sai")
        const followee = await User.findById(req.params.followeeId);
        const follower = await User.findById(req.params.followerId); //63e15ecaf122161c88129c5d
       await followee.followers.push(follower);
        await followee.save();
        res.send(followee);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error });
    }
}); 

// CREATE NEW COMMENT FOR A POST
router.post('/:userId/:postId/comments', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const comment = new Comment({
            content: req.body.content,
            author: user.username,
            post: post._id
        });
        const savedComment = await comment.save();

        post.comments.push(savedComment._id);

        await post.save();
        

        res.status(200).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/user', async (req, res) => {
    try {
    //     const user = await User.findById(req.params.userId);
    //    await user.followers.push(req.params.userId);
    //     await user.save();
    //     res.send(user);
    const user = new User({
        username: req.body.username
        // description: req.body.description,
    });

    const savedPost = await user.save()
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        }).catch((err) => {
            res.status(404).send(err);
            console.log(err);
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error });
    }
}); 

module.exports = router;