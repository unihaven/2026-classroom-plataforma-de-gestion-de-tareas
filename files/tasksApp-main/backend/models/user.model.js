import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Project from "./project.model.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Project, {
  foreignKey: "userId",
  sourceKey: "id",
});

Project.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});

export default User;
