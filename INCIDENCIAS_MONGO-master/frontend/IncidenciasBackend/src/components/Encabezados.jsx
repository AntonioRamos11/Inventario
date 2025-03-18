import React from 'react'

const Encabezados = () => {
  return (

    <section className='grid grid-cols-10 bg-gray-600 text-white font-semibold'>
        <article className='text-center'>Id</article>
        <article className='text-center'>Edificio</article>
        <article className='text-center'>Aula</article>
        <article className='text-center'>Equipo</article>
        <article className='text-center'>Descripcion</article>
        <article className='text-center'>Fecha</article>
        <article className='text-center'>Tecnico</article>
        <article className='text-center'>Status</article>
        <article className='text-center'>Tiempo estimado</article>
        <article className='text-center'>Acciones</article>
    </section>
  )
}

export default Encabezados
