import Cambios from "../models/Cambios";
import Aula from "../models/Aula";
import Equipo from "../models/Equipos";
import { Request, Response } from "express";

class CambiosCntroller{
  /*
      id_cambio: {type: String, required: true, unique: true},
    id_equipo: {type: String},
    fecha: {type: Date},
    descripcion: {type: String},
  */
    static async getCambios(req: Request, res: Response){
      try{
     
        res.send('Hola mundo')
      }catch(error){
          console.log(error)
          res.send('Error en el servidor')
      }
    }

    static async createCambio(req: Request, res: Response){
    try{
      const {id_equipo, descripcion, id_aula} = req.body
      //verificamos si el equipo existe 
      const equipo = await Equipo.findOne({id_equipo})
      const aula = await Aula.findOne({id_aula})
      if(!equipo){
        return res.status(400).json({msg: 'El equipo no existe'})
      }
      if(!aula){
        return res.status(400).json({msg: 'El aula no existe'})
      }
      //una vez que pase todas las vlidaciones, vamos a crear una funcion para siular una llave 
      //auto incrementable
      let incremento:number =0 
      const autoIncremento = await Cambios.find()
      if(autoIncremento.length === 0){
        incremento =1
      }else{
        incremento++
      }

      const cambioCreado = new Cambios({
        id_cambio: `CMB-${incremento}`,
        id_equipo,
        descripcion,
        id_aula,
        fecha: new Date()
      
      })
      cambioCreado.save()

  
      res.json({msg: 'Cambio creado',status:'ok'})

    }catch(error){
        console.log(error)
        res.json({msg: 'error en el servidor',status:'error'})
    }
} 
}
export default CambiosCntroller