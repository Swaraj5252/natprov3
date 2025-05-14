import React,{useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useThemeContext} from "../Context/themeContext"
import { useLoginContext } from '../Context/loginContext'
import { USER_LOGOUT } from '../action'
import axios from "axios"


const Navbar = () => {
    const {user,dispatch} = useLoginContext()
    const {darkMode, LightMode, DarkMode, sideBar, openSidebar, closeSidebar} = useThemeContext()
    const [drop, setDrop] = useState(false)
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [confirmBar, setConfirmBar] = useState(false)

    const handleLogout = async () => {
        dispatch({type: USER_LOGOUT}) 
        setDrop(false)
        setConfirmBar(false) &&
        window.location.replace("/")
    }

    useEffect( () => {
        try {
            const getUsers = async () => {
                const res = axios.get(`/user/${user._id}`)
                setCart(res.data)
            }
            const getOrders = async () => {
                const res = await axios.get(`/order/${user._id}/orders`)
                setOrders(res.data)
            }
            getUsers()
            getOrders()
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
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
        <nav className={darkMode ? "top-0 effect fixed max-w-full left-0 shadow-gray-500 shadow-sm bg-gray-900 z-[100] right-0 flex items-center py-3 lg:px-10 px-4 text-white": "fixed effect top-0 max-w-full left-0 bg-white drop-shadow-md shadow-black text-black z-[100] right-0 flex items-center py-3 lg:px-10 px-4 "} >
            <h1 data-aos='fade-right' data-aos-delay='100' className='lg:text-3xl text-xl font-normal text-green-500' > NatPro </h1>
            {/* menu for small screen */}
                <ul className={sideBar ? "flex flex-1 gap-8 transition-all delay-300 flex-col z-10 pt-7 lg:hidden items-left text-left  md:hidden fixed w-full text-2xl max-h-screen bg-gray-500 text-white left-0 top-12" : "transition-all h-0 hidden delay-300"} >
                    <li className='px-5' > <a href='/'>Home</a> </li>
                    <li className='px-5' > <a href='/products'>Products</a> </li>
                    {user ? <li> <a className='px-5' href='/cart'>Cart</a> </li> : null }
                    {user ? <li> <a className='px-5' href='/orders'>Orders</a> </li> : null }
                    <hr className='bg-gray-100 px-4'/>
                    <div className='flex item-center justify-between pb-6 px-2 relative bottom-1' >
                    {user ? <a href='/account' > {user.username} </a> : <a href='/login' className="text-xl w-fit bg-gray-700 text-white py-1 px-2 rounded-md">Login <i className='fas fa-arrow-right text-sm'/> </a>}
                    <li className={darkMode ? "text-white": "text-black"}> <i onClick={darkMode === true ? LightMode : DarkMode} className={!darkMode ? "cursor-pointer fas fa-moon": "cursor-pointer fas fa-sun"}/> </li>
                    </div>
                </ul>
                {/* menu for large screen */}
                <ul className={darkMode ? "hidden effect sm:flex flex-1 sm:gap-8 justify-end items-center lg:gap-10 text-white text-xl": "hidden effect sm:flex flex-1 sm:gap-8 justify-end items-center lg:gap-10 text-black  text-xl"} >
                    <li  data-aos='fade-down' data-aos-delay='100' > <a href='/'>Home</a> </li>
                    <li  data-aos='fade-down' data-aos-delay='200' > <a href='/products'>Products</a> </li>
                    {user ? <li  data-aos='fade-down' data-aos-delay='300' > <a href='/cart'>Cart</a> </li> : null }
                      
                    {user ? <h1 data-aos='fade-left' data-aos-delay='400' className='text-xl cursor-pointer' onClick={() => drop === false ? setDrop(true) : setDrop(false) } > <i className="fas fa-user"></i> {user.username} </h1> : <Link data-aos='fade-left' data-aos-delay='400' to="/login"> <button className={darkMode ? "text-black bg-green-300 py-1.5 px-2.5 rounded-md": "text-black bg-green-500 text-xl py-1.5 px-2.5 rounded-md"}>Login <i className='fas fa-arrow-right text-sm'/> </button> </Link> }                
                    <div data-aos='fade-left' data-aos-delay='500'  >
                        <li className={darkMode ? "text-white effect": "text-black effect"}> <i onClick={darkMode === true ? LightMode : DarkMode} className={!darkMode ? "cursor-pointer fas fa-moon": "cursor-pointer fas fa-sun"}/> </li>
                    </div>

                </ul>
                <div data-aos='fade-left' className='flex flex-1 justify-end sm:hidden'>
                    <i onClick={sideBar === false ? openSidebar : closeSidebar} className={sideBar ? "fas fa-times cursor-pointer" : "cursor-pointer fas fa-bars"}/>
                </div>
                <div className={drop ? "lg:block md:block hidden origin-top-right absolute right-10 mt-16 top-0 w-56 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                        <div className={darkMode ? "bg-gray-900 effect text-white py-1" : "py-1 effect bg-gray-100 text-black"} role="none">
                        <a href="/account" className=" block px-4 py-2 text-sm" role="menuitem" id="menu-item-0"> <i className='fas fa-user-circle mr-2'/> Account settings</a>
                        <a href="/orders" className=" block px-4 py-2 text-sm" role="menuitem" id="menu-item-0"> <i className='fas fa-cube mr-2'/> Orders ({orders?.length})  </a>
                        <a href="/cart" className=" block px-4 py-2 text-sm" role="menuitem" id="menu-item-2"><i className='mr-2 fas fa-shopping-cart'/>Cart ({cart?.cart?.length}) </a>
                        <button type="submit" onClick={() => setConfirmBar(true)} className="block w-full text-left px-4 py-2 text-sm" id="menu-item-3">
                        <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                        </button>
                    </div>
                </div>
        </nav>
        </>
    )
}

export default Navbar
