import { Router } from "express";
import CambiosCntroller from "../controllers/CambiosController";
const cambiosRouter = Router();
cambiosRouter.get('/',CambiosCntroller.getCambios)
cambiosRouter.post('/',CambiosCntroller.createCambio)
export default cambiosRouter