import React from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'

const HomeCards = ({ job }) => {
  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
                 <Cards>
                  <h2 className='text-2xl font-bold'>For Developer</h2>
                        <p className='mt-2 mb-4'>Browse  our Home Jobs and Start your career today</p>
                        <Link to='jobs/' className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-teal-700'>
                        Browse Jobs
                        </Link>

                 </Cards>
                  <Cards bg='bg-gray-300'>
                         <h2 className='text-2xl font-bold'>For Employers</h2>
                        <p className='mt-2 mb-4'>List your job to find the perfect team for the role</p>
                        <Link to='/add-job' className='inline-block bg-teal-700 text-white rounded-lg py-2 px-4 hover:bg-gray-600'>
                        Add Jobs
                        </Link>

                  </Cards>


                  </div>

      </div>
      
    </section>
  )
}

export default HomeCards
