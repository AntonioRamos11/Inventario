import { Router } from "express";
import ProblemasController from "../controllers/ProblemasController";
const problemasRoute    = Router();
problemasRoute.get("/", ProblemasController.getProblemas);
problemasRoute.post("/", ProblemasController.createProblemas);
export default problemasRoute