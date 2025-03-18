import { Request,Response } from "express";
import Usuario from "../models/Usuairo";

class UsuarioController{
    static async getUsuarios(req: Request, res: Response){
        try{
            const usuarios = await Usuario.find()
            res.json(usuarios)
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
    /*
    id_usuario: string;
    Nombre: string;
    password: string;
    tipo_usuario: tipo_usuario; //solo un tipo de usuairo por cada usuario
    
    */
    static async createUsuarios(req: Request, res: Response){
        try{
            const {id_usuario,Nombre,password,tipo_usuario} = req.body
            const usuarios = new Usuario({id_usuario,Nombre,password,tipo_usuario})
            usuarios.save()
            res.send('usuario creado con exito')
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
    static async LoginUsuario(req: Request, res: Response){
        try{
            const {Nombre,password} = req.params
            const usuarioExist = await Usuario.findOne({Nombre,password}).select('-password')
            if(!usuarioExist){
                return res.json({error: 'usuario no encontrado',status: 404})
            }
            res.json({usuarioExist,status: 200,type: usuarioExist.tipo_usuario})
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }

}
export default UsuarioController