const CuerpoTabla = ({ color, id_incidencia, id_aula, id_edificio, id_departamento, estado, id_equipo, fecha, descripcion }) => {
  //convertimos esa fecha a una fecha normal
  const formatearFecha = (fecha) => {
      const fechaNormal = new Date(fecha);
      const dia = fechaNormal.getDate();
      const mes = fechaNormal.getMonth();
      const year = fechaNormal.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${year}`;
      return fechaFormateada;76
  };

  return (
      <tr className={`${color ? 'bg-gray-200' : ''}  border-b-2 last-of-type:border-gray-200`}>

          <td className="py-4">{id_incidencia}</td>
          <td className="py-4">{id_aula}</td>
          <td className="py-4">{id_equipo}</td>
          <td className="py-4">{formatearFecha(fecha)}</td>
          <td className="py-4">{descripcion}</td>
          <td className="py-4 ">{estado}</td>
          <td className="py-4">{id_departamento}</td>
          <td className="py-4">{id_edificio}</td>

      </tr>
  );
};

export default CuerpoTabla;
