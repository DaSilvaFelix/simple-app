import { UserMiddleware } from "../../../shaders/middleware/users/validateJWT";
import { CrudTaskController } from "../controllers/crud.controller";
import { Router } from "express";

export const crudTaskRouter = Router()
const controller = new CrudTaskController()

crudTaskRouter.post("/task", UserMiddleware.validateJWT, controller.createTask)
crudTaskRouter.get("/task", UserMiddleware.validateJWT, controller.getAllTask)