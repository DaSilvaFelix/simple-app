import { User } from "../../domain/entitis/users";
import { CrudUserRepository } from "../../domain/repository/crud.repository";
import bcrypt from "bcrypt"

export class CreateUser {
     constructor(private repository: CrudUserRepository) { }

     async exec(data: User): Promise<User | undefined> {
          const passwordhash = bcrypt.hashSync(data.password, 10)
          return await this.repository.createUser({ ...data, password: passwordhash })
     }
}