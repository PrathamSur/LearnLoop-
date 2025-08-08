import React from 'react'
import Classroom from './Classroom'

const Classrooms = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold text-center'>Classrooms</h1>
      <div className='border border-black p-5 h-full flex flex-col gap-7 justify-start  rounded-3xl md:flex-row md:flex-wrap md:justify-center'>
      
      <Classroom/>
      <Classroom/>
      <Classroom/>
      <Classroom/>
      <Classroom/>
      
    </div>
    </div>
    
  )
}

export default Classrooms