import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ReporteAulas = () => {
    const [aulas, setAulas] = useState([])

    useEffect(() => {
        const obtenerAulas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/aulas')
                console.log(response.data)
                setAulas(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerAulas()
    }, [])

    return (
        <div className='h-full bg-gray-200 anchura px-10 pt-4'>
            <h1 className='text-center text-indigo-800 text-3xl mb-3'>Detalle de Aulas</h1>
            <table className='mx-auto w-full border-collapse  border-black border-2'>
    <thead>
        <tr>
            <th scope='col' className='w-1/2 bg-blue-900 text-center px-6 py-3 font-medium text-white uppercase tracking-wider border border-black border-2'>
                Aula
            </th>
            <th scope='col' className='w-1/2 py-3 text-center font-medium bg-black text-white uppercase tracking-wider border border-black border-2'>
                Equipos
            </th>
        </tr>
    </thead>
    <tbody>
        {aulas.map(aula => (
            <tr key={aula.id_aula} className='border-b border-black border-2'>
                <td className='px-6 py-4 whitespace-nowrap text-center border-black border-2'>
                    {aula.id_aula}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center border-black border-2'>
                    <div className='grid grid-cols-3 gap-4 '>
                        {aula.equipos.map((equipo, index) => (
                            <a
                                className='bg-gray-300 rounded-lg p-1 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-150 hover:scale-110'
                                key={index}>
                                {equipo}
                            </a>
                        ))}
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    )
}

export default ReporteAulas
