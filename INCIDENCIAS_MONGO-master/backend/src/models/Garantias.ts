import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';
/*
model Garantia {
  id               Int       @id @default(autoincrement())
  fecha_expiracion DateTime?
  politicas        String    @db.VarChar(200)
  equipos          Equipo[]
}
*/
interface GarantiaInterface extends Document{
    id_garantia: number;
    fecha_expiracion: Date;
    politicas: string;
    equipos: string[];
}
const GarantiaSchema :Schema = new Schema({
    id_garantia: {type: Number, required: true, unique: true},
    fecha_expiracion: {type: Date},
    politicas: {type: String, required: true},
    equipos: {type: [String]},
})
const Garantia = mongoose.model<GarantiaInterface>('Garantia', GarantiaSchema);
export default Garantia;