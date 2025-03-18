import Route from 'express'
import EdificioController from '../controllers/EdificioController'
const edificioRoute = Route()

edificioRoute.get('/',EdificioController.getEdificios)

edificioRoute.post('/',EdificioController.createEdificio)

edificioRoute.get('/:id_departamento',EdificioController.getEdificiosById)
export default  edificioRoute