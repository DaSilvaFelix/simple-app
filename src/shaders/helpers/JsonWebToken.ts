import JWT from "jsonwebtoken";
import { Env } from "../config/env";

export class JsonWebToken {
     // ✅ No hace falta encapsular JWT, se usa directamente
     generate(id: string): string {
          const payload = { id };
          return JWT.sign(payload, Env.MY_SECRET_KEY, { expiresIn: "1d" });
     }

     verifi(token: string): { id: string } {
          return JWT.verify(token, Env.MY_SECRET_KEY) as { id: string };
     }
}