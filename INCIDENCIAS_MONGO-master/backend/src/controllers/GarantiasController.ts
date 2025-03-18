import Garantia from "../models/Garantias";
import { Request,Response } from "express";
class GarantiasController {
    static async   getGarantias(req: Request, res: Response) {
        try{
            const garantias = await Garantia.find()
            res.json(garantias)
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
    static async createGarantias(req: Request, res: Response) {
        /*
        id_garantia: number;
    fecha_expiracion: Date;
    politicas: string;
    equipos: string[];
        */
        try{
            const {id_garantia,fecha_expiracion,politicas,equipos} = req.body
            const garantia = new Garantia({id_garantia,fecha_expiracion,politicas,equipos})
            await garantia.save()
            res.json(garantia)
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
}
export default GarantiasController