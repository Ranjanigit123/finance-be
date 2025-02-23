// loanRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get("/getAllPosts", postController.getAllPosts);

router.get("/getPostById/:postId", postController.getPostById);

router.get("/getMyPosts", postController.getMyPosts);

router.post("/createPost", postController.createPost);

router.put("/updatePost/:postId", postController.updatePost);

router.delete("/deletePost/:postId", postController.deletePost);


router.put('/update-balance/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id); // Correct model name
      if (!post) {
        return res.status(404).json({ message: 'Loan not found' });
      }
  
      const payment = parseFloat(req.body.payment);
      if (isNaN(payment) || payment <= 0) {
        return res.status(400).json({ message: 'Invalid payment amount' });
      }
  
      post.balance = (post.balance || post.totalPayable) - payment; // Adjust balance
      await post.save();
  
      res.status(200).json({ message: 'Balance updated', post });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;
