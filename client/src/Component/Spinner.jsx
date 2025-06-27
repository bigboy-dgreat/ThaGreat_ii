import React from 'react'
import { ClipLoader } from "react-spinners";



const override = {
  display: "block",
  margin: "100px auto"
}

const color = {
  color: '#5a5a5a'
}

const Spinner = ({ loading }) => {
  return (
    
        <ClipLoader
        color= {color}
        loading={loading}
        cssOverride={override}
        size={150}
      /> 
    
  )
}

export default Spinner
