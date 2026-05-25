import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/authRoutes"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Portfolio API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});