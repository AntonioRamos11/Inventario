import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
/*
model Equipo {
  id              String     @id @db.VarChar(10)
  nombre          String     @db.VarChar(50)
  tipo            String     @db.VarChar(10)
  caracteristicas String     @db.VarChar(100)
  aula_id         String?    @db.VarChar(10)
  garantia_id     Int?       
  aula            Aula?      @relation(fields: [aula_id], references: [id])
  garantia        Garantia?  @relation(fields: [garantia_id], references: [id])
  bitacoras       Bitacora []
  tipoEquipo_Id   Int
  incidencias     Incidencia[]
  tipoEquipo      TipoEquipo @relation(fields: [tipoEquipo_Id], references: [id])
}
*/
export enum tipo_equipo{
    PC = 'PC',
    PORTATIL = 'PORTATIL',
    PROYECTOR = 'PROYECTOR',
    IMPRESORA = 'IMPRESORA',
    OTRO = 'OTRO',
}
interface EquipoInterface extends Document{
    id_equipo: string;
    caracteristicas: string;
    id_aula: string;
    garantia_id: number;
    bitacoras: string[];
    tipoEquipo: tipo_equipo
}
const EquipoSchema :Schema = new Schema({
    id_equipo: {type: String, required: true, unique: true},
   
    caracteristicas: {type: String, required: true},
    id_aula: {type: String},
    garantia_id: {type: Number},
    bitacoras: {type: [String]},
    tipoEquipo: {type: String, required: true}
})
const Equipo = mongoose.model<EquipoInterface>('Equipo', EquipoSchema);
export default Equipo;