import { checkUserExists, updateUserInterests } from "../services/supabaseService.js";
import admin from "../firebaseAdmin.js";
const messaging = admin.messaging();

export const updateUser = async(req,res)=>{
    try{
        const [user_id, Interests] = req.body;
        if(!user_id || !Array.isArray(Interests) || Interests.length === 0){
            return res.status(400).json({success: "false", message: "User id and interests are required"});
        }

        const data = await updateUserInterests(user_id, Interests);
        res.status(200).json({success: "true", message: "User updated successfully"});
    }catch(error){
        console.error("Error in updating", error);
        res.status(400).json({success: "false", message: error.message});
    }
};