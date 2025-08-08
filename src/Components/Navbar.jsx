import React from 'react'
import NavContent from './NavContent'

const Navbar = () => {
  return (
    <nav className="bg-[#023047] p-7 flex flex-row justify-between items-center md:flex-col md:justify-start md:p-7 md:gap-10 md:h-full">
      <NavContent />
      <NavContent />
      <NavContent />
      <NavContent />
      <NavContent />
    </nav>       
  )
}

export default Navbar