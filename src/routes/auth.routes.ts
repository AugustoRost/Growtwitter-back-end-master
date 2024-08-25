import express from "express";

import { AuthController } from "../controllers/auth.controller"

const router = express.Router();

const authController = new AuthController ();

//fazer login
router.post ("/login", authController.login);

export default router;
