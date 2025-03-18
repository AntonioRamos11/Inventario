import mongoose from "mongoose";
import { Document,Schema, PopulatedDoc }  from 'mongoose';

interface CambiosInterface extends Document{
    id_cambio: string;
    id_equipo: string;
    id_aula: string;
    fecha: Date;
    descripcion: string;
}
const CambioSchema :Schema = new Schema({
    id_cambio: {type: String, required: true},
    id_equipo: {type: String},
    id_aula: {type: String},
    fecha: {type: Date},
    descripcion: {type: String},
})
const Cambios = mongoose.model<CambiosInterface>('Cambios', CambioSchema);
export default Cambios