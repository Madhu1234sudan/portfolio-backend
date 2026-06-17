import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import researchRoutes from "./routes/research.routes";
import profileRoutes from "./routes/profile.routes";
import skillRoutes from "./routes/skill.routes";
import skillCategoryRoutes from "./routes/skillCategory.routes";



import helmet from "helmet";
import morgan from "morgan";

import uploadRoutes from "./routes/uploadRoutes";
import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/authRoutes"; 


const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/skill-categories",skillCategoryRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Portfolio API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});