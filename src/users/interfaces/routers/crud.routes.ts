import { CrudUserController } from "../controllers/crud.controller";
import { Router } from "express";

const crudUserRouter = Router()
const controller = new CrudUserController()

crudUserRouter.post("/register", controller.register)

export default crudUserRouter