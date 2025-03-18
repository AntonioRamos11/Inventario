import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { conectDB } from './database/db/db';

// Import routes
import routerAulas from './routes/AulaRoute';
import routerDepartamento from './routes/DepartamentoRoute';
import routerGarantias from './routes/garantiaRoute';
import routerUsuarios from './routes/usuarioRoute';
import problemasRoute from './routes/ProblemasRoute';
import routerTecnicos from './routes/tecnicoRoute';
import incidenciasRoute from './routes/incidenciasRoute';
import edificioRoute from './routes/EdificioRoute';
import routerEquipos from './routes/equiposRoute';
import cambiosRouter from './routes/CambiosRoute';

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/departamentos', routerDepartamento);
app.use('/edificios', edificioRoute);
app.use('/aulas', routerAulas);
app.use('/garantias', routerGarantias);
app.use('/equipos', routerEquipos);
app.use('/usuarios', routerUsuarios);
app.use('/tecnicos', routerTecnicos);
app.use('/incidencias', incidenciasRoute);
app.use('/cambios', cambiosRouter);
app.use('/problemas', problemasRoute);

// Connect to database
conectDB();

// Start server
app.listen(PORT, () => {
  console.log(colors.bold.blue(`Server running on port ${PORT}`));
});