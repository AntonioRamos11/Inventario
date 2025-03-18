// EncabezadoTabla.js
import React from 'react';

const EncabezadoTabla = () => {
  return (
    <tr className="bg-gray-200">
      <th className="px-4 py-2">ID</th>
      <th className="px-4 py-2">Aula</th>
      <th className="px-4 py-2">Equipo</th>
      <th className="px-4 py-2">Fecha</th>
      <th className="px-4 py-2">Descripción</th>
      <th className="px-4 py-2">Estado</th>
      <th className="px-4 py-2">Departamento</th>
      <th className="px-4 py-2">Edificio</th>
    </tr>
  );
};

export default EncabezadoTabla;
