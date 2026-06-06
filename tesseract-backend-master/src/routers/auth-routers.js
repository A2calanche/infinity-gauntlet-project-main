import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";

export const AuthRouter = express.Router();

// REGISTER
AuthRouter.post("/register", async function (request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).send({ message: "Missing information" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).send({ message: "Email already in use" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    response.status(201).send({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong trying to register",
      error,
    });
  }
});

// LOGIN
AuthRouter.post("/login", async function (request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({ message: "Missing information" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return response.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    response.send({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong trying to login",
      error,
    });
  }
});