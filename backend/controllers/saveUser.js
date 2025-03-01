import { checkUserExists, insertUser } from "../services/supabaseService.js";
import admin from "../firebaseAdmin.js";

export const saveUser = async(req,res) => {
    try{
        const { firebaseToken } = req.body;
        if(!firebaseToken){
            return res.status(400).json({ success: false, message: "User already exists", user: userExists});
        }
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        const { uid, email } = decodedToken;
        const is_anonymous = !email;

        const userExists = await checkUserExists(uid);
        if(userExists){
            return res.status(200).json({success:true, message: "User already exists", user: userExists})
        }

        const data = await insertUser(uid, email, is_anonymous);
        res.status(201).json({success: true, message: "User Saved successfully", data});
    }catch(error){
        console.error("Error in saving user", error);
        res.status(500).json({success: false, message: error.message});
    }
};

