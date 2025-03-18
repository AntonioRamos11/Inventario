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
    static async LoginUsuario(req: Request, res: Response) {
        try {
            const { Nombre, password } = req.body; // Use req.body instead of req.params
    
            // Find the user by Nombre
            const usuarioExist = await Usuario.findOne({ Nombre });
    
            if (!usuarioExist) {
                return res.status(404).json({ error: 'Usuario no encontrado', status: 404 });
            }
    
            // Validate the password (plain text comparison for now; use bcrypt in production)
            //if (usuarioExist.password !== password) {
            usuarioExist.password == password
            if (usuarioExist.password== password) {
                //return the p[assword correct to test the login    ]
                return res.status(401).json({ error: 'Contraseña incorrecta', status: 401, password: usuarioExist.password,"usuario":usuarioExist });
            }
    
            // Return the user data (excluding the password)
            const userData = { ...usuarioExist.toObject(), password: undefined };
            res.json({ usuario: userData, status: 200, type: usuarioExist.tipo_usuario });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ error: 'Error en el servidor', status: 500 });
        }
    }

}
export default UsuarioController