import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Incidencias = () => {
    const [usuario, setUsuario] = useState([])
    const [edificios, setEdificios] = useState([])
    const [aulas, setAulas] = useState([])
    const [aula, setAula] = useState();
    const [tipoEquipos, setTipoEquipos] = useState([])
    const [tipoEquipo, setTipoEquipo] = useState('');
    const [equipoFisico, setEquipoFisico] = useState([])
    const [equipo, setEquipo] = useState('')
    const [descripcion, setDescripcion] = useState('')


    const [edificio, setEdificio] = useState()
    useEffect(() => {
        const obtenerEdificios = async () => {
            //extraemos el usuario del localStorage
            const usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
            setUsuario(usuarioLocal)
            const { Nombre, id_usuario } = usuarioLocal.usuarioExist
            console.log(Nombre, id_usuario)
            const response = await axios.get(`http://localhost:3000/edificios/${id_usuario}`)
            setEdificios(response.data)
        }
        obtenerEdificios()
    }, [])
    //efecto para traer las aulas del edificio seleccioando
    useEffect(() => {
        if (edificio !== '') {
            const obtenerAulas = async () => {
                const response = await axios.get(`http://localhost:3000/aulas/${edificio}`)
                console.log(response.data)
                setAulas(response.data)
            }
            obtenerAulas()
        }
    }, [edificio])
    //efecto para traer todos los equipso de equipos
    useEffect(() => {
        const obtenerTipoEquipos = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/equipos/tipo`);
                // Convertir el objeto de tipoEquipos en un array de objetos [{ id: 'PC', nombre: 'PC' }, ...]
                const equiposArray = Object.entries(response.data).map(([key, value]) => ({ id: key, nombre: value }));
                setTipoEquipos(equiposArray);
            } catch (error) {
                console.error("Error al obtener los tipos de equipos:", error);
                // Manejo de errores aquí, por ejemplo, mostrar un mensaje de error al usuario
            }
        };
        obtenerTipoEquipos();
    }, []);
    useEffect(() => {
        if (tipoEquipo !== '' && aula !== '') {
            const obtenerEquipos = async () => {
               
                console.log(aula, tipoEquipo, 'antes de pedir todos los equipos')
                console.log(`http://localhost:3000/equipos/aula/${aula}/${tipoEquipo}`)
                const response = await axios.get(`http://localhost:3000/equipos/aula/${aula}/${tipoEquipo}`);
               //http://localhost:3000/equipos/aula/sys-a-01/PC
                console.log(response.data)
                console.log('despeus de pedir todos los equipos')
                setEquipoFisico(response.data)
            }
            obtenerEquipos()
        }

    }, [tipoEquipo, aula]);
    const reportarIncidencia = async (e) => {
        e.preventDefault()
        if (edificio === '' || aula === '' || tipoEquipo === '' || descripcion === '') {
            toast.error('Por favor llena todos los campos')
            return
        }
        const incidencia = {
            id_edificio: edificio,
            id_aula: aula,
            id_equipo: equipo,
            descripcion: descripcion,
            id_departamento: usuario.usuarioExist.id_usuario
        }
        console.log(incidencia)
        try {
            console.log(incidencia.id_equipo)
            const response = await axios.post('http://localhost:3000/incidencias/crear', incidencia)
            console.log(response.data)
            toast.success('Incidencia reportada correctamente')
            //reiniciamos todo el formulario
            setEdificio('')
            setAula('')
            setTipoEquipo('')
            setDescripcion('')
            
        } catch (error) {
            console.error('Error al reportar la incidencia', error)
            alert('Error al reportar la incidencia')
        }
    
    }

/*

la incidencia desde aqui la creamos
edificio
aula
tipo de equipo
equipo
descripcion
///////////
{id_edificio,id_aula,id_equipo,descripcion,id_departamento}
*/
    return (
        <div className="h-full  bg-gray-200 anchura">
            <h3 className=" text-center text-indigo-700 text-3xl pt-10 font-bold">Reportes o incidencias</h3>
            <div className="flex justify-center  mt-11">
                <form onSubmit={reportarIncidencia} className="bg-white border-rounded flex rounded-lg shadow-lg flex-col p-5 space-y-7 w-2/4">
                    <select onChange={e => setEdificio(e.target.value)} value={edificio} className="block py-2 px-0 w-full text-lg text-center text-gray-500 bg-transparent border-0 border-indigo-700 border-b-4 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer">
                        <option value="">--Selecciona el edificio--</option>
                        {edificios.map((edificio) => <option key={edificio.id_edificio}>{edificio.id_edificio}</option>)}
                        {/* Opciones de edificio */}
                    </select>

                    <select onChange={e => setAula(e.target.value)} value={aula} className="block py-2 px-0 w-full text-lg text-center text-gray-500 bg-transparent border-0 border-indigo-700 border-b-4 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer">
                        <option value="">--Selecciona el aula--</option>
                        {aulas.map((aula) => <option key={aula.id_aula}>{aula.id_aula}</option>)}
                    </select>
                    <select className='className="block py-2.5 px-0 w-full text-lg text-center text-gray-500 bg-transparent border-0 border-indigo-700 border-b-4 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"' value={tipoEquipo} onChange={e => setTipoEquipo(e.target.value)}>
    <option value="">--Selecciona el tipo de equipo que quieres reportar--</option>
    {tipoEquipos && tipoEquipos.length > 0 && tipoEquipos.map((tipoEquipo) => (
        <option key={tipoEquipo.id} value={tipoEquipo.id}>{tipoEquipo.nombre}</option>
    ))}
</select>

                    <select 
                         value={equipo} onChange={e => setEquipo(e.target.value)}
                         className="block py-2.5 px-0 w-full text-lg text-center text-gray-500 bg-transparent border-0 border-indigo-700 border-b-4 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer">
                        <option value="">--Slecciona el equipo a realizar el reporte--</option>
                        {equipoFisico.map((equipo) => <option key={equipo.id_equipo}>{equipo.id_equipo}</option>)}
                        {/* Opciones de equipo */}
                    </select>

                    <textarea
                     value={descripcion} onChange={e => setDescripcion(e.target.value)}
                    className="border-4 border-opacity-50 border-indigo-400 shadow-lg" id="" placeholder="Brinda detalles del reporte" cols="30" rows="5"></textarea>

                <input
                    className="w-full text-2xl bg-red-600 hover:bg-red-700 transition-colors duration-100 font-bold text-white  p-2 cursor-pointer"
                    type="button"
                    value="Reportar incidencia"
                    onClick={reportarIncidencia}
                />
                </form>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Incidencias
