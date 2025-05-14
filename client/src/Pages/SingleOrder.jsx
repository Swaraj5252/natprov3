import { async } from '@firebase/util';
import React, {useState, useEffect} from 'react'
import {useLocation } from 'react-router-dom';
import { useThemeContext } from '../Context/themeContext';
import axios from 'axios';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import Footer from '../Components/Footer';

const SingleOrder = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const {darkMode, adminSideBar} = useThemeContext()
    const [singleOrder, setSingleOrder]  = useState()
    const [updateMode, setUpdateMode] = useState(false)
    const [status, setStatus] = useState("")
    const currentDate = new Date()
    useEffect(() => {
        const getSingleOrder = async () => {
            const res = await axios.get("/order/" + path)
            setSingleOrder(res.data)
        }
        getSingleOrder()
    }, [path])
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        const order = { status: status, deliveredAt: currentDate }
        try {
            await axios.put(`/order/${singleOrder._id}/updateStatus`, order)
            window.location.reload("")
        } catch (err) {
            console.log(err);
        }
    }
    // for frontend refer jio mart website
  return (
    <>
    <AdminNav/>
    <section className={darkMode ? "relative effect top-14 bg-gray-800 text-white" : "relative top-14 bg-green-50 text-black"} >
    <div className='flex min-h-screen h-full sm:flex-col flex-row w-full' >
        <AdminSideBar/>
        <div className={adminSideBar === true ? "lg:w-10/12 w-full min-h-screen h-full transition-all delay-200": "w-full transition-all delay-200"}>
            <div className='lg:px-5 lg:py-5 p-2'>
            <a href='/orders' className={darkMode ? 'px-2 py-2 my-3 bg-transparent border-2 rounded-lg text-white' : 'px-2 py-2 my-3 bg-transparent border-2 border-gray-500 rounded-lg text-black'}><i className='fa-solid fa-arrow-left pr-2'/> Go Back </a>
                <div className='flex lg:flex-row flex-col justify-between mt-5 gap-x-5 items-start'>
                    {/* info card */}
                    <div className='lg:w-5/12 w-full' >
                        <div className={darkMode ? "w-fit bg-stone-900 text-white px-3 py-5 rounded-sm" : "w-fit bg-white text-black px-3 py-5 rounded-sm"}>
                            {singleOrder?.deliveredAt && 
                                <h1 className={darkMode ? "text-green-200 text-lg" : "text-green-700 text-lg"} > Delivered on  {new Date(singleOrder?.deliveredAt).toDateString()} at  {new Date(singleOrder?.deliveredAt).toLocaleTimeString()} </h1>
                            }
                            <h1 className='text-lg' >Shipping Address :-</h1>
                            <h1 className='text-base' > {singleOrder?.shippingAddress} </h1>
                        </div>
                        <div className={darkMode ? "bg-stone-900 lg:w-fit w-full my-4 text-white lg:px-5 px-3 py-5 rounded-sm" : "bg-white lg:w-fit w-full my-4 text-black lg:px-5 px-3 py-5 rounded-sm"} >
                            {/* Order Details -  */}
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Name </h1>
                                <h1> {singleOrder?.user} </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Email Address </h1>
                                <h1> {singleOrder?.email} </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Phone Number </h1>
                                <h1> {singleOrder?.phoneNumber} </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Order Number </h1>
                                <h1> {singleOrder?._id} </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Total Amount </h1>
                                <h1>Rs. {singleOrder?.totalAmount} /- </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Quantity </h1>
                                <h1> {singleOrder?.totalQuantity} products </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Payment Method </h1>
                                <h1> {singleOrder?.paymentMethod} </h1>
                            </div>
                            <hr className={darkMode ? 'border-white my-2 w-full' : 'border-black my-2 w-full'} />
                            <div className='flex items-start justify-between gap-12'>
                                <h1> Status </h1>
                                {console.log(singleOrder?.status)}
                                {!updateMode ?  <h1> {singleOrder?.status} </h1> :  
                                <select onChange={(e) => setStatus(e.target.value)} className={darkMode ? 'bg-sky-900 py-0.5 px-2 rounded-xl text-white' : 'bg-sky-100 py-0.5 px-2 rounded-xl text-black'} > 
                                    <option value="Pending" >Pending</option>
                                    <option value="Delivered" >Delivered</option>
                                </select>
                                }
                            </div>
                            {singleOrder?.status !== "Pending" ? 
                            <button onClick={() => updateMode == true ? setUpdateMode(false) : setUpdateMode(true)} className={!updateMode ? "absolute my-1.5 block left-8 right-0 w-fit px-3 py-2 rounded-full bg-green-500 text-white" : "absolute my-1.5 block left-8 right-0 w-fit px-3 py-2 rounded-full bg-red-500 text-white"}> <i className={updateMode ? 'fa-solid  fa-times effect p-1 text-md' : 'fa-solid fa-pen effect'}/> </button>
                            : null }
                            {singleOrder?.status === 'Delivered' ? 
                            <button className="absolute my-1.5 block left-8 right-0 w-fit px-3 py-2 rounded-full bg-red-500 text-white"> <i className="fa-solid fa-trash"/> </button>
                            : null }
                        </div>
                        {
                        updateMode &&
                        <button onClick={handleUpdate} className={!updateMode ? 'btn-purple p-2 rounded-md text-lg' : 'btn-purple p-2 my-6 rounded-md text-lg'}> <i className='fa-solid fa-pen text-base'/> Update Order </button>
                        }
                </div>
                <div className={darkMode ? 'w-full rounded-lg lg:w-7/12 bg-stone-900 text-white p-5' : 'w-full rounded-lg lg:w-7/12 bg-white text-black  p-5'}>
                    {singleOrder?.orderItems?.map((o) => {
                        return <>
                            <div className='flex justify-between  flex-wrap lg:gap-10 gap-5 gap-x-8 items-start mb-5'>
                                <div className='flex gap-4 items-start'>
                                <img src={o?.image} className="w-24 h-24 rounded-md"/>
                                <div className='py-2'>
                                    <h1 className='text-lg'> {o?.name} </h1>
                                    <h1 className='text-lg'> Rs. {o?.price} /- </h1>
                                </div>
                                </div>
                                <h1 className='lg:pt-2.5 pt-1.5 text-lg' > {o?.quantity} in Quantity </h1>
                                <h1 className='lg:pt-2.5 pt-1.5 text-lg' > Rs. {o?.price * o?.quantity} /- </h1>
                            </div>
                            <hr className={darkMode ? "border-white my-3  w-full" : "border-black my-3  w-full"}/>
                        </>
                    })}
                    <div className='flex pl-4 pr-3 gap-10 justify-between items-center' > 
                        <h1> Total Amount </h1>
                        <h1> Rs. {singleOrder?.totalAmount} /- </h1> 
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    <Footer/> 
    </section>
    </>
  )
}

export default SingleOrder