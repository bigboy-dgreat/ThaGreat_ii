  import React from 'react'
import Hero from '../Component/Hero'
import HomeCards from '../Component/HomeCards'
import JobListing from '../Component/JobListing'
import ViewAllJobs from '../Component/ViewAllJobs'

const HomePage = () =>{
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListing isHome={true}/>
      <ViewAllJobs />

    </>
  )
}

export default HomePage

