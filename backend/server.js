import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from './firebaseAdmin.js'
import { supabase } from "./supabaseClient.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save-user", async(req,res) => {
    try{
        const { firebaseToken } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        const {uid, email} = decodedToken;

        const is_anonymous = !email

        const { data, error } = await supabase
            .from("Users")
            .insert([{ id: uid, email, is_anonymous }]);

        if(error) throw error;

        res.status(201).json({ success: true, data });
    } catch(error){
        console.error("Error saving user to Supabase:", error);
        res.status(500).json({ success:false, message: error.message});
    }
});

app.post("/update-user", async(req,res) => {
    try{
        const { user_id, interests } = req.body;
        
        if(!user_id || !interests || interests.length === 0){
            return res.status(400).json({ success: false, message: "User ID and Interests are required"});
        }

        await supabase.from("user_interest").delete().eq("user_id", user_id);

        const { data, error } = await supabase.from("user_interest").insert(
            interests.map((interest) =>({
                user_id: user_id,
                interest: interest,
            }))
        );

        if(error) throw error;

        res.status(200).json({ success: true, message: "Interests updated successfully", data});
    }catch(error){
        console.error("Error updating interests", error);
        res.status(500).json({ success: false, message: error.message})
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));