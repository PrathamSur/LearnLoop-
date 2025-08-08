import React from 'react'
import Navbar from '../Components/Navbar'
import Content from '../Components/Content'

const Class = () => {
  return (
    <div className="bg-[#023047] h-screen flex flex-col md:flex-row md:h-screen ">
      <Navbar />
      <Content />
    </div>
  )
}

export default Class