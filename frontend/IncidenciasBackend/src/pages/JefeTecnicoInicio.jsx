import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Encabezados from '../components/Encabezados'
import CardIncidencia from '../components/CardIncidencias'
import ModalAsignacion from '../components/ModalAsignacion'
import { useNavigate } from 'react-router-dom'
const JefeTecnicoInicio = () => {
    const navigate = useNavigate()
    useEffect(() => {
        //mandamos a traer todas las incidencias
        const obtenerIncidencias = async () => {   
            const response = await axios.get("http://localhost:3000/incidencias") 
            console.log(response.data)
            setIncidencias(response.data)
         }
         obtenerIncidencias()
    },[])
    //nos traemos a todos los tecnicos para asignarlos en difernetes partes
    useEffect(() => {
        const obtenerTecnicos = async () => {
            const response = await axios.get("http://localhost:3000/tecnicos")
            console.log(response.data)
            setTecnicos(response.data)
        }
        obtenerTecnicos()
    },[])

    const [incidencias, setIncidencias] = useState([])
    const [incidenciaSeleccionada,setIncidenciaSeleccionada] = useState()   
    const [modal,setModal] = useState(false)
    const [tecnicos,setTecnicos] = useState([])



    const handleModal = (e,id)=>{
        e.preventDefault()
        console.log('cambaindo modal')
        setIncidenciaSeleccionada(id)
    
        setModal(!modal)  
        console.log(modal)
      }
      

  return (
    <div className='w-screen p-8'>
         {modal && <ModalAsignacion handleModal={handleModal} tecnicos={tecnicos} id_incidencia={incidenciaSeleccionada}/>}
        <h1 className='text-3xl text-indigo-600 mb-10'>Incidencias de todos los departamentos</h1>
        <button 
        onClick={()=>navigate('/jefe-tecnico/problemas')}
         className='mb-10 border-4 rounded-lg border-indigo-800 hover:bg-indigo-800 hover:text-white transition-colors'>
        ¿Problemas?
        </button>

        <Encabezados/>
       
            {incidencias.map(incidecnia=>(
                <CardIncidencia
                  key={incidecnia.id_incidencia}
                  id={incidecnia.id_incidencia}
                  edificio={incidecnia.id_edificio}
                  aula={incidecnia.id_aula}
                  equipo={incidecnia.id_equipo}
                  descripcion={incidecnia.descripcion}
                  fecha={incidecnia.fecha}
                  tecnico={incidecnia.idTecnico}
                  handleModal={handleModal}
                  status={incidecnia.estado}
                  tiempoEstimado={incidecnia.tiempo_estimado}
                />
            ))}
       

    </div>
  )
}

export default JefeTecnicoInicio
