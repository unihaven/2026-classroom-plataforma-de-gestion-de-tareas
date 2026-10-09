import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

const register = async (req, res) => {
  //Gets the sanitized data from the client
  const userData = matchedData(req);

  //The following checks if there is already a user with the provided email address
  const userExists = await User.findOne({ where: { email: userData.email } });
  if (userExists)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  //Encrypts the password, then creates a new user, finally deletes the password property to send the information to the client
  userData.password = await bcrypt.hash(userData.password, 14);
  const newUser = await User.create(userData);

  //create sample project and task
  const project = await Project.create({
    userId: newUser.id,
    name: "I am a sample project, click me to start or delete/update me if you want to",
    description:
      "# Hello\n## as you can see, this is the description and it is written using markdown\nyou can update this by going back and clicking this project's edit button",
  });

  await Task.create({
    projectId: project.id,
    name: "This is a sample task, mark it as done or delete it, also it is posible to create another one",
  });

  delete userData.password;
  userData.id = newUser.id;

  //Sends the token and user data without the password
  return res.status(200).json({
    success: true,
    message: "User registered successfully",
    user: { ...userData, token: generateToken(userData) },
  });
};

const logIn = async (req, res) => {
  //This retrieves and gets the sanitized data from the client
  const userData = matchedData(req);

  //Checks if the user exists
  const user = await User.findOne({
    where: { email: userData.email },
  });

  // Checks if the passsword matches the stored one
  let passwordMatch = false;
  if (user) {
    passwordMatch = await bcrypt.compare(userData.password, user.password);
  }

  if (!passwordMatch || !user)
    return res
      .status(400)
      .json({ success: false, message: "Incorrect email or password" });

  let userToReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  userToReturn.token = generateToken(userToReturn);

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: userToReturn,
  });
};

const getUserProjects = async (req, res) => {
  const userId = req.user.id;

  const projects = await Project.findAll({
    where: { userId },
    include: "User",
  });

  if (!projects.length)
    return res
      .status(404)
      .json({ success: false, message: "No projects found", projects });

  return res
    .status(200)
    .json({ success: true, message: "Projects found successfully", projects });
};

export default {
  register,
  logIn,
  getUserProjects,
};
