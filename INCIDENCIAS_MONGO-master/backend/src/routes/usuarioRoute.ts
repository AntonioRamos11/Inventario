import Router from 'express';
const routerUsuarios  = Router();
import UsuarioController from '../controllers/UsuarioController';
routerUsuarios.get('/',UsuarioController.getUsuarios)
routerUsuarios.post('/',UsuarioController.createUsuarios)
routerUsuarios.get('/login/:Nombre/:password',UsuarioController.LoginUsuario)
export default routerUsuarios