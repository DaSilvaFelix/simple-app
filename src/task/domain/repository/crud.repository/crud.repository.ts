import { Task } from "../../entitis/tasks"

export interface CrudTaskRepository {
     createTask(data: Task, idUser: string): Promise<Task | undefined>
     getAllTask(idUser: string): Promise<Task[]>
}