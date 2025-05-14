import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useThemeContext } from '../Context/themeContext'
import { useLoginContext } from "../Context/loginContext"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { USER_LOGOUT } from '../action';
import "../index.css"

const AccountSettings = () => {

    const { user, dispatch } = useLoginContext()
    const { darkMode } = useThemeContext()
    const [confirmBar, setConfirmBar] = useState(false)
    const [orders, setOrders] = useState([])
    const handleLogout = async () => {
        dispatch({ type: USER_LOGOUT })
        window.location.replace("/")
    }
    const handleDelete = async () => {
        await axios.delete("/user/" + user._id) && dispatch({ type: USER_LOGOUT })
        window.location.replace("/")
    }

    console.log(orders)
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`/order/${user._id}/orders`)
                console.log(res.data)
                setOrders(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getOrders()
    }, [])


    return (
        <>
            <div className={confirmBar === true ? 'effect block' : 'effect hidden'} >
                <div className={darkMode ? "fixed effect h-screen z-[100] top-14 w-full bg-transparent backdrop-blur-sm text-white " : "fixed effect h-screen z-[100] top-14 w-full bg-transparent backdrop-blur-sm text-black "}>
                    <div className={darkMode ? 'relative effect lg:top-40 top-52  px-3 py-3.5 bg-black shadow-md rounded-md lg:w-1/3 w-11/12 mx-auto' : 'relative effect lg:top-40 top-52  px-3 py-3.5 bg-gray-100 shadow-md rounded-md lg:w-1/3 w-11/12 mx-auto'}>
                        <h1 className='text-xl mb-10'> Are you sure you want to do this ? </h1>
                        <div className='relative flex gap-5 justify-end px-2 pb-3.5 items-center right-0'>
                            <button className='cursor-pointer bg-red-500 text-white px-2.5 py-1 rounded-md'> <i className='fa-solid fa-check' /> Yes </button>
                            <button onClick={() => setConfirmBar(false)} className='cursor-pointer bg-green-500 text-white px-3 py-1 rounded-md' > <i className='fa-solid fa-xmark' /> No </button>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
            <section className={darkMode ? 'relative lg:top-14 top-12 bg-stone-900 min-h-screen h-full text-white' : 'relative h-full min-h-screen top-14 bg-white text-black'} >
                <div className='flex flex-wrap lg:gap-0 gap-2  py-4 px-3 items-center justify-between' >
                    <h1 className='text-xl' > Welcome {user.username} </h1>
                    <div className='flex gap-3 items-center'>
                        <button onClick={() => setConfirmBar(true)} className='bg-red-600 text-white px-3 py-1.5 rounded-md shadow-md'> <i className="fa-solid fa-right-from-bracket"></i> Logout </button>
                        <button onClick={() => setConfirmBar(true)} className='bg-red-600 text-white px-3 py-1.5 rounded-md shadow-md'> <i className='fas fa-trash-alt pr-1' /> Delete Account </button>
                    </div>
                </div>
                <hr className={darkMode ? "w-full border-white" : "w-full border-black"} />
                <h1 className='px-4 py-4 mt-3 text-xl w-full bg-blue-700 text-white' > Manage your account </h1>
                <div className='px-3 my-3' >
                    <form className='flex flex-col gap-2' >
                        <div className='flex flex-col' >
                            <label className='py-1' > Username </label>
                            <input type="text" className='bg-gray-300 px-2 text-black rounded-sm py-1.5 lg:w-2/4 w-full' value={user.username} readOnly />
                        </div>
                        <div className='flex flex-col' >
                            <label className='py-1' >Email ID</label>
                            <input type="text" className='bg-gray-300 text-black px-2 py-1.5 lg:w-2/4 w-full rounded-sm' value={user.email} readOnly />
                        </div>
                        <button className='bg-green-500 text-white px-3 py-1.5 rounded-md w-fit shadow-md'> <i className="fas fa-user-pen"></i> Update</button>
                    </form>
                    <p className='text-lg py-3' > You joined on <i className="fas fa-calendar" /> {new Date(user.createdAt).toDateString()} and you last updated on <i className="fas fa-calendar" />  {new Date(user.updatedAt).toDateString()} </p>
                </div>
                <hr className={darkMode ? "w-full border-white" : "w-full border-black"} />
                <h1 className='px-4 py-4 mt-3 text-xl w-full bg-blue-700 text-white' > Terms & Policies </h1>
                <div className='pr-8 pl-4 text-lg my-2'>
                    <li className='mb-1' > The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li className='mb-1' > There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  </li>
                    <li className='mb-1' > If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click here to donate using PayPal. Thank you for your support. </li>
                    <li className='mb-1' > But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.  There is no minimum donation, any sum is appreciated - click here to donate using PayPal.</li>
                    <li className='mb-1' > If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click here to donate using PayPal. Thank you for your support. </li>
                    <li className='mb-1' > But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.  There is no minimum donation, any sum is appreciated - click here to donate using PayPal.</li>
                    <li className='mb-1' > If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click here to donate using PayPal. Thank you for your support. </li>
                    <li className='mb-1' > The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li className='mb-1'> The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains and also On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire </li>
                </div>
            <Footer />
            </section>
        </>
    )
}

export default AccountSettings