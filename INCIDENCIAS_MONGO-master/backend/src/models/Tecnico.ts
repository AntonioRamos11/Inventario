/*
model Tecnico {
  id                Int         @id @default(autoincrement())
  usuario_id        String      @unique @db.VarChar(10)
  nombre            String      @db.VarChar(20)
  apeMat            String      @db.VarChar(20)
  apePat            String      @db.VarChar(20)
  horario           String      @db.VarChar(10)
  disponibilidad    Boolean
  tipo_tecnico_id   Int
  Promedio          Float?
  incidencias       Incidencia[]
  usuario           Usuario     @relation(fields: [usuario_id], references: [id_usuario])
  tipoTecnico       TipoTecnico @relation(fields: [tipo_tecnico_id], references: [id])
}

*/
import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
enum tipo_tecnico{
    SOFTWAE = 'software',
    HARDWARE = 'hardware',
}
interface TecnicoInterface extends Document{
    idTecnico: String | number;
    id_usuario: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    horario: string;
    disponibilidad: boolean;    
    tipo_tecnico: tipo_tecnico;
    promedio: number;
    incidencias: string[]
} 
const TecnicoSchema :Schema = new Schema({
    idTecnico: {type: String, required: true},
    id_usuario: {type: String, required: true },
    nombre: {type: String, required: true},
    apellido_paterno: {type: String, required: true},
    apellido_materno: {type: String, required: true},
    horario: {type: String, required: true},
    disponibilidad: {type: Boolean, required: true},
    tipo_tecnico: {type: String, required: true},
    promedio: {type: Number},
    incidencias: {type: [String]}
})
const Tecnico = mongoose.model<TecnicoInterface>('Tecnico', TecnicoSchema);
export default Tecnico