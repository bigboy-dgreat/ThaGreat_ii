import React, { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobListings = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Guard against missing job or job.description
  if (!job || !job.description) {
    return <div className="text-red-500">Invalid job data</div>;
  }

  let description = job.description;
  if (!showFullDescription) {
    description = description.substring(0, 90) + '...';
  }

  return (
    <div className='bg-yellow-50 rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <div className='text-gray-600 my-2'>
            {job.type}
            <h3 className='text-xl font-bold'>{job.title}</h3>
          </div>

          <div className='mb-5'>{description}</div>
          
          <button
            onClick={() => setShowFullDescription((prevState) => !prevState)}
            className='text-teal-500 font-sans mb-4 hover:text-teal-600'
          >
            {!showFullDescription ? 'More' : 'Less'}
          </button>

          <h3 className='text-gray-500 mb-2'>{job.salary}/Year</h3>

          <div className='border border-gray-200 mb-5'></div>

          <div className='flex flex-col lg:flex-row justify-between mb-4'>
            <div className='text-orange-700 mb-3'>
              <FaMapMarker className='inline text-lg mb-1 mr-1' />
              {job.location}
            </div>

            <Link
              to={`/jobs/${job.id}`}
              className=' bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-4 py-2 text-center text-sm'
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;

