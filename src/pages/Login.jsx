import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col h-screen w-full bg-[#f1f3f3] p-4 justify-center items-center'>
      <form action="" className='border border-m-black flex flex-col items-center justify-center p-4 bg-[#ffffff] w-[70%] rounded-3xl shadow-lg h-[35%] md:w-[50%] lg:w-[20%]'>
        <h1 className='text-3xl text-black font-bold mb-4'>Login</h1>
        <input type="email" placeholder='Email' className='w-full p-2
          mb-4 rounded-lg border border-m-black focus:outline-none focus:ring-2 focus:ring-blue-500' />
        
        <input type="password" placeholder='Password' className='w-full p-2 mb-4 rounded-lg focus:outline-none border border-m-black focus:ring-2 focus:ring-blue-500' />
        
        <button type="submit" className='w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors'>Login</button>
        <p className='text-black mt-4'>Don't have an account? <a href="/register" className='text-blue-900 hover:underline'>Sign Up</a></p>

      </form>
    </div>
  )
}

export default Login