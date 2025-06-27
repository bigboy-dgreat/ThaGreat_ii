import React from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaMapPin } from 'react-icons/fa'
import { toast } from 'react-toastify'

const JobsPage = ({ deleteJob }) => {
  const { id } = useParams()
  const job = useLoaderData()
  const navigate = useNavigate()

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?')
    if (!confirm) return

    deleteJob(jobId)
    toast.success('Job deleted successfully')
    navigate('/jobs')
  }

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link to='/jobs' className='text-gray-500 hover:text-teal-600 flex items-center'>
            <FaArrowLeft className='text-gray-500 mr-2' /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className='bg-gray-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex items-center justify-center md:justify-start'>
                  <FaMapPin className='text-lg text-orange-500 mr-2' />
                  {job.location}
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-gray-800 text-lg font-bold mb-6'>Job Description</h3>
                <p className='mb-4'>{job.description}</p>
                <p>{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                {job.company ? (
                  <>
                    <h2 className='my-2'>{job.company.name}</h2>
                    <p className='my-2'>{job.company.description}</p>
                    <hr className='my-4' />

                    <h3 className='text-xl'>Contact Email:</h3>
                    <p className='my-2 bg-gray-100 p-2 font-bold'>{job.company.contactEmail || 'N/A'}</p>

                    <h3 className='text-xl'>Contact Phone</h3>
                    <p className='my-2 bg-gray-100 p-2 font-bold'>{job.company.contactPhone || 'N/A'}</p>
                  </>
                ) : (
                  <p className='text-gray-500 italic'>No company information available.</p>
                )}
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                <Link
                  to={`/edit-jobs/${job.id}`}
                  className='bg-gray-500 hover:bg-gray-900 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

const jobLoader = async ({ params }) => {
  try {
    const res = await fetch(`/api/posts/${params.id}`);
    if (!res.ok) {
      throw new Error('Job not found');
    }
    return await res.json();
  } catch (error) {
    console.error('Loader error:', error);
    throw new Response('Invalid job data', { status: 500 });
  }
};


export { JobsPage as default, jobLoader }


