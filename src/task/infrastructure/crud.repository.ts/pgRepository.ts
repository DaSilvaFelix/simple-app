import { TaskModel } from "../model/taskModel";
import { CrudTaskRepository } from "../../domain/repository/crud.repository/crud.repository";
import { Task } from "../../domain/entitis/tasks";


export class CrudRepositoryTask implements CrudTaskRepository {
     async createTask(data: Task, idUser: string): Promise<Task | undefined> {


          const newTask = await TaskModel.create({
               id: data.id || undefined,
               title: data.title,
               text: data.text,
               isCompleted: data.isCompleted || undefined,
               owner: idUser
          })


          const result = await TaskModel.findByPk(newTask.id)
          if (!result) return undefined


          return new Task(
               result.title,
               result.text,
               result.isCompleted,
               result.owner,
               result.id
          )
     }

     async getAllTask(idUser: string): Promise<Task[]> {

          const result = await TaskModel.findAll({
               where: { owner: idUser }
          })

          if (!result) return []

          return result
     }
}