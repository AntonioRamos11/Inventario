import Route from 'express'
import GarantiasController from '../controllers/GarantiasController'
const routerGarantias = Route()
routerGarantias.get('/',GarantiasController.getGarantias)
routerGarantias.post('/',GarantiasController.createGarantias)
export default routerGarantias