import React, { useRef, useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import {useThemeContext} from "../Context/themeContext"
import { useLoginContext } from '../Context/loginContext'
import axios from 'axios'
import { USER_START, USER_FAILIURE, USER_SUCCESS, USER_LOGOUT } from "../action"


const Login = () => {

    const userRef = useRef()
    const passwordRef = useRef()
    const {darkMode} = useThemeContext()
    const {dispatch, user, userError, userFetching} = useLoginContext()
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        dispatch({type: USER_START})
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({type: USER_SUCCESS, payload: res.data})
            console.log(user);
            window.location.replace("/")
        } catch (err) {
            dispatch({type: USER_FAILIURE})
            setError(true)
        }

    }

    return (
      <>
        <Navbar/>
        <section className={darkMode ? "h-screen bg-gray-900 text-white w-full" : "h-full w-full bg-white text-black"}>
            <div className='relative m-auto flex sm:flex-row flex-col lg:w-9/12 lg:top-20 top-24'>
                {/* form */}
                <div className={darkMode ? "lg:px-10 px-4 lg:py-20 py-28 lg:w-9/12 w-11/12 mx-auto bg-sky-900 text-white" : "lg:px-10 px-4 lg:w-9/12 lg:py-20 py-28 w-11/12 mx-auto bg-sky-50 text-black"}>
                    <form onSubmit={handleSubmit} >
                        <h1 className='text-3xl mb-3 text-center'> Login </h1>
                        <div className='mb-5' >
                            <label>Username *</label>
                            <input type="text" ref={userRef} className='w-full rounded-md px-2 text-black py-1 text-xl'/>
                        </div>
                        <div>
                            <label>Password *</label>
                            <input type="password" ref={passwordRef} className='w-full text-black rounded-md px-2 py-1 text-xl'/>
                        </div>
                        <button type='submit' className='btn btn-purple mt-6'>Login</button>
                        {error && <p className='text-red-600 mt-4' > Something went wrong </p>}
                        <p className='mt-4' > New here? <a href='/register' className='text-blue-600' > Register </a> </p>
                    </form>
                </div>
                <div className='ss lg:block md:block hidden py-32 px-32 lg:w-5/12'>
            </div>
            </div>
        </section>
      </>
    )
}

export default Login
