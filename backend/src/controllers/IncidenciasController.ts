import Incidencia from "../models/incidencias";
import Departamento from "../models/Departamento";
import Aula from "../models/Aula";
import Edificio from "../models/Edificio";
import Equipo from "../models/Equipos";
import Tecnico from "../models/Tecnico";
import { prioridad } from "../models/incidencias";
import { estado } from "../models/incidencias";

import { Request, Response } from "express";
class IncidenciaController {


    static async getIncidenciaById(req:Request, res:Response) {
        try {
            const {id_incidencia} = req.params
            const incidecnia = await Incidencia.findOne({id_incidencia})
            if(incidecnia){
                return res.json({incidecnia,estado: 'ok'})
            }
            res.json({message: 'incidencia no encontrada',estado: 'error'})
                     
        } catch (error) {
            res.send('error en el servidor')
            console.log(error)
        }
    }

    static async getIncidencias(req:Request, res:Response) {
        try {
            const incidencias = await Incidencia.find()
            res.json(incidencias)
        } catch (error) {
            res.send('error en el servidor')
            console.log(error)
        }
    }
    /*
    id_incidencia: number;
    fecha: Date;
    fecha_finalizacion: Date;
    id_departamento: string;
    prioridad: prioridad;
    id_aula: string;
    id_edificio: string;
    descripcion: string;
    id_equipo: string;
    tiempo_estimado: string;
    idTecnico: number;
    Calificacion_atencion: number;
    tipo_incidencia: tipo_incidencia;
    estado: estado;
    */
    static async createIncidencias(req:Request, res:Response) {
    try {
        const {id_incidencia, id_departamento, id_aula, id_edificio, descripcion, id_equipo, idTecnico, Calificacion_atencion, tipo_incidencia} = req.body

        const [departamento, aula, edificio, equipoExist, TecnicoExist] = await Promise.all([
            Departamento.findOne({id_departamento}),
            Aula.findOne({id_aula}),
            Edificio.findOne({id_edificio}),
            Equipo.findOne({id_equipo}),
            Tecnico.findOne({idTecnico})
        ]);

        if (!departamento) {
            return res.status(404).json({message: "Departamento no encontrado"});
        }

        if (!aula) {
            return res.status(404).json({message: "Aula no encontrada"});
        }

        if (!edificio) {
            return res.status(404).json({message: "Edificio no encontrado"});
        }

        if (!equipoExist) {
            return res.status(404).json({message: "Equipo no encontrado"});
        }

        if (!TecnicoExist) {
            return res.status(404).json({message: "Técnico no encontrado"});
        }

        // Rest of your code...
        const prioridad  = 'sinAsignar';
        const fecha = Date.now()
        const estado= 'pendiente'
        const tiempo_estimado = ''
        const fecha_finalizacion = ''
        const incidencias = new Incidencia({id_incidencia,fecha,estado,  fecha_finalizacion, id_departamento, prioridad, id_aula, id_edificio, descripcion, id_equipo, tiempo_estimado, idTecnico, Calificacion_atencion, tipo_incidencia})   
        incidencias.save()
        res.send('Incidencia creada con éxito')
    } catch (error) {
        res.send('error en el servidor')
        console.log(error)
    }
}
/*

la incidencia desde aqui la creamos
edificio **
aula
tipo de equipo
equipo
descripcion
todas son id, la demas informacion la generare por defecto
*/
static async createIncidencia(req:Request, res:Response) {
    try {
        const { id_edificio, id_aula, id_equipo, descripcion, id_departamento } = req.body;

        // Obtenemos el último registro de la colección
        const lastIncidencia = await Incidencia.findOne().sort({$natural:-1}).select('id_incidencia');
        let ultimo = lastIncidencia?.id_incidencia || 0;

        // Generamos el nuevo id_incidencia sumándole 1 al último valor encontrado
        const id_incidencia = ultimo + 1;

        // Generamos la fecha actual
        const fecha = Date.now();

        // Definimos el resto de los campos
        const fecha_finalizacion = '';
        const prioridad = 'sinAsignar';
        const tiempo_estimado = 'sin asignar';
        const idTecnico = 1;
        const Calificacion_atencion = 0;
        const tipo_incidencia = 'sinAsignar';
        const estado = 'pendiente';

        // Convertimos id_equipo en cadena si es un array
        const equipo = Array.isArray(id_equipo) ? id_equipo[0] : id_equipo;

        // Creamos la incidencia con los datos generados
        const incidencia = new Incidencia({
            id_incidencia,
            fecha,
            fecha_finalizacion,
            id_departamento,
            prioridad,
            id_aula,
            id_edificio,
            descripcion,
            id_equipo: equipo, // Usamos el valor convertido
            tiempo_estimado,
            idTecnico,
            Calificacion_atencion,
            tipo_incidencia,
            estado
        });

        // Guardamos la incidencia en la base de datos
        await incidencia.save();

        res.send('incidencia creada correctamente');
    } catch (error) {
        console.log(error);
        res.send('error en el servidor');
    }
}
    static async getIncidenciaByDepartamento(req:Request, res:Response) {   
        try{
            const {id_departamento} = req.params
            const incidencias = await Incidencia.find({id_departamento})
            res.json(incidencias)//aunque no haya incidencias, se devolverá un array vacío
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
        static async liberarIncidencia(req:Request, res:Response) {
            try{
                const {id_incidencia} = req.body
                const incidencia = await Incidencia.findOne({id_incidencia})
                if(!incidencia){
                    return res.status(404).json({message: "Incidencia no encontrada"})
                }
                //lo modificamos como liberado
                if (incidencia) {
                    incidencia.estado =  estado.CERRADA
                    await incidencia.save()
                }
                res.json({msg:'actualizado',status:'ok'})
            }catch(error){
                console.log(error)
                res.send('error en els ervidor')
            }
        }
    static async updateIncidencia(req:Request, res:Response) {
        try{
            //recibimos el id de la incidenica, la prioridad y el id del tecnico encargado
            const {id_incidencia, prioridad, idTecnico} = req.body
            //buscamos la incidencia por su id
            const incidencia = await Incidencia.findOne({id_incidencia})
            //si no existe la incidencia, devolvemos un mensaje
            if(!incidencia){
                return res.status(404).json({message: "Incidencia no encontrada"})
            }
            //si la incidencia existe, actualizamos la prioridad y el id del tecnico
            incidencia.prioridad = prioridad
            incidencia.idTecnico = idTecnico
            incidencia.estado = estado.EN_PROCESO
            //buscamos el tecnico
            const tecnico = await Tecnico.findOne({idTecnico})
            tecnico?.incidencias.push(id_incidencia)
            //guardamos los cambios
            await Promise.all([incidencia.save(),tecnico?.save()])
            //await incidencia.save()
            res.json({msg:'okey'})


        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }
    static async getIncidenciasByTecnico(req:Request, res:Response) {
        try{
            const {idTecnico} = req.params
            const incidencias = await Incidencia.find({idTecnico})
            res.json(incidencias)
        }catch(error){
            res.send('error en el servidor')
            console.log(error)
        }
    }

}
export default IncidenciaController