const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    to : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    
    
});

export const FollowUser = mongoose.model('FollowUser', Schema);
export const FollowUserCrud = require('../mongo/mongoHelper')(FollowUser);
