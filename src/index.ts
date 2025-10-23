import express from "express"
import cors from "cors"
import morgan from "morgan"
import { Env } from "./shaders/config/env"
import { Connection } from "./shaders/config/db/conection.db"
import crudUserRouter from "./users/interfaces/routers/crud.routes"
import authRouter from "./auth/interfaces/routers/auth.router"

const app = express()
const conection = Connection.getInstancia()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/api", crudUserRouter)
app.use("/api", authRouter)


app.listen(Env.PORT, () => {
     conection.conect()
     console.log("server on runnig on port:3000");
     console.log("path:http://localhsot:3000");
})