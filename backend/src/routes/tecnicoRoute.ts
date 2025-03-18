import TecnicoController from "../controllers/TecnicosController";
import Router from 'express';
const routerTecnicos = Router();
routerTecnicos.get('/',TecnicoController.getTecnicos)
routerTecnicos.post('/',TecnicoController.createTecnicos)
export default routerTecnicos