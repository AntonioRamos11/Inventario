import React, { useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'

const ModalAsignacion = ({ handleModal, tecnicos, id_incidencia }) => {

    const [tipoTecnico, setTipoTecnico] = useState('')
    const [tecnicosArreglo, setTecnicosArreglo] = useState([])
    const [tecnicoAsignado, setTecnicoAsignado] = useState({})
    const [prioridad, setPrioridad] = useState('')
    const [tipo, setTipo] = useState('')

    const handelChangeTecnico = e => {
        console.log(id_incidencia)
        e.preventDefault()
        const tipo = e.target.value
        setTipoTecnico(tipo)
        //FILTRAMOS POR ESE MISMO TIPO DE TECNICO
        setTecnicosArreglo(
            tecnicos.filter(tecnico => tecnico.tipo_tecnico === tipo)
        )
    }
    const handleChangePrioridad = e => {
        e.preventDefault()
        setPrioridad(e.target.value)
     
    }
    const handleActualizarIncidencia = e => {
        e.preventDefault()
         //validamos que haya datos antes de mandar la peticion
         if([tecnicoAsignado,prioridad].includes('')){
            toast.error('Es necesario llenar todos lso datos')
            return
         }
         //ya todos los datos vamos a mandar los datos
         /*
         {
            "id_incidencia":4 ,
            "prioridad":"alta",
            "idTecnico":"KEK"
          }
         */
         //mandaremos el id, del tecnico, y la prioridad y ya
         const acutalizarRegistro = async () => {
            const response = await axios.put('http://localhost:3000/incidencias/actualizar',{ 
                id_incidencia:id_incidencia,
                prioridad:prioridad,
                idTecnico:tecnicoAsignado
            })
            console.log(response.data)
            if(response.data.msg==='okey'){
                toast.success('Incidencia actualizada', {autoClose: 1000})
                setTimeout(() => {
                    handleModal(e)
                }, 1000);
            }
        }
        acutalizarRegistro()

    }



    return (
        <div className='modal flex flex-col'>
            <button onClick={e => handleModal(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <form onSubmit={handleActualizarIncidencia} action="submit" className='mx-auto mt-40 bg-gray-100 flex justify-center flex-col px-24 py-9 rounded-lg w-1/2'>
                <div className='flex gap-10'>
                    <div>
                        <input id='software' name='tipo' onChange={handelChangeTecnico} value='software' type="radio" />

                        <label htmlFor="">Software</label>
                    </div>
                    <div>
                        <input id='hardware' name='tipo' onChange={handelChangeTecnico} value='hardware' type="radio" />

                        <label htmlFor="">Hardware</label>
                    </div>
                </div>

                <label htmlFor="" className='block'>Tecnico Asignado</label>
                <select
                    
                    value={tecnicoAsignado} onChange={e => setTecnicoAsignado(e.target.value)}
                    name="" id=""
                     className='block py-2 px-0 w-full text-lg text-center text-gray-500 bg-transparent border-indigo-700 border-b-4 rounded-b-lg appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer'>
                    <option value="">--Asigna a un tecnico--</option>
                    { tecnicosArreglo.length>0?tecnicosArreglo.map(tecnico => <option value={tecnico.idTecnico} key={tecnico.idTecnico}>{tecnico.nombre}{'--'}Calificacion:{tecnico.promedio}</option>):'No has seleccionado un tipo de tecnico'}
                </select>
                
                <div className='mt-5'>
                    <p className='text-center block mb-5'>
                        Selecciona la Prioridad
                    </p>
                    <section className='flex gap-20 justify-center'>
                        <span>
                            <input type="radio" name='prioridad' value='baja' id='baja' onChange={e => setPrioridad(e.target.value)} />
                            <label onChange={e=>handleChangePrioridad(e)} value='baja' htmlFor="baja">Baja</label>
                        </span>
                        <span>
                            <input type="radio" name='prioridad' value='media' id='media' onChange={e => setPrioridad(e.target.value)} />
                            <label onChange={e=>handleChangePrioridad(e)} value='media' htmlFor="media">Media</label>
                        </span>
                        <span>
                            <input  type="radio" name='prioridad' value='alta' id='alta' onChange={e => setPrioridad(e.target.value)} />
                            <label onChange={e=>handleChangePrioridad(e)} value='alta' htmlFor="alta">Alta</label>
                        </span>
                    </section>
                
                </div>
               
                <div className='flex justify-center'>
                <button type='submit' className='block bg-gray-700 mt-5 text-center text-white font-semibold w-44 rounded'>Realizar Modificacion</button>
                </div>
            </form>
            <ToastContainer/>

        </div>
    )
}

export default ModalAsignacion
