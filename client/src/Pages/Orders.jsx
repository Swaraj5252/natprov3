import React ,{useState, useEffect} from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import {useThemeContext} from "../Context/themeContext"
import {useLoginContext} from "../Context/loginContext"
import axios from "axios"
import nothing from "../images/nothing.svg"
const Orders = () => {

  const {darkMode} = useThemeContext()
  const {user}  = useLoginContext()
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    const getOrders = async () => {
      const res =  await axios.get(`/order/${user._id}/orders`)
      setOrders(res.data)
    }
    getOrders()
  }, [user._id])
  return (
    <>
    <Navbar/>
    <section className={darkMode ? "effect bg-black text-white relative lg:top-14 top-12" : "bg-white effect text-black relative lg:top-14 top-12"}>
    <div className='min-h-screen h-full lg:px-6 py-5  px-4' >
      {orders.length === 0 ? <div className='h-full text-center'>
          <div className='relative top-16' >
          <h1> You have ordered nothing yet </h1>
          <img className='w-full my-10 h-60' src={nothing}/> 
          <a href='/products' className='bg-green-500 text-white px-3 py-2 rounded-md'>
              Fill It! <i className="fa-solid fa-fill pl-2"/>
          </a>
          </div>
      </div> : null }
      <div className='lg:w-9/12 w-full effect'>
          {orders.map((order, index) => (
            <div key={index} className={darkMode ? "w-full bg-stone-900 text-white rounded-md my-5 p-3" : "w-full bg-stone-100 text-black rounded-md my-5 p-3"} >
              <div className='flex flex-wrap justify-between item-start'>
                <div>
                  <h1> Order status - </h1>
                  <h1 className={darkMode ? 'text-lg text-green-200' : 'text-lg text-green-900'} > {order.status} {order?.deliveredAt && "on"} {order?.deliveredAt && new Date(order?.deliveredAt).toDateString()} {order?.deliveredAt && "at"} {order?.deliveredAt && new Date(order?.deliveredAt).toLocaleTimeString()} </h1>
                </div>
                <div className='flex lg:flex-col flex-row lg:items-end items-center gap-x-6' >
                  <h1> Order total ( {order.totalQuantity} items ) </h1>
                  <h1 className='text-right text-lg' > Total Rs. {order.totalAmount} /-</h1>
                </div>
              </div>
              <hr className={darkMode ? "border-white w-full mt-4" : "border-black w-full mt-4"}/>
              <div className='flex flex-row mx-auto flex-wrap lg:px-3 px-1 justify-between items-end'>
                <div className='w-9/12' >
                  {order.orderItems?.slice(0,2).map((o) => (
                    <>
                      <div className='flex flex-wrap mt-6 items-start gap-x-7'>
                        <div className='flex items-start gap-4' >
                          <img className='w-24 rounded-full h-24' src={o.image}/>
                          <div className='py-2' >
                          <h1> {o.name} </h1>
                          <h1> {o.price} </h1>
                          </div>
                        </div>
                        <h1 className='py-2' > {o.quantity } in quantity </h1>
                        <h1 className='py-2' > Total Rs. {o.price * o.quantity} /-</h1>
                      </div>
                    </>
                  ))}
                  <h1 className='text-sm mt-1 mb-3' > and more items  . . . . . . </h1>
                </div>
                <div className='lg:py-12 py-3' > 
                    <a className={darkMode ? 'border-2 border-cyan-400 hover:bg-cyan-800 hover:border-transparent transition-all delay-200 ease-linear px-1.5 py-1 text-lg rounded-md' : 'border-2  border-cyan-900 hover:bg-cyan-100 hover:border-transparent transition-all delay-200 ease-linear px-1.5 py-1 text-lg rounded-md'} href={`/orders/${order._id}`}>
                      View Details < i className='fa-solid fa-chevron-right text-sm'/> 
                    </a>
                </div>
              </div>
              {/* <h1> {order.shippingAddress} </h1> */}
            </div>
          ))}
      </div>
    </div>
    <Footer/>
    </section>
    </>
  )
}

export default Orders