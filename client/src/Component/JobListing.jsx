import React, { useEffect, useState } from 'react';
import JobListings from './JobListings';
import Spinner from './Spinner';

const JobListing = ({ isHome = false }) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome
        ? 'http://localhost:8000/api/posts?limit=3'
        : 'http://localhost:8000/api/posts';

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        // Ensure it's an array
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error('Expected array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-teal-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListings key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListing;



