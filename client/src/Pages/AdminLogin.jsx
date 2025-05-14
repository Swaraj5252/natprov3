import React, {useRef, useState, useContext} from 'react';
import Navbar from '../Components/Navbar';
import {useThemeContext} from "../Context/themeContext"
import { useLoginContext } from '../Context/loginContext';
import {ADMIN_FAILURE, ADMIN_START, ADMIN_SUCCESS, ADMIN_LOGOUT, PRODUCTS_BEGIN} from "../action"
import axios from 'axios';

const AdminLogin = () => {

  const {darkMode} = useThemeContext()
  const nameRef = useRef()
  const adminPasswordRef = useRef()
  const [error, setError] = useState(false)
  const {dispatch, admin} = useLoginContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    dispatch({type: ADMIN_START})
    try {
      const res = await axios.post("auth/adminLogin", {
        name: nameRef.current.value,
        adminPassword: adminPasswordRef.current.value
      })
      dispatch({type: ADMIN_SUCCESS, payload: res.data})
      console.log(admin);
      window.location.replace("/")
    } catch (err) {
      dispatch({type: ADMIN_FAILURE})
      setError(true)
      console.log(err);
    }
  }

  return (
    <>
    <Navbar/>
    <section className={darkMode ? "relative lg:top-16 top-12 lg:h-screen  overflow-hidden bg-black text-white" : "relative lg:top-16 top-12 h-screen bg-white text-black"} >
      <div className='relative m-auto flex sm:flex-row flex-col lg:w-9/12 lg:top-16 overflow-y-hidden top-24'>
            {/* form */}
            <div className={darkMode ? "lg:px-10 px-4 lg:py-20 py-28 lg:w-9/12 w-11/12 mx-auto bg-sky-900 text-white" : "lg:px-10 px-4 lg:w-9/12 lg:py-20 py-28 w-11/12 mx-auto bg-sky-50 text-black"}>
                <form onSubmit={handleSubmit} >
                    <h1 className='text-3xl mb-3 text-center'> Admin Login </h1>
                    <div className='mb-5' >
                        <label>Username *</label>
                        <input type="text" ref={nameRef} className='w-full text-black rounded-md px-2 py-1 text-xl'/>
                    </div>
                    <div>
                        <label>Password *</label>
                        <input type="password" ref={adminPasswordRef} className='w-full text-black rounded-md px-2 py-1 text-xl'/>
                    </div>
                    <button type='submit' className='btn btn-purple mt-6'>Login</button>
                    {error && <p className='text-red-600 mt-4' > Something went wrong </p>}
                </form>
                </div>
                <div className='ass lg:block md:block hidden py-32 px-32 lg:w-5/12'>
            </div>
      </div>
    </section>
    </>
  )
};

export default AdminLogin;
