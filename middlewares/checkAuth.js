import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: "Authorization token is missing!",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Invalid Authorization header format!",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: true,
          message: "Invalid or expired token.",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(403).json({
      error: true,
      message: "Invalid or expired token!",
    });
  }
};

export default checkAuth;
