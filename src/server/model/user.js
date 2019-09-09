const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name : String,
    email: String,
    password : String,
    userType : String,
    tagsFollowed: [String],
    usersFollowed: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    
});

export const User = mongoose.model('User', Schema);
export const UserCrud = require('../mongo/mongoHelper')(User);
