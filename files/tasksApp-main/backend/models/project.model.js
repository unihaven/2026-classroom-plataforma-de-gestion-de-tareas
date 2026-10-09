import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Task from "./task.model.js";

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: { type: DataTypes.INTEGER, defaultValue: 10 },
  description: DataTypes.STRING,
});

Project.hasMany(Task, {
  foreignKey: "projectId",
  sourceKey: "id",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
  targetId: "id",
});

export default Project;
