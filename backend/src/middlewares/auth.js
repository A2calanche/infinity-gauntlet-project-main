import jwt from "jsonwebtoken";

export function authMiddleware(request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromCookie = request.cookies?.auth_token;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : tokenFromCookie;

    if (!token) {
      return response.status(401).send({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    response.status(401).send({ message: "Invalid or expired token" });
  }
}