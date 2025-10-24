import { DataTypes, Model } from "sequelize";
import { Connection } from "../../../shaders/config/db/conection.db";
import { UserModel } from "../../../users/infrastructure/model/UserModel";

const sequelize = Connection.getInstancia().conect();
if (!sequelize) throw new Error("⛔ conexión no disponible");

export class TaskModel extends Model {
     declare id: string;
     declare title: string;
     declare text: string;
     declare isCompleted: boolean;
     declare owner: string
}

TaskModel.init({
     id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
     },
     title: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: { notEmpty: true }

     },
     text: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: { notEmpty: true }

     },
     isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: true
     },
     owner: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
               model: 'users',
               key: 'id'
          },
          onDelete: 'CASCADE'
     }
},
     {
          sequelize,               // ← instancia válida
          modelName: "TaskModel",
          tableName: "tasks",
          timestamps: false
     });

TaskModel.belongsTo(UserModel, { foreignKey: "owner" });
UserModel.hasMany(TaskModel, { foreignKey: "owner" });


