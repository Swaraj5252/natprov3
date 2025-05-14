import React from 'react';
import { useThemeContext } from '../Context/themeContext';
import { useLoginContext } from '../Context/loginContext';
import { ADMIN_LOGOUT } from '../action';

const AdminSideBar = () => {

  const {darkMode, adminSideBar, openAdminSidebar, closeAdminSidebar} = useThemeContext()
  const {admin, dispatch} = useLoginContext()
   const handleLogout = () => {
    dispatch({type: ADMIN_LOGOUT}) && window.location.replace("/")
  }

  return <nav className={adminSideBar === true ? 'lg:w-2/12 md:4/12 w-full transition-all delay-200 fixed lg:h-full h-fit right-0' : 'transition-all delay-300 w-0 fixed h-screen right-0'} >
    <div className={darkMode ? "bg-stone-800 text-white h-screen" : "bg-gray-300 text-black h-screen"} >
      <ul className='flex flex-col cursor-pointer py-8 lg:text-xl text-2xl lg:text-left text-center px-0 lg:gap-8 gap-14' >
        <li className='px-6 hover:bg-green-500 hover:text-white hover:px-6 hover:py-2 transition-all ease-in-out delay-100' > <a href='/'> Dashboard </a> </li>
        <li className='px-6 hover:bg-green-500 hover:text-white hover:px-6 hover:py-2 transition-all ease-in-out delay-100'> <a href='/products' > All Products </a> </li>
        <li className='px-6 hover:bg-green-500 hover:text-white hover:px-6 hover:py-2 transition-all ease-in-out delay-100'> <a href='/allUsers' > All Users </a> </li>
        <li className='px-6 hover:bg-green-500 hover:text-white hover:px-6 hover:py-2 transition-all ease-in-out delay-100'> <a href='/newProduct' > New Product </a> </li>
        <li className='px-6 hover:bg-green-500 hover:text-white hover:px-6 hover:py-2 transition-all ease-in-out delay-100'> <a href='/orders' > Orders </a> </li>
      </ul>
      <hr className='py-3 lg:hidden block' />
      <div className='lg:hidden flex flex-row justify-between pb-5 my-4 px-5 text-2xl'>
        <h1> <i className="fas fa-user-cog"/> {admin.name} </h1>
        <button onClick={handleLogout} > <i className="fas fa-sign-out-alt"></i> Logout </button>
      </div>
    </div>  
  </nav>
};

export default AdminSideBar;
