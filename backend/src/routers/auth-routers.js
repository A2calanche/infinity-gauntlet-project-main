import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
import { randomBytes, createHash } from "crypto";
import { sendPasswordResetEmail } from "../utils/mailer.js"
export const AuthRouter = express.Router();

const setAuthCookie = (response, token) => {
  response.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookie = (response) => {
  response.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

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

    setAuthCookie(response, token);

    response.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong trying to register",
      error: error,
    });
  }
});
//FORGOT PASSWORD
AuthRouter.post("/forgot-password", async function (request, response) {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).send(
        { message: "Missing email" }
      );
    }
    else {
      const user = await User.findOne({ email });
      if (user) {
        const resetToken = randomBytes(32).toString("hex");
        const resetTokenHash = createHash("sha256").update(resetToken).digest("hex");
      user.resetTokenHash = resetTokenHash;
      user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 min
      await user.save();
      await sendPasswordResetEmail(user.email, resetToken);
        return response.status(200).json({ message: 
          "If that email is registered, a reset link has been sent." 
        });
      }
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message:
      "Something went wrong trying to process forgot password",
      error,
    });
  }
});

//RECOVERY PASSWORD
AuthRouter.patch("/reset-password/:token", async function (request, response) {
  try {
    const { token } = request.params;
    const { password } = request.body;

    if (!token || !password) {
      return response.status(400).json({ message: "Missing token or password" });
    }
    const resetTokenHash = createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetTokenHash,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return response.status(400).json({ message:
        "Invalid or expired token",
      error:error.message 
    });
    }

    user.password = password;
    user.resetTokenHash = null;
    user.resetTokenExpires = null;

    await user.save();

    return response.status(200).json({ message:
      "Password updated successfully"
     });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message:
      "Internal server error",
      error: error.message 
    });
  }
});

// GOOGLE OAUTh
AuthRouter.post("/google", async function (request, response) {
  try {
    const { token } = request.body;

    if (!token) {
      return response.status(400).send({ message: "Missing token" });
    }

    const { verifyGoogleToken } = await import("../middlewares/googleOAuth.js");
    const googleUser = await verifyGoogleToken(token);

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      // Crear usuario si no existe
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.id,
        password: "oauth-" + googleUser.id, // contraseña dummy
      });
      await user.save();
    } else if (!user.googleId) {
      // Si el usuario existe pero no tiene googleId, actualizar
      user.googleId = googleUser.id;
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    setAuthCookie(response, jwtToken);

    response.send({
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(401).send({
      message: "Google authentication failed",
      error: error.message,
    });
  }
});

AuthRouter.post("/logout", (request, response) => {
  clearAuthCookie(response);
  response.status(200).send({ message: "Logged out successfully" });
});

AuthRouter.get("/me", async function (request, response) {
  try {
    const token = request.cookies?.auth_token;

    if (!token) {
      return response.status(401).send({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id name email");

    if (!user) {
      return response.status(401).send({ message: "Not authenticated" });
    }

    return response.status(200).send({ user });
  } catch (error) {
    return response.status(401).send({ message: "Not authenticated" });
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

    setAuthCookie(response, token);

    response.send({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
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