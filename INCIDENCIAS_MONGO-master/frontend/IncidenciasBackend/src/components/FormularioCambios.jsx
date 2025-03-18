import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
const FormularioCambios = () => {
  //{id_equipo, descripcion, id_aula} 

  const [incidencia, setIncidencia] = useState(0)
  const [descriopcion, setDescripcion] = useState('')
  const [aula,setAula] = useState('')
  const [equipo,setEquipo] = useState('') 

  useEffect(() => {
    const incidenciaLocal = JSON.parse(localStorage.getItem('incidencia'))
    setIncidencia(incidenciaLocal)
    const obtenerIncidencia= async () => {
      try{
        const response = await axios.get(`http://localhost:3000/incidencias/incidencia/${incidenciaLocal}`)
        console.log(response.data.incidecnia.
          id_equipo)          
        setAula(response.data.incidecnia.id_aula)
        setEquipo(response.data.incidecnia.
          id_equipo)

      }catch(error){
        console.log(error)
      }
    }
    obtenerIncidencia()
  }, [])
  
  const handleEnviarCambios = async(e) => {
    //{id_equipo, descripcion, id_aula}
    e.preventDefault()
 if(descriopcion !=''){
  await axios.post('http://localhost:3000/cambios',{
    id_equipo: equipo,
    descripcion: descriopcion,
    id_aula: aula
  }).then(response=>{
    console.log(response.data)
    if(response.data.status ==='ok'){
      toast.success('Cambio enviado correctamente')
      setDescripcion('')
    }else{
      toast.error('Error al enviar cambio')
    }
  })
  return
 }
  toast.error('Debe llenar el campo de descripcion')

   
  }

  return (
    <div className='bg-indigo-600 w-screen h-screen flex flex-col justify-center'>
      <h2 className='text-white font-bold text-3xl'>Gestion de cambios</h2>
      <form
        onSubmit={handleEnviarCambios}
        className='mx-auto p-10 h-auto w-1/3 flex flex-col bg-white rounded-lg space-y-5 mt-20'
      >
        <label htmlFor=''>Incidencia Seleccionada:
          <span className='text-indigo-700'>
            {incidencia}
          </span>
        </label>
        <label htmlFor=''>
          Cambios a realizar:
        </label>
        <textarea 
             value={descriopcion}
             onChange={(e)=>setDescripcion(e.target.value)}
        name='' id='' className='border-2 w-2/3 mx-auto'></textarea>
        <button type='submit' className='bg-indigo-600 p-3 cursor-pointer hover:bg-indigo-800 transition-colors text-white '>
          Enviar Peticion de cambio
        </button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default FormularioCambios