import { supabase } from "../supabaseClient.js";

export const checkUserExists = async(uid) => {
    const { data, error } = await supabase
        .from("Users")
        .select("id")
        .eq("id", uid)
        .single();
    
    if(error) throw error;
    return data;
};

export const insertUser = async(uid, email, is_anonymous) => {
    const {data, error} = await supabase
        .from("Users")
        .insert([{ id: uid, email, is_anonymous }]);

    if(error) throw error;
    return data;
};

export const updateUserInterests = async(uid, interest) => {
    await supabase.from("user_interest")
        .delete()
        .eq("user_id", user_id);
    
    const {data, error} = await supabase.from("user_interest")
        .insert(interests.map((interest) => ({user_id, interest}))
    );
    if(error) throw error;
    return data;
}