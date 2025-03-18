import mongoose from 'mongoose';
import colors from 'colors';

export const conectDB = async () => {
    try {
        // Force use of 127.0.0.1 instead of localhost/::1
        const connectionString = 'mongodb://127.0.0.1:27017/incidencias';
        console.log('Connecting to MongoDB at:', connectionString);
        
        await mongoose.connect(connectionString);
        console.log(colors.bold.green('Base de datos conectada con éxito'));
    } catch (error) {
        console.log(colors.bold.red('Error al conectar al servidor de la base de datos'));
        console.error(error);
        // Don't exit the process to allow troubleshooting
        // process.exit(1);
    }
};