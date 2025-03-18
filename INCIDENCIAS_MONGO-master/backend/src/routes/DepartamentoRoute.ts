import Route from 'express'
import DepartamentoController from '../controllers/departamentoController'
const routerDepartamento = Route()
routerDepartamento.get('/', DepartamentoController.getDepartamentos)
routerDepartamento.post('/', DepartamentoController.createDepartamento)
export default routerDepartamento