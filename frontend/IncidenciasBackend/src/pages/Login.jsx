import React from 'react'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'


const Login = () => {
    const navigate = useNavigate()
    const [Nombre, setNombre] = useState("")
    
    const [error, setError] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const [password,setPassword] = useState('')
    const validarFormulario = (e)=>{
        e.preventDefault()
        //mandamos la peticion http del login
        const iniciarUsuario = async() => {
            try {
                const response = await axios(`http://localhost:3000/usuarios/login/${Nombre}/${password}`)
                console.log(response.data)
                if(response.data.status === 404) {
                    return toast.error('Usuario o contraseña incorrectos')
                }
                
                // Store the user in localStorage
                localStorage.setItem('usuario', JSON.stringify(response.data))
                
                // Add this debug statement to see the structure
                console.log("User type:", response.data.usuario?.type || "Type not found")
                
                // Check for user type in the correct location
                const userType = response.data.usuario?.type;
                
                if(userType === 'departamento') {
                    navigate('/incidencias/crear-incidencia')    
                } else if(userType === 'jefe de tecnicos') {
                    navigate('/jefe-tecnico')
                } else if(userType === 'tecnico') {
                    navigate('/tecnico')
                } else {
                    toast.error('Tipo de usuario no reconocido')
                    console.log("User type not recognized:", userType)
                }
            } catch(e) {
                console.log(e)
                toast.error('Error al iniciar sesión')
            }
        }
        iniciarUsuario()
    }

  return (
    <div className = "fondo-gradiente-lineal w-screen h-screen flex justify-center items-center">
       <div className = "w-1/3 h-auto bg-white rounded-lg p-5">
        <h1 className = "text-indigo-800 text-center text-4xl mt-5 font-bold">Inicia Sesion</h1>
        <form onSubmit = {validarFormulario} className = "mt-5">
          <div className= "flex flex-col space-y-8 items-center gap-2  border-indigo-500">
            <div>
           

            </div>
            <div className= "w-full">
              <input 
              value = {Nombre}
              onChange = {e=>{
                setNombre(e.target.value)}}
              className="w-full p-5 h-6 border-b-4 border-indigo-500  " placeholder="Nombre de usuario"
         
              type="text"
              />
            </div>
            <div className= "w-full">
              <input className="w-full p-5 h-6 border-b-4 border-indigo-500  " placeholder="Contraseña"
              value = {password}
              onChange = {e=>setPassword(e.target.value)}
              type="password"
              />
            </div>
            <button 
              type =  "submit"
              
              className = "bg-indigo-700 text-white w-full p-2 rounded-sm hover:bg-indigo-800 transition-all duration-100 font-bold text-2xl mb-4">
              Iniciar
            </button>
            
          </div>
         
        </form>

       </div>
       <ToastContainer />
     
     
    </div>
  )
}

export default Login
