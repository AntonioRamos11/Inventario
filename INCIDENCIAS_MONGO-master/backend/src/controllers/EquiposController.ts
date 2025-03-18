import Equipo from "../models/Equipos";
import Aula from "../models/Aula";
import { Request,Response } from "express";
import {tipo_equipo} from "../models/Equipos";
class EquiposController{
    static async getEquipos(req: Request, res: Response){
        try{
            const equipos = await Equipo.find()
            res.json(equipos)
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
    /*
       id_equipo: string;
       tipo: tipo_equipo;
       caracteristicas: string;
       aula_id: string;
       garantia_id: number;
       bitacoras: string[];
       tipoEquipo: tipo_equipo
    */
   //checar la coleccion de equipo
    static async createEquipos(req: Request, res: Response){
        try{
            const {id_equipo,caracteristicas,id_aula,garantia_id,bitacoras,tipoEquipo} = req.body
            const equipos = new Equipo({id_equipo,caracteristicas,id_aula,garantia_id,bitacoras,tipoEquipo})
             //verificamos si existe esa aula
             const aulaExist = await Aula.findOne({id_aula})
             if(!aulaExist){
                return res.status(404).send('No existe esa aula')
             }
             console.log(aulaExist)
             //agregamos en la coleccion de equipos y en el modelo de aula
             aulaExist.equipos.push(id_equipo)
             await Promise.all([ equipos.save(), aulaExist.save()])

            res.json({msg:'equipo creado correctamente',equipo:equipos})
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
    static async getTipoEquipos(req:Request,res:Response){
        res.json(tipo_equipo)
    }
    static async getEquiposByAula(req:Request,res:Response){
        try{
            const {aula_id} = req.params
            const equipos = await Equipo.find({aula_id})
            res.json(equipos)
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }

    }
    static async getEquiposByTipoandAula(req:Request,res:Response){
          try{
            const {tipoEquipo,id_aula} = req.params
            const equipos = await Equipo.find({tipoEquipo,id_aula})
            res.json(equipos)
          }catch(error){
            res.send('error en el servidor')
            console.log(error)
          }
    }
    
}
export default EquiposController