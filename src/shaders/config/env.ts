import * as dotenv from "dotenv"

dotenv.config()

export class Env {
     static PORT = process.env.PORT || 3000
}