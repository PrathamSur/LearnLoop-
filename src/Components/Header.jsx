import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#48CAE4] justify-center items-center text-center p-5 rounded-3xl flex flex-col lg:flex-row md:justify-between md:items-center md:p-8 '>
        <div>
          <h2 className='justify-center text-xl'>Welcome to</h2>
          <h1 className='text-6xl font-bold'>LearnLoop</h1>
          <p className='text-lg'>Your one-stop solution for learning</p>
        </div>
        <div>
          <input type="text" placeholder='Search...' className='mt-4 p-2 rounded-lg w-full md:w-full md:pl-2 border border-[#023047]' />
          <button className='mt-4 bg-[#fccc42] text-black p-2 m-2 rounded-3xl hover:bg-[#daa32d]'>Search</button>
        </div>
        
        
    </div>
  )
}

export default Header