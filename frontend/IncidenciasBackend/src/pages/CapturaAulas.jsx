// CapturaEdificios.js
import React, { useState } from 'react';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useEffect } from 'react';
import useGlobalProvider from '../hooks/useGlobalProvider';
const CapturaAulas = () => {
    const { setUsuario,usuario } = useGlobalProvider();
    const [edificioS, setEdificioS] = useState([]);
    const [edificio,setEdificio] = useState('');
    const [aula,setAula] = useState('');

    useEffect(() => {
        //extraemos el usuario para valores globales
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        setUsuario(usuario.usuarioExist)
    }, []);
    //despues mandamos a traer todos los edificios por departamento
    useEffect(() => { 
        const obtenerEdificios = async () => { 
           const departamento = JSON.parse(localStorage.getItem('usuario'))

           const {data} = await axios.get(`http://localhost:3000/edificios/${departamento.usuarioExist.id_usuario}`)
           console.log(data)
           setEdificioS(data)
        }   
        obtenerEdificios()
    }, []); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        // handle submit logic
        if([edificio,aula].includes('')){
            toast.error('No puedes dejar campos vacios')
            return
        }
        //id aula = {departamento}-edificio-aula
        const id_aula = `${edificio}-${aula}`
        console.log(id_aula,edificio)
        //{id_aula,edificio_id}
        const {data} = axios.post("http://localhost:3000/aulas",{
            id_aula:id_aula,
            edificio_id:edificio
        }).then(res => {
            if(res.data.status==='ok'){
                toast.success('Aula agregada correctamente')
            }else{
                toast.error('Error al agregar aula')
            }

        })
        

    };

    return (
        <div className='h-full  bg-gray-200 anchura '>
            <h2 className='text-indigo-700 text-3xl pt-20   '>Captura tus Aulas y asignalos a un edificio</h2>
            <div className='flex justify-center mt-16'>
                <form onSubmit={handleSubmit} className='bg-white w-1/2 rounded-lg shadow-xl space-y-5 p-10'>
                    <div className='space-y-5'>
                        <label htmlFor="departamento" className='text-indigo-700'>ingresa la letra o numero del aula</label>
                        <input
                            type="text"
                            id='departamento'
                            className='w-full p-2 border-b-4 border-indigo-600 rounded-lg'
                            value={aula}
                            onChange={(e) => setAula(e.target.value)}
                        />
                    </div>
                    <div className='space-y-5'>
                        <label htmlFor="departamento" className='text-indigo-700 block'>Escoge el edificio que quieres agregar la nueva aula</label>
                            <select
                            value={edificio}
                            onChange={(e) => setEdificio(e.target.value)}
                            className='text-center border-none border-b-4 border-indigo' name="" id="" >
                            <option value="">--Selecciona una opcion--</option>
                            {edificioS.map(edificio => (
                                <option key={edificio.id_edificio} value={edificio.id_edificio}>{edificio.id_edificio}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Enviar" className='bg-gray-700 text-white p-3 w-1/2' />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CapturaAulas;

