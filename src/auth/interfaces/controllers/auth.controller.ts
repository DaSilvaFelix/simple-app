import { GetAuth } from "../../apps/getAuth";
import { QueryRepositoryUser } from "../../../users/infrastructure/querys.repository.ts/pgRepositoryUser";
import { AuthRepository } from "../../infrastructure/authRepository ";
import { Request, Response } from "express";
import { Auth } from "../../domain/entitis/auth";
import { JsonWebToken } from "../../../shaders/helpers/JsonWebToken";
import "express-session"

declare module "express-session" {
     interface SessionData {
          token: any,
          isLoggedIn: boolean
     }
}

const repoQuery = new QueryRepositoryUser()
const repoAuth = new AuthRepository()
const serviceAuth = new GetAuth(repoQuery, repoAuth)

const jwt = new JsonWebToken()


export class AuthController {
     async login(req: Request, res: Response): Promise<Response> {
          const data: Auth = req.body

          const user = await serviceAuth.exec(data)

          if (!user) return res.status(400).json({ msg: "credenciales incorectas " })
          if (!user.id) return res.status(400).json({ msg: "credenciales incorectas " })

          const token = jwt.generate(user.id)
          res.cookie("token", token)
          req.session.token = token
          req.session.isLoggedIn = true

          return res.status(200).json({ msg: "inicio de session exitoso" })
     }
}