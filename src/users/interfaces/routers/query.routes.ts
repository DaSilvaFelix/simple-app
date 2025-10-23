import { QueryUserController } from "../controllers/query.controller"
import { Router } from "express"
import { UserMiddleware } from "../../../shaders/middleware/users/validateJWT"

export const queryRouter = Router()
const controller = new QueryUserController()

queryRouter.get("/getUser", UserMiddleware.validateJWT, controller.getByIdUser)