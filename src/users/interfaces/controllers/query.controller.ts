import { Request, Response } from "express";
import { User } from "../../domain/entitis/users";
import { QueryRepositoryUser } from "../../infrastructure/querys.repository.ts/pgRepositoryUser";
import { GetUserById } from "../../apps/querys.app/getUserById";

declare global { namespace Express { interface Request { user?: any; } } }

const repoQuery = new QueryRepositoryUser()
const getByIdService = new GetUserById(repoQuery)

export class QueryUserController {

     async getByIdUser(req: Request, res: Response): Promise<Response> {
          const idUser = req.user.id as string

          const user = await getByIdService.exec(idUser)

          return res.status(200).json(user)
     }

}


