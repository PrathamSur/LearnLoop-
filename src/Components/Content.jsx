import React from 'react'
import Header from './Header'
import Classrooms from './Classrooms'

const Content = () => {
  return (
    <div className="flex-1 bg-white rounded-t-3xl p-4 md:p-10">
        <Header />
        <Classrooms/>
    </div>
  )
}

export default Content