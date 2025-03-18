import Route from 'express'
import EquiposController from '../controllers/EquiposController'
const routerEquipos = Route()   
routerEquipos.get('/',EquiposController.getEquipos)
routerEquipos.post('/',EquiposController.createEquipos)
routerEquipos.get('/tipo',EquiposController.getTipoEquipos)
routerEquipos.get('/aula/:id_aula/:tipoEquipo',EquiposController.getEquiposByTipoandAula)
export default routerEquipos