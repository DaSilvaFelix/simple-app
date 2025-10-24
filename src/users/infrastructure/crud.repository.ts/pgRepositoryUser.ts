import { UserModel } from "../model/UserModel";
import { User } from "../../domain/entitis/users";
import { CrudUserRepository } from "../../domain/repository/crud.repository";

export class CrudRepositoryUser implements CrudUserRepository {
     async createUser(data: User): Promise<User | undefined> {
          try {
               const created = await UserModel.create({
                    id: data.id ?? undefined,
                    name: data.name,
                    email: data.email,
                    password: data.password
               });

               const result = await UserModel.findByPk(created.id);
               if (!result) return undefined

               return new User(result.name, result.email, result.password, result.id);
          } catch (error) {
               console.log("-------------------------------------------------");
               console.log("error en el repositorio: createUser");
               console.log("-------------------------------------------------");
               console.log(error);
               console.log("-------------------------------------------------");

               return undefined

          }
     }
};