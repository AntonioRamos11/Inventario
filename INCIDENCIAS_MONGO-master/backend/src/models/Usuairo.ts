/*

model Usuario {
  id_usuario String   @id @db.VarChar(10)
  Nombre     String?  @db.VarChar(10)
  pass       String?  // en caso de pedir autenticacion, este campo se hashea
  tecnico    Tecnico? // Relación inversa
}*/
import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
export enum tipo_usuario{
    TECNICO = 'tecnico',
    TECNICO_ADMIN = 'jefe de tecnicos',
    DEPARTAMENTO = 'departamento',
}
interface UsuarioInterface extends Document{
    id_usuario: string;
    Nombre: string;
    password: string;
    tipo_usuario: tipo_usuario; //solo un tipo de usuairo por cada usuario
}

const UsuarioSchema:Schema = new Schema({
    id_usuario: {type: String, required: true, unique: true},
    Nombre: {type: String},
    password: {type: String},
    tipo_usuario: {type: String, required: true}
})
const Usuario = mongoose.model<UsuarioInterface>('Usuario', UsuarioSchema);
export default Usuario ;