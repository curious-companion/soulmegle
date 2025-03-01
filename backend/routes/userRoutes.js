import express from "express";
import { saveUser } from "../controllers/saveUser.js";
import { updateUser } from "../controllers/updateUser.js";

const userRoutes = express.Router();

userRoutes.post("/save", saveUser);
userRoutes.post("/update", updateUser);

export default userRoutes;
