import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
  return ( 
    <>
<nav className="bg-gray-500 fixed top-0 left-0 w-full z-50">
  <div className="flex justify-between items-center h-16 md:h-20 lg:h-24 px-5 sm:px-10 lg:px-20 text-white">
    {/* Logo */}
    <a href="#" className="text-2xl lg:text-3xl flex items-center gap-2 font-serif">
      <i className="fa-solid fa-shop text-green-700" />
      <span>LoGo</span>
    </a>
    {/* Navbar Links (Desktop) */}
    <ul className="hidden md:flex gap-8 text-lg">
      <li><Link to="/#" className="hover:underline">Home</Link></li>
      <li><Link to="/shop" className="hover:underline">Shop</Link></li>
      <li><Link to="/about" className="hover:underline">About</Link></li>
      <li><Link to="/contact" className="hover:underline">Contact</Link></li>
    </ul>
    {/* Actions */}
    <div className="flex items-center gap-5">
      {/* User Icon */}
      <i className="fa-solid fa-circle-user text-2xl lg:text-3xl hover:cursor-pointer" />
  
    <Button content="i am props"/>
    </div>
  </div>
  {/* Mobile Dropdown Menu */}
  <div id="mobileMenu" className="md:hidden bg-gray-800 text-white p-5 space-y-3">
    <Link to="/" className="block hover:bg-gray-700 py-2 px-4 rounded">Home</Link>
    <Link to="/shop" className="block hover:bg-gray-700 py-2 px-4 rounded">Shop</Link>
    <Link to="/about" className="block hover:bg-gray-700 py-2 px-4 rounded">About</Link>
    <Link to="/contact" className="block hover:bg-gray-700 py-2 px-4 rounded">Contact</Link>
  </div>
</nav>

</>

  )
}

export default Navbar