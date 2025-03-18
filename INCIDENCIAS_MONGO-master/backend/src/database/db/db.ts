import mongoose from 'mongoose';
import colors from 'colors';

export const conectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI!;
        const connection = await mongoose.connect(connectionString);
        console.log(colors.bold.green('Base de datos conectada con éxito'));
    } catch (error) {
        console.log(colors.bold.red('Error al conectar al servidor de la base de datos'));
        process.exit(1);
    }
};
