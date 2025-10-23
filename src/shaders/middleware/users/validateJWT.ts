import { NextFunction, Request, Response } from "express";
import { JsonWebToken } from "../../helpers/JsonWebToken";

const jwt = new JsonWebToken().verifi

export class UserMiddleware {
     static async validateJWT(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

          const token = req.session.token || req.cookies.token





          if (!token || typeof token !== 'string') {
               return res.status(401).json({ msg: "Acceso denegado: token ausente o inválido" });
          }

          try {
               const decode = jwt(token as string)

               req.user = decode

               next()

          } catch (err) {
               console.log(err);
               return res.status(500).json({ msg: "error al prosesar tu autenticaion intente de nuevo mas tarde " })
          }


     }
}