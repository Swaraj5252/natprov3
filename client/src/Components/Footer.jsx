import React from 'react';
import { useThemeContext } from '../Context/themeContext';

const Footer = () => {

    const {darkMode} = useThemeContext()

  return <footer className={darkMode ? 'lg:px-2 px-1 py-4 bg-gray-900 h-full text-white': 'lg:px-2 px-1 py-4 bg-gray-200 h-full text-black'} >
      <div className='flex lg:flex-row items-center flex-col justify-evenly lg:gap-1 gap-3'>
          <div>
             <h1 className='text-lg' >
                © {new Date().getFullYear()} Natpro, Inc. All rights reserved
            </h1> 
          </div>
          <div className='flex flex-row items-center gap-5 lg:gap-10' >
            <ul className='flex flex-row text-lg flex-wrap text-center lg:gap-8 gap-3'>
                <li><a href='/'>Home</a></li>
                <li><a href='/products'>Products</a></li>
                <li><a href='/adminLogin'>Admin</a></li>
            </ul>
            <div className='text-xl'>|</div>
            <div className='flex gap-6 text-lg cursor-pointer'>
              <a href='https://www.facebook.com/swaraj.gadre.1'target="_blank" > 
                <i className="fab fa-facebook"></i>
              </a>
              <a href='https://www.instagram.com/_swaraj_2067/' target="_blank">
                <i className='fab fa-instagram'></i>
              </a>
              <a href='https://twitter.com/GadreSwaraj' target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
      </div>
  </footer>
};

export default Footer;
