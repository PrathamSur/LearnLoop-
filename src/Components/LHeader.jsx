import React from 'react'
import LDropdown from './LDropdown' 

const LHeader = () => {
  return (
    <div className='bg-[#F2F4F5] h-full flex justify-center items-center md:h-[18%] lg:h-[25%] p-4 lg:p-6'>
        <div className='bg-white h-full w-[90%] p-2 rounded-3xl flex  justify-between items-center border border-[#aec9d1d5] shadow-lg'>
            <h1 className='pl-4 text-xl font-bold lg:text-5xl md:text-3xl md:pl-10 lg:pl-20'>LearnLoop</h1>
            <div className=' hidden lg:flex lg:gap-4 lg:text-lg lg:font-semibold'>
                <a href="/login" className='text-black hover:text-white hover:bg-black border border-black p-2 rounded-3xl'>Login</a>
                <a href="/register" className='text-black hover:text-white   hover:bg-black border border-black p-2 rounded-3xl'>Sign Up</a>
                <a href="/register" className='text-black hover:text-white   hover:bg-black border border-black p-2 rounded-3xl'>Profile</a>
                <a href="/register" className='text-white bg-red-500 hover:bg-red-700 border-black p-2 rounded-3xl'>Log out</a>
                

            </div>
            
            <LDropdown />
      
        </div>


    </div>
  )
}

export default LHeader