import React from 'react'

const Footer = ():React.JSX.Element => {
  return (
    <footer className="mt-24 mb-0 pb-0 flex items-center justify-center h-20 w-screen bg-gray-800 cursor-default">
      <p className='text-white text-xl font-thin'>&copy; {new Date().getFullYear()} All Right Reserved.</p>
    </footer>
  )
}

export default Footer;