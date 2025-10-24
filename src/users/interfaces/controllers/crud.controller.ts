import { Request, Response } from "express";
import { CreateUser } from "../../apps/crud.app/createUser";
import { CrudRepositoryUser } from "../../infrastructure/crud.repository.ts/pgRepositoryUser";
import { User } from "../../domain/entitis/users";

const repo = new CrudRepositoryUser()
const service = new CreateUser(repo)

export class CrudUserController {
     async register(req: Request, res: Response): Promise<Response> {
          try {

               const data: User = req.body

               const user = service.exec(data)

               if (!user) return res.status(400).json({ msg: "no se pudo guardar el usuario" })

               return res.status(200).json({ msg: "usuario registardo correctamente " })
          } catch (err) {
               console.log("---------------------------------------------------------");
               console.log("error en el controlador de: Register");

               console.log("---------------------------------------------------------");
               console.log(err);
               console.log("---------------------------------------------------------");
               return res.status(500).json({ msg: "error inesperado por favor intente mas tarde " })
          }


     }


}