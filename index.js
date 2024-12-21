import express from "express";
import {} from "dotenv/config.js";
import cookieParser from "cookie-parser";

import connectToDatabase from "./middlewares/connection.js";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import commentRouter from "./routes/comment.route.js";
import checkAuth from "./middlewares/checkAuth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

await connectToDatabase();

app.use("/auth/user", userRouter);
app.use("/api/blog", checkAuth, blogRouter);
app.use("/api/blog/:blogId/comment", checkAuth, commentRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server Started");
});
