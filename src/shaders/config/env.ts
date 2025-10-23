import * as dotenv from "dotenv"

dotenv.config()

export class Env {
     static PORT = process.env.PORT || 3000
     static MY_SECRET_KEY = process.env.MY_SECRET_KEY || "secreto"
}