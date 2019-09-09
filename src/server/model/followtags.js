const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    tags : [String],
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    
    
});

export const FollowTags = mongoose.model('FollowTags', Schema);
export const FollowTagsCrud = require('../mongo/mongoHelper')(FollowTags);
