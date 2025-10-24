import { Task } from "../../domain/entitis/tasks";
import { CrudTaskRepository } from "../../domain/repository/crud.repository/crud.repository";

export class CreateTask {
     constructor(private repository: CrudTaskRepository) { }

     async exec(data: Task, idUser: string): Promise<Task | undefined> {
          return this.repository.createTask(data, idUser)
     }
}