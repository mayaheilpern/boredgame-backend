import express from "express";
import defaultController from "../controllers/defaultController.js";
import { loginUser } from "../controllers/userControls/login.js";
import { signupUser } from "../controllers/userControls/signup.js";
import { fetchAllUsers, findUserById, createUser, updateUserById, deleteUser } from "../controllers/userControls/userController.js";

const Router = express.Router();

// Home Route
Router
  .get("/", defaultController)

  //Create/Signup User
  .post("/signup", signupUser)

  // Get all users
  .get("/posts", fetchAllUsers)

  //login user
  .post("/login", loginUser)
    
  //get one user
  .get("/users/:id", findUserById)

  //update user
  .put("/update/:id", updateUserById)

  //delete user
  .delete("/delete/:id", deleteUser)

    // //Create a new post
    // .post("/new", createPost)

    // // Login Route
    // .post("/login", loginUser)

    // // Logout User
    // .get("/logout", logoutUser)

    // //Delete post
    // .delete('/delete/:id', deletePost)

    // // Updating post
    // .put("/update/:id", updatePostById)

    // // Finding post by id
    // .get("/post/:id", findPostById)
    
export default Router;
