// CapturaEdificios.js
import React, { useState } from 'react';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useEffect } from 'react';
import useGlobalProvider from '../hooks/useGlobalProvider';
const CapturaEdificios = () => {
    const { setUsuario,usuario } = useGlobalProvider();
    const [edificio, setEdificio] = useState('');
    useEffect(() => {
        //extraemos el usuario para valores globales
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        setUsuario(usuario.usuarioExist)
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();
        // handle submit logic
        if(edificio!=''){
            //mandamos la peticion http para agregar el edificio
            const id_edificio = `${usuario.id_usuario}-${edificio}`
            console.log(usuario.id_usuario)
          const response =await axios.post('http://localhost:3000/edificios', {
               id_departamento: usuario.id_usuario,
               id_edificio,
               aulas: []
            }).then(res=>{
                console.log(res.data)
                if(res.data.status ==="error"){
                    toast.error('Ese edificio ya existe')
                    return
                }
                toast.success('Edificio agregado correctamente')})
              .catch(err=>{toast.error('Error al agregar edificio')})
           return
        }
        toast.error('El campo no puede estar vacio')
    };

    return (
        <div className='h-full  bg-gray-200 anchura '>
            <h2 className='text-indigo-700 text-3xl pt-20   '>Captura tus edificios</h2>
            <div className='flex justify-center mt-16'>
                <form onSubmit={handleSubmit} className='bg-white w-1/2 rounded-lg shadow-xl space-y-5 p-10'>
                    <div className='space-y-5'>
                        <label htmlFor="departamento" className='text-indigo-700'>ingresa la letra o siglas del edificio</label>
                        <input
                            type="text"
                            id='departamento'
                            className='w-full p-2 border-b-4 border-indigo-600 rounded-lg'
                            value={edificio}
                            onChange={(e) => setEdificio(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Enviar" className='bg-gray-700 text-white p-3 w-1/2' />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CapturaEdificios;

