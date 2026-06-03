import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from './routes/auth.route.js';
import teamRoutes from './routes/team.route.js';
import projectRoutes from './routes/project.route.js'

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(json());

app.use("/api/auth", authRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/projects", projectRoutes)

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running"
  });
});

export default app;