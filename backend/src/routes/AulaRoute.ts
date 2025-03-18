import Route from 'express'
import AulasController from '../controllers/AulasController'
import Aula from '../models/Aula'
const routerAulas = Route.Router()
routerAulas.get('/',AulasController.getAulas)
routerAulas.get('/:departamento',AulasController.getAulas)
routerAulas.post('/crear_aula_edificio',AulasController.creteAulaEdificio)
routerAulas.post('/',AulasController.createAulas)
routerAulas.get('/:edificio_id',AulasController.getAulasByEdificio)
routerAulas.get('/aula/:id_aula',AulasController.getAulaById)
routerAulas.get('/aulas/:edificio',AulasController.getAulasByEdificioId)
export default routerAulas