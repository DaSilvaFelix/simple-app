import { GetAuth } from "../../apps/getAuth";
import { QueryRepositoryUser } from "../../../users/infrastructure/querys.repository.ts/pgRepositoryUser";
import { AuthRepository } from "../../infrastructure/authRepository ";
import { Request, Response } from "express";
import { Auth } from "../../domain/entitis/auth";

const repoQuery = new QueryRepositoryUser()
const repoAuth = new AuthRepository()
const serviceAuth = new GetAuth(repoQuery, repoAuth)

export class AuthController {
     async login(req: Request, res: Response): Promise<Response> {
          const data: Auth = req.body

          const user = await serviceAuth.exec(data)

          return res.status(200).json(user)
     }
}