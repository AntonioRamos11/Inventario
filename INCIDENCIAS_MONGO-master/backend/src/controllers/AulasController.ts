import e, { Request, Response } from 'express';
import Departamento from '../models/Departamento';

import Edificio from '../models/Edificio';
import Aula from '../models/Aula';
class AulasController { 
    static async getAulas(req: Request, res: Response) {
        const aulas = await Aula.find()
        res.json(aulas)
    }
    static async getAulasByDeprtamento(req: Request, res: Response) {
        try{
            //tood ser via params
            const {departamento} = req.params
            const departamentoExist = await Departamento.findOne({nombre:departamento})
            if(!departamentoExist){
                return res.status(400).json({msg:'departamento no encontrado'})
            }
            const edificios = await Edificio.find({departamento_id:departamentoExist.id_departamento}).select('id_edificio')
            res.json(edificios)
        }catch(e){
            res.send('error al cargar las aulas')
        }
    }
    static async createAulas(req:Request,res:Response){
        /*
          id_aula: string;
        edificio_id: string;
        edificio: string;
        equipos: string[];
        */
        try{
            const {id_aula,edificio_id} = req.body
            //verificamos si existe ese edifcio
            const edificio = await Edificio.findOne({id_edificio:edificio_id})
            const aulaExist = await Aula.findOne({id_aula})
            if(!edificio){
                return res.status(400).json({msg:'edificio no encontrado',status:'error'})
            }
            //o vemos sii ya existe el aula
            if(aulaExist){
                return res.status(400).json({msg:'aula ya existe',status:'error'})
            }

            const aula = new Aula({id_aula,edificio_id,equipos:[]})
            edificio.aulas.push(aula.id_aula)
            await Promise.all([aula.save(),edificio.save()])
            
            res.json({msg:'Aula creada con exito',status:'ok'})
        }catch(error){
            res.send('erorr en el servidor')
            console.log(error)
        }
    }
    static async creteAulaEdificio(req:Request,res:Response){
        try{
            const {id_aula,edificio_id} = req.body
            //VERIFICAMOS SI EXISTE EL EDIFICIO
            const edificio = await Edificio.findOne({id_edificio:edificio_id})
            if(!edificio){
                return res.json({msg:"Edificio no encontrado",status:'error'})
            }
            //verificamos si ya existe el aula
            const aulaExist = await Aula.findOne({id_aula})
            if(aulaExist){
                return res.json({msg:"Aula ya existe",status:'error'})
            }
            edificio.aulas.push(id_aula)
            const aula = new Aula({id_aula,edificio_id,equipos:[]})
            await Promise.all([aula.save(),edificio.save()])
            res.json({msg:'Aula creada con exito',status:'ok'}) 
        }catch(e){
            res.send('error al crear aula')
            console.log(e)
        }
    }
    static async getAulaById(req:Request,res:Response){
        try{
            const {id_aula} = req.params
            const aula = await Aula.findOne({id_aula})
            if(!aula){
                return res.json({msg:'Aula no encontrada',status:'error'})
            }
            res.json(aula)
        }catch(e){
            res.send('error en el servidor')
            console.log(e)
        }
    }
    static async getAulasByEdificio(req:Request,res:Response){
        try{
            //vamos a reecibir el id del edificio
            const {edificio_id} = req.params
           console.log(edificio_id)
            const aulas = await Aula.find({edificio_id}).select('id_aula')
           console.log(aulas)
            res.json(aulas)

        }catch(e){
            res.send('error al acargar las auals')
            console.log(e)
        }
    }
    static async getAulasByEdificioId(req:Request,res:Response){

    try{
        const {edificio} = req.params
        const aulas = await Edificio.findOne({
            id_edificio:edificio
        }).select('aulas')
        console.log(aulas)
        res.json({aulas,status:'ok'})
    }catch(e){
        console.log(e)
        res.send('error en el servidor').status(500)
    }
    }
}
export default AulasController