import { UserModel } from "../model/UserModel";
import { User } from "../../domain/entitis/users";
import { QueryUserRepository } from "../../domain/repository/query.repository";

export class QueryRepositoryUser implements QueryUserRepository {
     async getByEmail(userEmail: string): Promise<User | undefined> {
          try {
               const user = await UserModel.findOne({ where: { email: userEmail } })

               if (!user) return undefined

               return new User(user.name, user.email, user.password, user.id);
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