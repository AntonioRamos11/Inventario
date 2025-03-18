/*
model Departamento {
  id           String  @id @db.VarChar(10)
  nombre       String  @db.VarChar(50)
  descripcion  String  @db.VarChar(100)
  edificios    Edificio[]
  incidencias  Incidencia[]
}
*/
import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
interface DepartamentoInterface extends Document{
    id_departamento: string;
    nombre: string;
    descripcion: string;
    edificios: string[];
}
const DepartamentoSchema : Schema = new Schema({
    id_departamento: {type: String, required: true, unique: false},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    edificios: {type: [String]},
})
const Departamento = mongoose.model<DepartamentoInterface>('Departamento', DepartamentoSchema);
export default Departamento