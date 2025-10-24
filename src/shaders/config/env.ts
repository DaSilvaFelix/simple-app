import * as dotenv from "dotenv"

dotenv.config()

export class Env {
     static PORT = process.env.PORT || 3000
     static MY_SECRET_KEY = process.env.MY_SECRET_KEY || "secreto"
     static DB_NAME = process.env.DB_NAME
     static DB_USER = process.env.DB_USER
     static DB_PASS = process.env.DB_PASS
     static DB_PORT = process.env.DB_PORT
     static DB_HOST = process.env.DB_HOST
}