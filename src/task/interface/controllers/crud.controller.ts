import { log } from "console";
import { GetUserById } from "../../../users/apps/querys.app/getUserById";
import { QueryRepositoryUser } from "../../../users/infrastructure/querys.repository.ts/pgRepositoryUser";
import { CreateTask } from "../../apps/crud.apps/createTasks";
import { Task } from "../../domain/entitis/tasks";
import { CrudRepositoryTask } from "../../infrastructure/crud.repository.ts/pgRepository";
import { Request, response, Response } from "express";
import { GetAllTask } from "../../apps/crud.apps/getAllTasks";

const crudRepoTask = new CrudRepositoryTask()
const createTaskService = new CreateTask(crudRepoTask)
const getAllTaskService = new GetAllTask(crudRepoTask)

const queryRepoUser = new QueryRepositoryUser()
const queryUserService = new GetUserById(queryRepoUser)

export class CrudTaskController {
     async createTask(req: Request, res: Response): Promise<Response> {
          try {

               const userId = req.user?.id

               console.log(userId);

               const data: Task = req.body

               const user = await queryUserService.exec(userId)

               if (!user || !user.id) return res.status(200).json({ msg: "se vencio la session" })

               const newTask = await createTaskService.exec(data, user.id)

               if (!newTask) return res.status(500).json({ msg: "no se pudo crear la tarea por favor intente de nuevo " })

               return res.status(200).json({ msg: "tarea creada correctamente " })
          } catch (error) {
               console.log(error);
               return response.status(500).json({ msg: "error inesperado por favor intente de nuevo mas tarde " })

          }
     }

     async getAllTask(req: Request, res: Response): Promise<Response> {
          const userId = req.user?.id

          const result = await getAllTaskService.exec(userId)


          if (result.length == 0) return res.status(404).json({ msg: "no tienes tareas creadas " })

          return res.status(200).json(result)

     }
}