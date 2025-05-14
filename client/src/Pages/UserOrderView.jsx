import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeContext } from '../Context/themeContext';
import axios from 'axios'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const UserOrderView = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const {darkMode} = useThemeContext()
    const [singleOrder, setSingleOrder]  = useState([])
    const [orderCancal] = useState("Order Cancelled")
    useEffect(() => {
        const getSingleOrder = async () => {
            const res = await axios.get("/order/" + path)
            setSingleOrder(res.data)
        }
        getSingleOrder()
    }, [path])

    const handleCancel = async () => {
        try {
            const orderCancelation = {status: orderCancal}
            await axios.put(`/order/${singleOrder._id}/updateStatus`, orderCancelation)
            window.location.reload("")
        } catch (err) {
            alert(err);
        }
    }

  return (
    <>
    <Navbar/>
    <section className={darkMode ? 'relative lg:top-14 top-12 bg-neutral-900 text-white' : 'relative lg:top-14 top-12 bg-white text-black'}>
      <div className='min-h-screen py-8 px-4 h-full'>
        <a href="/orders" className='bg-green-500 text-white py-2.5 px-2 rounded-md' > <i className='fa-solid fa-arrow-left'/> Go Back </a>
        {/* order timeline */}
         <div class="max-w-fit w-fit grid grid-cols-9 py-4 px-2">
        {/* <!-- Stack 1 --> */}
        <div class="col-span-4 w-full my-9 h-fit ">
            <div class="w-full h-full bg-indigo-400 rounded-md p-2 md:px-4">
                <h1 class="text-white text-xl font-medium py-2">Ordered</h1>
                <p class="text-gray-100 sm:text-sm text-xs pb-2"> Orderd on {new Date(singleOrder.createdAt).toDateString()} </p>
            </div>
        </div>
        <div class="relative col-span-1 w-full h-full flex justify-center items-center">
            <div class="h-full w-1 bg-indigo-300"></div>
            <div class="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center"> <i className='fa-solid fa-check'/> </div>
        </div>
        <div class="col-span-4 w-full h-full"></div>
        {/* <!-- Stack 2 --> */}
        <div class="col-span-4 w-full my-9 h-fiy"></div>
        <div class="relative col-span-1 w-full h-full flex justify-center items-center">
            <div class="h-full w-1 bg-indigo-300"></div>
            <div class="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center"> <i className={singleOrder.status == "pending" ? "fa-solid fa-times" : "fa-solid fa-check"}/> </div>
        </div>
        <div class="col-span-4 w-full h-full ">
            <div class={singleOrder.status == "pending" ? "w-full h-full bg-indigo-200 rounded-md py-2 md:pl-4" : "w-full h-full bg-indigo-400 rounded-md py-2 md:pl-4"}>
                <h1 class="text-white text-xl font-medium pt-4">Out for delivery</h1>
                <p class="text-gray-100 sm:text-sm text-xs">  </p>
            </div>
        </div>
        {/* <!-- Stack 3 --> */}
        <div class="col-span-4 w-full my-9 h-fit ">
            <div class={singleOrder.status == "pending" ? "w-full h-full bg-indigo-200 rounded-md p-2 md:pl-4" : "w-full h-full bg-indigo-400 rounded-md p-2 md:pl-4"}>
                <h1 class="text-white text-xl font-medium py-2">Delivered</h1>
                {singleOrder.deliveredAt && <p class="text-gray-100 sm:text-sm pb-2 text-xs"> {new Date(singleOrder?.deliveredAt).toDateString()} </p>}
            </div>
        </div>
        <div class="relative col-span-1 w-full h-full flex justify-center items-center">
            <div class="h-full w-1 bg-indigo-300"></div>
            <div class="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center"> <i className={singleOrder.status == "pending" ? 'fa-solid fa-times': 'fa-solid fa-check' } /> </div>
        </div>
        <div class="col-span-4 w-full h-full"></div>
    </div>
    {/* timeline ends */}
        <div className='flex lg:flex-row mt-6 flex-col justify-between gap-x-5 items-start'>
          {/* info card */}
          <div className='lg:w-5/12 w-full' >
              <div className={darkMode ? "w-fit effect bg-gray-900 rounded-md border-2 border-white text-white px-3 py-5" : "w-fit bg-white effect text-black px-3 py-5 border-2 border-black rounded-md"}>
                  {singleOrder?.deliveredAt && 
                      <h1 className={darkMode ? "text-green-200 text-lg" : "text-green-700 text-lg"} > Delivered on  {new Date(singleOrder.deliveredAt).toDateString()} at  {new Date(singleOrder.deliveredAt).toLocaleTimeString()} </h1>
                  }
                  <h1 className='text-lg' >Shipping Address :-</h1>
                  <h1 className='text-base' > {singleOrder?.shippingAddress} </h1>
              </div>
              <div className={darkMode ? "bg-gray-900 effect rounded-md border-2 border-white lg:w-fit w-full my-6 text-white lg:px-5 px-3 py-5" : "bg-white effect border-2 border-black rounded-md lg:w-fit w-full my-6 text-black lg:px-5 px-3 py-5"} >
                  {/* Order Details -  */}
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Name </h1>
                      <h1> {singleOrder?.user} </h1>
                  </div>
                  <hr className={darkMode ? 'border-white effect my-2 w-full' : 'border-black effect my-2 w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Email Address </h1>
                      <h1> {singleOrder?.email} </h1>
                  </div>
                  <hr className={darkMode ? 'border-white my-2 effect w-full' : 'border-black effect my-2 w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Phone Number </h1>
                      <h1> {singleOrder?.phoneNumber} </h1>
                  </div>
                  <hr className={darkMode ? 'border-white my-2 effect w-full' : 'border-black my-2 effect w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Order Number </h1>
                      <h1> {singleOrder?._id} </h1>
                  </div>
                  <hr className={darkMode ? 'border-white my-2 effect w-full' : 'border-black my-2 effect w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Total Amount </h1>
                      <h1>Rs. {singleOrder?.totalAmount} /- </h1>
                  </div>
                  <hr className={darkMode ? 'border-white my-2 effect w-full' : 'border-black my-2 effect w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Quantity </h1>
                      <h1> {singleOrder?.totalQuantity} products </h1>
                  </div>
                  <hr className={darkMode ? 'border-white my-2 effect w-full' : 'border-black effect my-2 w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Payment Method </h1>
                      <h1> {singleOrder?.paymentMethod} </h1>
                  </div>
                  <hr className={darkMode ? 'border-white my-2 effect w-full' : 'border-black effect my-2 w-full'} />
                  <div className='flex items-start justify-between gap-12'>
                      <h1> Status </h1>
                      <h1 className={singleOrder?.status == "Order cancelled" && "text-red-500" } > {singleOrder?.status} </h1>
                  </div>
              </div>
      </div>
      <div className='w-full effect lg:w-7/12' >
      <div className={darkMode ? 'rounded-lg effect bg-gray-900 border-2 border-gray-100 text-white p-5' : 'effect rounded-lg bg-white border-2 border-black text-black  p-5'}>
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
                  <hr className={darkMode ? "border-white my-3 effect w-full" : "border-black my-3 effect w-full"}/>
              </>
          })}
          <div className='flex pl-4 pr-3 gap-10 justify-between items-center' > 
              <h1> Total Amount </h1>
              <h1> Rs. {singleOrder.totalAmount} /- </h1> 
          </div>
      </div>
      
      <div>
      {singleOrder.status == "pending" ?
      <button onClick={handleCancel} class="relative group overflow-hidden px-6 h-12 bg-red-500 text-white rounded-md my-5">
        <div aria-hidden="true" class="transition duration-300 group-hover:-translate-y-12">
            <div class="h-12 flex items-center justify-center">
                <span class="text-white"> <i className='fa-solid fa-times pr-2'/>  Cancel Order </span>
            </div>
            <div class="h-12 flex items-center justify-center">
                <span class="text-white">Cancel Order <i className='fa-solid fa-times pl-2'/></span>
            </div>
        </div>
    </button>
    :
      <button className="relative group overflow-hidden px-6 h-12 bg-blue-500 text-white rounded-md my-5">
        <div aria-hidden="true" class="transition duration-300 group-hover:-translate-y-12">
            <div class="h-12 flex items-center justify-center">
                <span class="text-white"> <i className='fa-solid fa-rotate-left pr-2'/>  Re-Order </span>
            </div>
            <div class="h-12 flex items-center justify-center">
                <span class="text-white">Re-Order <i className='fa-solid fa-rotate-right pl-2'/></span>
            </div>
        </div>
    </button>
    }
    </div>
    </div>
      </div>
      </div>
      <Footer/>
    </section>
    </>
  )
}

export default UserOrderView