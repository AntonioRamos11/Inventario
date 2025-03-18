import React from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function formateaFecha(fehca){
    const fecha = new Date(fehca)
    return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
    
}
const CardIncidencia = ({id,handleModal,edificio,aula,equipo,descripcion,fecha,tecnico,status, tiempoEstimado}) => {
    /*
    id de la incidencia
    id del edificio
    id del aula
    id del equipo
    descripcion
    fecha en la que se emitio
    tecnico asignado
    status
    tiempo estimado
    */
   //la ultima son para los botones de las columnas
   //diccioanrio para el color
   const setColorEstado = ()=>{
    if(status==='en proceso'){
      return 'text-indigo-600'
    }
    if(status==='pendiente'){
      return 'text-gray-300'
    }
    if(status==='cerrada'){
      return 'text-green-700'
    }
    return ''
   }
   
   const handleLiberarIncidencia = async (e)=>{
    e.preventDefault()
    console.log('liberando incidencia')
    await axios.put('http://localhost:3000/incidencias/liberacion',{
      id_incidencia:id
    }).then(response=>{
      if(response.data.status==='ok'){
        console.log('incidencia liberada')
        toast.success('Incidencia liberada')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }else{

      }
    })
   }
  
  return (
    <div className='grid grid-cols-10 text-center border-b-2 pb-2 last-of-type:pb-5 border-2 border-gray-300 place-items-center p-4 '>
       <p>{id}</p>
       <p>{edificio}</p>
       <p>{aula}</p>
       <p>{equipo}</p>
       <p>{descripcion}</p>
       <p>{formateaFecha(fecha)}</p>
       <p>{tecnico==1?'Sin asignar':tecnico}</p>
       <p> 
        <span
        className={`${setColorEstado()}`}
        >
        {status}
        </span>
        </p>
       <p>{tiempoEstimado==''?'sin asignar':tiempoEstimado}</p>
        <article className='flex justify-around'>
            <button
                 disabled = {status==='en proceso'}
                 onClick = {e =>handleModal(e,id)} className ={`${status==='en proceso'? 'bg-indigo-300 cursor-default':'bg-indigo-700' } cursor-pointer bg-indigo-700 rounded-lg text-white px-1 h-7`}>Editar</button>
            <button 
              onClick={e=>handleLiberarIncidencia(e)}
               className ='bg-yellow-500 rounded-lg text-white px-1 h-7'>Liberar</button>
        </article>
        <ToastContainer/>
    </div>
  )
}

export default CardIncidencia
