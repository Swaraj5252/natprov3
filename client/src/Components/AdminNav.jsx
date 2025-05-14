import React, {useState} from 'react';
import {useThemeContext} from "../Context/themeContext"
import {useLoginContext} from "../Context/loginContext"
import { ADMIN_LOGOUT } from '../action';
const AdminNav = () => {

  const {darkMode, adminSideBar, openAdminSidebar, closeAdminSidebar, LightMode, DarkMode} = useThemeContext()
  const {admin, dispatch} = useLoginContext()
  const [confirmBar, setConfirmBar] = useState(false)

  const handleLogout = () => {
    dispatch({type: ADMIN_LOGOUT})
    setConfirmBar(false) && window.location.replace("/")
  }
  return( 
    <>
    <div className={confirmBar === true ? 'effect block' : 'effect hidden'} >
        <div className={darkMode ? "fixed effect h-screen z-[100] top-14 w-full bg-transparent backdrop-blur-sm text-white " : "fixed effect h-screen z-[100] top-14 w-full bg-transparent backdrop-blur-sm text-black "}>
            <div className={darkMode ? 'relative effect top-40  px-3 py-3.5 bg-black shadow-md rounded-md w-1/3 mx-auto' : 'relative effect top-40  px-3 py-3.5 bg-gray-100 shadow-md rounded-md w-1/3 mx-auto'}> 
            <h1 className='text-xl mb-10'> Are you sure you want to do this ? </h1>
            <div className='relative flex gap-5 justify-end px-2 pb-3.5 items-center right-0'>
                <button onClick={handleLogout} className='cursor-pointer bg-red-500 text-white px-2.5 py-1 rounded-md'> <i className='fa-solid fa-check'/> Yes </button>
                <button onClick={() => setConfirmBar(false)} className='cursor-pointer bg-green-500 text-white px-3 py-1 rounded-md' > <i className='fa-solid fa-xmark'/> No </button>
            </div>
            </div>
        </div>
    </div>
    <nav className={darkMode ? "effect fixed  bg-black text-white top-0 left-0 z-10 w-full flex justify-between items-center px-7 py-3 flex-row" : "z-10 effect fixed bg-gray-200 text-black top-0 left-0 w-full flex justify-between items-center px-7 py-3 flex-row" } >
      <h1 className={darkMode ? "effect text-2xl text-green-500" : "effect text-2xl text-green-800"} > NatPro-Admin </h1>
      <div className='flex flex-row gap-10 items-center'>
        <h1 className='text-xl md:block hidden' > <i className="fas fa-user-cog"/> {admin.name} </h1>
        <button className='text-xl md:block hidden' onClick={()  => setConfirmBar(true)} >Logout</button>
        <i onClick={darkMode === true ? LightMode : DarkMode} className={!darkMode ? "cursor-pointer effect fas fa-moon": "cursor-pointer effect fas fa-sun"}/>
        <i onClick={adminSideBar === true ? closeAdminSidebar : openAdminSidebar} className={adminSideBar === true ? 'fas fa-times cursor-pointer effect ' : 'fas fa-bars cursor-pointer'}/>
      </div>
    </nav>      
    </>
  )};

export default AdminNav;
