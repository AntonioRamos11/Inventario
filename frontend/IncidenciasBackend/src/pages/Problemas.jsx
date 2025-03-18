import React from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 import axios from 'axios'
 import { useState,useEffect } from 'react'
const Problemas = () => {
  const [nombre,setNombre] = useState('')
  const [descripcion,setDescripcion] = useState('')
  const [solucion,setSolucion] = useState('')

  const handleSubmitProblemas =async e =>{
    e.preventDefault()
    if([nombre,descripcion,solucion].includes('')){
      return toast.error('Todos los campos son obligatorios') 
    }
    console.log(nombre,descripcion,solucion)
    //{nombre,descripcion,solucion}
    await axios.post('http://localhost:3000/problemas', {
      nombre,
      descripcion,
      solucion
    }).then(response=>{
      if(response.data.status === 'ok'){
        toast.success('Problema reportado correctamente')
        setNombre('')
        setDescripcion('')
        setSolucion('')
      }else{
        toast.error('Error al reportar problema')
      }
    })
  }
  return (
    <div className='flex justify-center flex-col w-screen mt-44'>
        <h2 className='mb-5'>¿Has identificado un problema en concreto?</h2>
        <form onSubmit={handleSubmitProblemas} action="" className='bg-gray-700 w-1/3 mx-auto h-auto p-3 rounded-lg space-y-5'>
          <div className='flex flex-col'>
            <label htmlFor="" className='text-white'>
                Nombre de problema
            </label>
            <input 
            value={nombre}
            onChange={(e)=>{setNombre(e.target.value)}}
            type="text" name="" className='w-1/2 mx-auto' id=""  />
          </div>
          <div className='flex flex-col '>
            <label htmlFor="" className='text-white'>
                Descripcion del problema
            </label>
            <textarea
            value = {descripcion}
            onChange={(e)=>{setDescripcion(e.target.value)}}
            className='w-2/3 mx-auto'  name="" id=""></textarea>
          </div>
          <div className='flex flex-col mb-9 '>
            <label htmlFor="" className='text-white'>
               Solucion del problema
            </label>
            <textarea
            value = {solucion}
            onChange={(e)=>{setSolucion(e.target.value)}}
            className='w-2/3 mx-auto'  name="" id=""></textarea>
          </div>
          <button type='submit' className='text-white border-2 mt-10 border-white p-2 rounded'> 
             Reportar Problema
          </button>
        </form>
        <ToastContainer
      />
    </div>
  )
}

export default Problemas