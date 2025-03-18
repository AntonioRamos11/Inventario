import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
/*
model Aula {
  id           String    @id @db.VarChar(10)
  edificio_id  String?   @db.VarChar(10)
  edificio     Edificio? @relation(fields: [edificio_id], references: [id])
  equipos       Equipo[]
  incidencias   Incidencia[]
}
*/
interface AulaInterface extends Document{
    id_aula: string;
    edificio_id: string;
    edificio: string;
    equipos: string[];
}
const AulaSchema : Schema = new Schema({
    id_aula: {type: String, required: true, unique: true},
    edificio_id: {type: String},
    edificio: {type: String},
    equipos: {type: [String]},
})
const Aula = mongoose.model<AulaInterface>('Aula', AulaSchema);
export default Aula