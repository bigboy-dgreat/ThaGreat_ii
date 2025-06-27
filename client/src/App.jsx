import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayouts from './Pages/Layouts/MainLayouts';
import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';
import JobPage from './Pages/JobPage';
import JobsPage, { jobLoader } from './Pages/JobsPage';
import AddJobPage from './Pages/AddJobPage';
import EditJobPage from './Pages/EditJobPage';

const App = () => {
  // ✅ Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      });

      if (!res.ok) {
        throw new Error('Failed to create job');
      }

      return await res.json(); // returns created job
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete job');
      }

      return await res.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Update Job (fix: use job.id)
  const updateJob = async (job) => {
    try {
      const res = await fetch(`http://localhost:8000/api/posts/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      });

      if (!res.ok) {
        throw new Error('Failed to update job');
      }

      return await res.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Set up routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayouts />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/jobs/:id' element={<JobsPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='/edit-jobs/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;

};

export default App;


