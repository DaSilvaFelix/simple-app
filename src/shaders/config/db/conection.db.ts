import { Sequelize } from "sequelize";
import { Env } from "../env";

// Clase singleton para conexión única
export class Connection {
     static instancia: Connection; // instancia única
     private sequelize?: Sequelize; // conexión interna

     // Acceso único a la instancia
     static getInstancia(): Connection {
          if (!Connection.instancia) {
               Connection.instancia = new Connection();
          }
          return Connection.instancia;
     }

     // Método para conectar a la base
     conect(): Sequelize | undefined {
          if (this.sequelize) return this.sequelize; // ya conectada

          try {
               this.sequelize = new Sequelize(
                    Env.DB_NAME!,
                    Env.DB_USER!,
                    Env.DB_PASS!, {
                    host: Env.DB_HOST,
                    port: Number(Env.DB_PORT!),
                    dialect: "postgres",
                    logging: false
               });

               console.log("✅ conexión a la base de datos exitosa");
               return this.sequelize;
          } catch (err) {
               console.log("⛔ error al conectar con la base de datos");
               console.log("---------------------------------------------------------");
               console.log(err);
               console.log("---------------------------------------------------------");
               return undefined;
          }
     }
}