
import { Request, Response } from "express";
import Tecnico from "../models/Tecnico";
class TecnicoController {
    static async getTecnicos(req:Request, res:Response) {
        try {
            const tecnicos = await Tecnico.find()
            res.json(tecnicos)
        } catch (error) {
            res.send('error en el servidor')
            console.log(error)
        }
    }
    /*
        idTecnico: String | number;
    id_usuario: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    horario: string;
    disponibilidad: boolean;    
    tipo_tecnico_id: tipo_tecnico;
    promedio: number;
    incidencias: string[]
    */
    static async createTecnicos(req:Request, res:Response) {
        try {
            //para que exista un tenico debe de haber un usuario
            const {idTecnico,id_usuario,nombre,apellido_paterno,apellido_materno,horario,disponibilidad,tipo_tecnico,promedio,incidencias} = req.body
            const tecnicos = new Tecnico({idTecnico,id_usuario,nombre,apellido_paterno,apellido_materno,horario,disponibilidad,tipo_tecnico,promedio,incidencias})
            tecnicos.save()
            res.json(tecnicos)
        } catch (error) {
            res.send('error en el servidor')
            console.log(error)
        }
    }
}
export default TecnicoController