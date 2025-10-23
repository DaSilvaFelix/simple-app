import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const controller = new AuthController()
const authRouter = Router()

authRouter.post("/login", controller.login)

export default authRouter