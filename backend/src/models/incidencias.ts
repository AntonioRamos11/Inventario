import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
/*

model Incidencia {
  id                    Int        @id @default(autoincrement())
  fecha                 DateTime?
  fecha_finalizacion    DateTime?
  departamento_id       String     @db.VarChar(10)
  prioridad             String     @db.VarChar(10)
  aula_id               String     @db.VarChar(10)
  edificio_id           String     @db.VarChar(10)
  descripcion           String     @db.VarChar(200)
  equipo_id             String     @db.VarChar(10)
  tiempo_estimado       String     @db.VarChar(50)
  tecnico_id            Int
  Calificacion_atencion Float?
  tipo_incidencia       String     @db.VarChar(50)
  estado                String     @db.VarChar(10)
  departamento          Departamento? @relation(fields: [departamento_id], references: [id])
  aula                  Aula?         @relation(fields: [aula_id], references: [id])
  edificio              Edificio?     @relation(fields: [edificio_id], references: [id])
  equipo                Equipo        @relation(fields: [equipo_id], references: [id])
  tecnico               Tecnico       @relation(fields: [tecnico_id], references: [id])
}
*/
export enum prioridad{
    ALTA = 'alta',
    MEDIA = 'media',
    BAJA = 'baja',
}
export enum estado{
    ABIERTA = 'pendiente',
    EN_PROCESO = 'en proceso',
    CERRADA = 'terminada',
}
enum tipo_incidencia{
    SOFTWARE = 'software',
    HARDWARE = 'hardware',
}
interface IncidenciaInterface extends Document{
    id_incidencia: number;
    fecha: Date;
    fecha_finalizacion: Date | String;
    id_departamento: string;
    prioridad: prioridad;
    id_aula: string;
    id_edificio: string;
    descripcion: string;
    id_equipo: string;
    tiempo_estimado: string;
    idTecnico:  string;
    Calificacion_atencion: number;
    tipo_incidencia: tipo_incidencia;
    estado: estado;
}
const IncidenciaSchema :Schema = new Schema({
    id_incidencia: {type: Number, required: true, unique: true},
    fecha: {type: Date},
    fecha_finalizacion: {type:[Date, String]},
    id_departamento: {type: String, required: true},
    prioridad: {type: String, required: true},
    id_aula: {type: String, required: true},
    id_edificio: {type: String, required: true},
    descripcion: {type: String, required: true},
    id_equipo: {type: String, required: true},
    tiempo_estimado: {type: String, },
    idTecnico: {type:String, required: true},
    Calificacion_atencion: {type: Number},
    tipo_incidencia: {type: String, required: true},
    estado: {type: String, required: true},
})
const Incidencia = mongoose.model<IncidenciaInterface>('Incidencia', IncidenciaSchema);
export default Incidencia;