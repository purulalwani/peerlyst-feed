const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title : String,
    content: String,
    postType: String,
    tags : [String],
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}  
    
}, {timestamps: true});

export const Post = mongoose.model('Post', Schema);
export const PostCrud = require('../mongo/mongoHelper')(Post);
