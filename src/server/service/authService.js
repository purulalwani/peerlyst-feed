
import {User, UserCrud} from "../model/user";

export default {

    login: async(req, res) => {

        let user = req.body;

        let userQueryRes = await UserCrud.getQueryOne(user);
        if(userQueryRes) {
            userQueryRes.password = '';
            
            req.session.user = userQueryRes;
            res.status(200).json({status: 200, payload: userQueryRes});
        }
        else 
            res.status(200).json({status: 500, message: "Invalid email/password."});


        

    },

    register: async(req, res) => {

        let user = req.body;

        user.tagsFollowed = [];
        user.usersFollowed = [];

        let userCreateRes = UserCrud.create(user);
        
        res.status(200).json({status: 200, message: 'Registered successfully, please login.'} );


    },

    logout: async(req, res) => {
        console.log("Destroying session......");
        req.session.user = undefined;
        console.log("Session destroyed ......");

        res.status(200).json({status: 200, message: 'Logout successfully.'} );
    }, 

    getUser: async(req, res) => {

        console.log(req.session);

        res.status(200).json({status:200, payload: req.session.user});
    }, 

    getAllUser: async(req, res) => {

        
        let allUserResponse = await UserCrud.getAll();

        res.status(200).json({status:200, payload: allUserResponse});
    }

}