import { User } from "../../users/domain/entitis/users";
import { QueryRepositoryUser } from "../../users/infrastructure/querys.repository.ts/pgRepositoryUser";
import { Auth } from "../domain/entitis/auth"
import { Authentications } from "../domain/repository/auth.repository";

export class GetAuth {
     constructor(private getUser: QueryRepositoryUser, private auth: Authentications) { };
     async exec(data: Auth): Promise<User | undefined> {
          const user = await this.getUser.getByEmail(data.email)
          if (!user?.password) return undefined

          const isUser = this.auth.isAutentication(data.password, user.password)
          if (!isUser) return undefined

          return user
     }
}