import { DataTypes, Model } from "sequelize";
import { Connection } from "../../../shaders/config/db/conection.db";

const sequelize = Connection.getInstancia().conect();
if (!sequelize) throw new Error("⛔ conexión no disponible");

export class UserModel extends Model {
     declare id: string;
     declare name: string;
     declare email: string;
     declare password: string;
}

UserModel.init(
     {
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true
          },
          name: {
               type: DataTypes.STRING(100),
               allowNull: false,
               validate: { notEmpty: true }
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: { isEmail: true }
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: { notEmpty: true }
          }
     },
     {
          sequelize,               // ← instancia válida
          modelName: "UserModel",
          tableName: "users",
          timestamps: false
     }
);

