import bcrypt from "bcrypt"
import { Authentications } from "../domain/repository/auth.repository";

export class AuthRepository implements Authentications {
     isAutentication(password: string, hash: string): boolean {
          const isPassword = bcrypt.compareSync(password, hash)
          return isPassword
     }
}