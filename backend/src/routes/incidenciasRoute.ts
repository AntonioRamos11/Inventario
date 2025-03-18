import Route from 'express'
import IncidenciaController from '../controllers/IncidenciasController'
const incidenciasRoute = Route()
incidenciasRoute.get('/',IncidenciaController.getIncidencias)
incidenciasRoute.get('/incidencia/:id_incidencia',IncidenciaController.getIncidenciaById)
incidenciasRoute.post('/',IncidenciaController.createIncidencias)

incidenciasRoute.put('/liberacion',IncidenciaController.liberarIncidencia)
incidenciasRoute.post('/crear',IncidenciaController.createIncidencia)
incidenciasRoute.get('/departamento/:id_departamento',IncidenciaController.getIncidenciaByDepartamento)
incidenciasRoute.put('/actualizar',IncidenciaController.updateIncidencia)
incidenciasRoute.get('/tecnico/:idTecnico',IncidenciaController.getIncidenciasByTecnico)

export default incidenciasRoute