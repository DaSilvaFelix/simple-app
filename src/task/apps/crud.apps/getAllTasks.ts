import { Task } from "../../domain/entitis/tasks";
import { CrudTaskRepository } from "../../domain/repository/crud.repository/crud.repository";

export class GetAllTask {
     constructor(private repository: CrudTaskRepository) { };

     async exec(id: string): Promise<Task[]> {
          return this.repository.getAllTask(id)
     }
}