// postModel.js

const mongoose = require('mongoose');
const User = require('./User');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Number,
        required: true
    },
    borrowedAmount: {
        type:Number,
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    category: {
        type: Number,
        //default: ''
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: User
        }
    ],
    attachment: {
        type: Number
    },  
});
postSchema.pre('save', function (next) {
    if (this.isModified('content') || this.isModified('category')) {
        this.attachment = (this.attachment || this.content) - this.category;
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
