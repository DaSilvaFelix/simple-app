import { User } from "../../domain/entitis/users";
import { CrudRepository } from "../../domain/repository/crud.repository";
import bcrypt from "bcrypt"

export class CreateUser {
     constructor(private repository: CrudRepository) { }

     async exec(data: User): Promise<User | undefined> {
          const passwordhash = bcrypt.hashSync(data.password, 10)
          return await this.repository.createUser({ ...data, password: passwordhash })
     }
}