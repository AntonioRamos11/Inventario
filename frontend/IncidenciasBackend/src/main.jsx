// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Form, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Incidencias from './pages/Incidencias';
import JefeTecnicoInicio from './pages/JefeTecnicoInicio';
import TecnicoInicio from './pages/TecnicoInicio';
import IncidenciasTablas from './pages/IncidenciasTablas';
import CapturaEquipo from './pages/CapturaEquipo';
import CapturaEdificios from './pages/CapturaEdificios';
import CapturaEquipos from './pages/CapturaEquipos';
import CapturaAulas from './pages/CapturaAulas';
import Problemas from './pages/Problemas';
import ReporteEdificios from './pages/ReporteEdificios';
import ReporteAulas from './pages/ReporteAulas';
import Layout from './Layout/Layout';
import FormularioCambios from './components/FormularioCambios';
import { GlobalProvider } from './context/globalContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/incidencias',
    element: <Layout />,
    children: [
      {
        path: "/incidencias/crear-incidencia",
        element: <Incidencias />
      },
      {
        path: "/incidencias/tablas",
        element: <IncidenciasTablas />
      },
      {
        path: "/incidencias/captura-edificios",
        element: <CapturaEdificios />
      },
      {
        path: "/incidencias/captura-aulas",
        element: <CapturaAulas />
      }
      ,
      {
        path: "/incidencias/captura-equipos",
        element: <CapturaEquipos/>
      },
      {
        path: "/incidencias/reporte-edificios",
        element: <ReporteEdificios/>
      },
      {
        path: "/incidencias/reporte-aulas",
        element: <ReporteAulas/>
      }
    ]
  },
  {
    path: '/jefe-tecnico',
    element: <JefeTecnicoInicio />
  },
  {
    path: '/jefe-tecnico/problemas',
    element: <Problemas />
  },
  {
    path: '/tecnico',
    element: <TecnicoInicio />
  },
  {
    path: '/tecnico/formulario-cambios',
    element: <FormularioCambios />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
