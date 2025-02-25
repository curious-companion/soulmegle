import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function listUsers() {
    try{
        const listUserResult = await admin.auth().listUsers();
        listUserResult.users.forEach((userRecord) => {
            console.log("user", userRecord.uid, "| Anonymous:", userRecord.providerData.length === 0);
        });
    }catch(error){
        console.error("Error Listing users:", error.message);
    }
}

listUsers();