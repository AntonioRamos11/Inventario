import Edificio from '../models/Edificio';
import Departamento from '../models/Departamento';
import { Request,Response } from 'express';
class EdificioController {
    static async getEdificios(req: Request, res: Response) {
        try{
            const edificio =  await Edificio.find()
            res.send(edificio)
        }catch(error){
            res.send('error ene l servidor')
            console.log(error)
        }
    }


    static async getEdificiosById(req: Request, res: Response) {
        try{
            //todos los edificios de un deparatamento
            const {id_departamento} = req.params
            const edificio =  await Edificio.find({id_departamento})
            res.send(edificio)
        }catch(error){
            res.send('error ene l servidor')
            console.log(error)
        }
    }
    static async getEdificioByDepartamento(req: Request, res: Response) {
        try{
            const {departamento} = req.params
            const edificios = await Edificio.find({id_departamento:departamento})
            res.json({edificios, status:'success'})

        }catch(error){
            console.log(error)
            res.send('error en el servidor')
        }
    }
    static async createEdificio (req:Request, res:Response){
  /*
  {
  "id_departamento":"sis",
  "id_edificio":"sis-hh",
  "aulas":[]
}
  
  */

        try{
            const {id_departamento,id_edificio,aulas} = req.body
            const departamento = await Departamento.findOne({id_departamento})
            if(!departamento){
                return res.send('departamento no encontrado')
            }
            //si existe el departamento, verificamos si ya existe el edificio
            const edificioExistente = await Edificio.findOne({id_edificio})
            if(edificioExistente){
                return res.json({msg:'edificio ya existe',status:'error'})
            }
            const edificio = new Edificio({id_departamento,id_edificio,aulas})
            console.log(edificio)
            departamento.edificios.push(edificio.id_edificio)
            console.log('probando')
            await Promise.all([departamento.save(),edificio.save()])
            res.send('edificio creado con exito').status(200)
        }catch(e){
            res.send('error en el servidor')
            console.log(e)
        }
    }
     
}
export default EdificioController