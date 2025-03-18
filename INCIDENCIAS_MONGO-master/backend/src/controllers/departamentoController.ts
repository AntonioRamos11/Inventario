import { Request, Response } from 'express';
import Departamento from '../models/Departamento';
export default class DepartamentoController {
    static async getDepartamentos(req: Request, res: Response) {
        try{
            const departamento =  await Departamento.find()
            res.send(departamento)
        }catch(error){
            res.send('error ene l servidor')
            console.log(error)
        }
    }
    static async getDepartamento(req: Request, res: Response) {

    }
    static async createDepartamento(req: Request, res: Response) {
        try{
            /*
            interface DepartamentoInterface extends Document{
            id: string;
            nombre: string;
            descripcion: string;
            edificios: string[];
            }
            */
           const {id_departamento,nombre,descripcion,edificios} = req.body
             await Departamento.create({id_departamento,nombre,descripcion,edificios})
          
           res.send('departamento creado con exito')
        }catch(error){
            res.send('error ene l servidor')
            console.log(error)
        }
    }
    
}