import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <span className="font-extrabold text-2xl text-white tracking-wide">
            mTasks
          </span>
        </div>

        {/* Links */}
        <ul className="flex gap-8 text-white font-medium">
          <li className="cursor-pointer hover:text-yellow-300 transition-colors duration-200">
            Home
          </li>
          <li className="cursor-pointer hover:text-yellow-300 transition-colors duration-200">
            Your Tasks
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

