import axios from 'axios'
import { useEffect, useState } from 'react'
import useGlobalProvider from '../hooks/useGlobalProvider'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ReporteEdificios = () => {
  const { usuario } = useGlobalProvider()
  const [aula,setAula] = useState('') // Cambié la inicialización a un arreglo vacío para evitar problemas con [{}
  const [edificios, setEdificios] = useState([]) // Cambié la inicialización a un arreglo vacío para evitar problemas con [{}]
  
  useEffect(() => {
    const cargarEdificios = async () => {
      const { usuarioExist } = JSON.parse(localStorage.getItem('usuario'))
      try {
        const response = await axios.get(`http://localhost:3000/edificios/${usuarioExist.id_usuario}`)
        setEdificios(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    cargarEdificios()
  }, [])
  const aulaSeleccionada = e => {
    e.preventDefault()
  
    const informacionAula = async () => {
      await axios.get(`http://localhost:3000/aulas/aula/${e.target.textContent}`)
                 .then(response => {
                  console.log(response.data.equipos)
                  if(response.data.equipos.length===0){
                    toast.error("No hay equipos en esta aula")
                  }else{
                    let equiposCadena = ''
                    response.data.equipos.forEach(equipo => {
                     console.log(equipo)
                      equiposCadena += `||${equipo}|| `;
                    })
                    toast.info(`${equiposCadena}`)
                  }
                 
                 })
    }
    informacionAula()
  }
  
  return (
    <div className='h-full bg-gray-200 anchura'>
      <h1 className='text-2xl mt-2 text-indigo-800'>Reporte general de edificios</h1>
      <section className='mt-5 overflow-y-auto' style={{ height: '500px' }}>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='bg-gray-700 text-white px-6 py-3 font-medium uppercase tracking-wider'>
                Departamento
              </th>
              <th scope='col' className='px-6 py-3 text-center font-medium bg-black text-white uppercase tracking-wider'>
                Edificio
              </th>
              <th scope='col' className='bg-blue-900 text-center px-6 py-3 font-medium text-white uppercase tracking-wider'>
                Aulas
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {edificios.map((edificio, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {edificio.id_departamento}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {edificio.id_edificio}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='grid grid-cols-3 gap-4'>
                    {edificio.aulas && edificio.aulas.map((aula, aulaIndex) => (
                      <a
                        onClick={aulaSeleccionada}
                        value={aula}
                        key={aulaIndex} className='bg-gray-100 p-2 rounded hover:scale-125 cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200'>
                        {aula}
                      </a>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          
            />
    </div>
  )
}

export default ReporteEdificios
