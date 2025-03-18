/*

model Edificio {
  id               String       @id @db.VarChar(10)
  departamento_id String?      @db.VarChar(10)
  departamento    Departamento?@relation(fields: [departamento_id], references: [id])
  aulas            Aula[]
  incidencias      Incidencia[]
}
*/
import mongoose, { Document, Schema } from "mongoose";

interface EdificioInterface extends Document {
    id_departamento: string;
    id_edificio: string;
    aulas: string[];
}

const EdificioSchema: Schema = new Schema({
    id_departamento: { type: String },
    id_edificio: { type: String, required: true }, // Si deseas mantenerlo como único, puedes dejarlo aquí
    aulas: { type: [String] }
});

const Edificio = mongoose.model<EdificioInterface>('Edificio', EdificioSchema);

export default Edificio;
