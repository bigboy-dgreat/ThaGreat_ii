import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
   <section className='items-center flex flex-col judtify-center'>
      <FaExclamationTriangle className='text-yellow-400 text-6xl mb-4'/>
      <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
      <p className='text-xl mb-5'>This page does not exist</p>
      <Link 
      to='/'
      className='text-2xl font-bold bg-gray-700 hover:bg-slate-900 text-white rounded-lg py-2 px-4 mt-4'> Go back
      </Link>

   </section>
  )
}

export default NotFoundPage
