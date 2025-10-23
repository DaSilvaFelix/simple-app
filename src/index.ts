import express from "express"
import cors from "cors"
import morgan from "morgan"
import { Env } from "./shaders/config/env"
import { Connection } from "./shaders/config/db/conection.db"
import crudUserRouter from "./users/interfaces/routers/crud.routes"
import authRouter from "./auth/interfaces/routers/auth.router"
import cookieParser from "cookie-parser"
import session from "express-session"
import { queryRouter } from "./users/interfaces/routers/query.routes"

const app = express()
const conection = Connection.getInstancia()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use(cookieParser())

app.use(session({
     secret: Env.MY_SECRET_KEY,
     resave: false,
     saveUninitialized: false,
     cookie: {
          secure: true,
          maxAge: 86400000
     }
}))

app.use("/api", crudUserRouter)
app.use("/api", authRouter)
app.use("/api", queryRouter)


app.listen(Env.PORT, () => {
     conection.conect()
     console.log("server on runnig on port:3000");
     console.log("path:http://localhsot:3000");
})