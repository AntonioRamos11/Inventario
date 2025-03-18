
import { useEffect,useState } from 'react'
import axios from 'axios'
import CuerpoTabla from '../components/CuerpoTabla'
import EncabezadoTabla from '../components/EncabezadoTabla'
const IncidenciasTablas = () => {
    const [incidencias, setIncidencias] = useState([])
    let color = true;
    useEffect(() => {
        //nos traemos todas las incidencias del departamento
        const obtenerIncidencias = async () => { 
            const departamento = JSON.parse(localStorage.getItem('usuario'))
            const { Nombre, id_usuario } = departamento.usuarioExist
            const response = await axios.get(`http://localhost:3000/incidencias/departamento/${id_usuario}`)
            setIncidencias(response.data)
        }   
        obtenerIncidencias()
    })

  return (
    <div className='h-full  bg-gray-200 anchura pt-10 '>
        
    <div className=" bg-white rounded-lg shadow-xl p-2">
      <div className='overflow-auto altura-tabla'>
        <table className="w-full text-center space-y-5">
        <caption className="font-semibold text-gray-700 text-3xl text-center my-5">Tabla de incidencias</caption>
        <thead>
          <EncabezadoTabla />
        </thead>
        <tbody >
          {incidencias.map((incidencia) => { 
              color = !color;
              return (
                <CuerpoTabla
                    key={incidencia.id_incidencia}
                    id_incidencia={incidencia.id_incidencia}
                    id_aula={incidencia.id_aula}
                    id_edificio={incidencia.id_edificio}
                    descripcion={incidencia.descripcion}
                    id_departamento={incidencia.id_departamento}
                    estado={incidencia.estado}
                    id_equipo={incidencia.id_equipo}
                    fecha={incidencia.fecha}

                   color={color}
                />

              );
            })}
        </tbody>
      </table>
      </div>
      
    </div>
    </div>
  )
}

export default IncidenciasTablas
