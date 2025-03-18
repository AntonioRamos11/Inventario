import React from 'react'
import { useState,useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import GridCard from '../components/GridCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TecnicoInicio = () => {
    const [incidencias, setIncidencias] = useState([])
    const navigate = useNavigate()
    const [modalSeleccionado,setModalSeleccionado] = useState(false)
    const [incidencia,setIncidencia]=useState(0)
    //mandamos a traer las incidencias por el id del tecnico
    useEffect(() => { 
        const obtenerIncidencias = async () => {
            //traemos el id del tecnico del localStorage
            const usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
            const { Nombre, id_usuario } = usuarioLocal.usuarioExist
            console.log(id_usuario)
            const response = await axios.get(`http://localhost:3000/incidencias/tecnico/${id_usuario}`)
          
            console.log(response.data)
            setIncidencias(response.data)
        }
    
        obtenerIncidencias()
     },[]) 
     const handleModal = ()=>{
      setModalSeleccionado(!modalSeleccionado)
      
     }
     const incidenciaSeleccionada = (id) =>{
  
      console.log(id)
      setIncidencia(id)
      toast.info(`Incidencia seleccionada ${id}`)
     }
     const cambios =e =>{
        e.preventDefault()
        if(incidencia === 0){
            toast.error('Selecciona una de las incidencias antes')
           return    
        }
        console.log('pasando los filtro')
        //mandamos ese id al localStorage
        localStorage.setItem('incidencia',JSON.stringify(incidencia))
        navigate('/tecnico/formulario-cambios')

     }
   

  return (
    <div className='bg-gray-200 w-screen p-24'>
        <h1  className='mb-10 text-3xl bg-indigo-900 text-white p-2'>Incidencias asignadas</h1>
        <section className='grid grid-cols-3  place-items-center'>
            {incidencias.map(incidencia=>
            (<GridCard   
                    incidenciaSeleccionada={incidenciaSeleccionada}
                    id_incidencia = {incidencia.id_incidencia}
                    handleModal ={handleModal}
                    descripcion={incidencia.descripcion}
                    id_aula={incidencia.id_aula}
                    id_edificio={incidencia.id_edificio}
                    id_equipo={incidencia.id_equipo}
                    prioridad={incidencia.prioridad}
                    id_departamento={incidencia.id_departamento}
                    tiempo_estimado={incidencia.tiempo_estimado}
                    fecha={incidencia.fecha}
                    departamento={incidencia.id_departamento}
                    key={incidencia.id_incidencia}
            />))}
        </section>  
     <a 
     onClick={e => cambios(e)}
     href="" className='bg-gray-700 p-3 text-white rounded-lg hover:bg-gray-900 transition-all'>
         Selecciona una de las incidencias
     </a>
     <ToastContainer></ToastContainer>
    </div>
  )
}

export default TecnicoInicio
