import { Connection } from "../../../shaders/config/db/conection.db";
import { UserModel } from "../../../users/infrastructure/model/UserModel";
import { TaskModel } from "../../../task/infrastructure/model/taskModel";

const sequelize = Connection.getInstancia().conect();
// 🔹 Relación explícita (si no está en los modelos)
TaskModel.belongsTo(UserModel, { foreignKey: "owner" });
UserModel.hasMany(TaskModel, { foreignKey: "owner" });

export class Sync {
     static async syncronitation() {
          try {
               if (!sequelize) throw new Error("⛔ conexión no disponible");
               await sequelize.sync({ alter: true });
               console.log("✅ Tablas sincronizadas");
          } catch (error) {
               console.error("⛔ Error al sincronizar:", error);
          }
     }
}

