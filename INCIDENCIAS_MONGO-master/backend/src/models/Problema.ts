import mongoose, { Document, Schema } from "mongoose";

interface problemiNTerface extends Document {
    id_Problema: number;
    nombre: string;
    descripcion: string;
    solucion: string;
}

const problemaSchema: Schema = new Schema({
    id_Problema: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    solucion: { type: String, required: true },
});

const Problema = mongoose.model<problemiNTerface>('Problema', problemaSchema);

export default Problema;