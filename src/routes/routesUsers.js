import express from "express";

import { signupUser } from "../controllers/userControls/signup.js";
import { loginUser } from "../controllers/userControls/login.js";
import { logoutUser } from "../controllers/userControls/logout.js";
import { authRequired } from "../controllers/userControls/authRequired.js";
import { fetchAllUsers, findUserById, updateUserById, deleteUser } from "../controllers/userControls/userController.js";

const routesUsers = express.Router();

routesUsers

  //Create/Signup User
  .post("/signup", signupUser)

  // Get all users
  .get("/users", fetchAllUsers)

  //login user
  .post("/login", loginUser)

  //logout user
  .get("/logout", logoutUser)
    
  //get one user
  .get("/users/:id", findUserById)

  //update user
  .put("/update/:id", updateUserById)

  //delete user
  .delete("/delete/:id", deleteUser);

export default routesUsers;
