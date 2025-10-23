import { QueryRepositoryUser } from "../../infrastructure/querys.repository.ts/pgRepositoryUser";
import { User } from "../../domain/entitis/users";

export class GetUserById {
     constructor(private repository: QueryRepositoryUser) { }

     async exec(id: string): Promise<User | undefined> {
          return this.repository.getById(id)
     }
}