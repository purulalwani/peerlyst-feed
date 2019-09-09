import {FollowTags, FollowTagsCrud} from '../model/followtags';
import {FollowUser, FollowUserCrud} from '../model/followuser';

import {User, UserCrud} from '../model/user';
export default {

    followTags: async(req,res) => {


        let followTags = req.body.tags;

        let user = req.session.user;       
       
        let totalTags = Array.from(new Set([...user.tagsFollowed, ...followTags]));
       
        console.log("totalTags -> ", totalTags);

        await UserCrud.update({_id:user._id}, {tagsFollowed: totalTags});

        req.session.user.tagsFollowed = totalTags;


        res.json({status:200, message: "Tags followed successfully."});
    
    },

    followUser: async(req,res) => {

        let followUser = req.body.to;

        let user = req.session.user;

        let totalUsers = Array.from(new Set([followUser, ...user.usersFollowed]));

        await UserCrud.update({_id:user._id}, {usersFollowed: totalUsers});

        req.session.user.usersFollowed = totalUsers;

        res.json({status:200, message: "User followed successfully."});


    }

}