import Problema from "../models/Problema";
import { Request, Response } from "express";
class ProblemasController {
    static async getProblemas( req: Request, res: Response) {
        try {
            const problemas = await Problema.find();
            res.status(200).json(problemas);
        } catch (error) {
            res.status(500).json({ message: 'error en el servidor'});
        }
    }
    /*
     id_Problema: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    solucion: { type: String, required: true },
    */
    static async createProblemas( req: Request, res: Response) {
        try {
            let id:number = 0;
             const {nombre,descripcion,solucion} = req.body;
             //creamos un id automatico
             const maximo =await Problema.find()
             if(maximo.length == 0){
                 id = 1;
             }else{
                    id = maximo[maximo.length - 1].id_Problema + 1;
                
             }
                const problema = new Problema({id_Problema:id,nombre,descripcion,solucion});
                await problema.save();
                res.json({msg:'problema creado con exito',status:'ok'});
        } catch (error) {
            res.status(500).json({ message: 'error en el servidor'});
        }
    }

}
export default ProblemasController;