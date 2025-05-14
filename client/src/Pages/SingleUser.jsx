import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeContext } from '../Context/themeContext'
import AdminNav from '../Components/AdminNav'
import AdminSideBar from '../Components/AdminSideBar'
import axios from 'axios'
import nothing from "../images/nothing.svg"

const SingleUser = () => {

  const location = useLocation()
  const path = location.pathname.split("/")[2]
  const {darkMode, adminSideBar} = useThemeContext()
  const [user, setUser] = useState({})
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/user/" + path)
      setUser(res.data)
    }
    getUser()
    // getOrders()
  }, [path])

  useEffect(() => {
    const getOrders = async () => {
    const res = await axios.get(`/order/6262c1fb7b8ff146595f7dfb/orders`)
      setOrders(res.data)
    }
    getOrders()
  }, [])
  // console.log(user?._id)
  return (
    <>
    <AdminNav/>
    <section className={darkMode ? "relative effect top-14 bg-gray-900 text-white min-h-screen h-full": "relative effect top-14 h-full bg-white text-black"} >
      <div className='flex sm:flex-col flex-row w-full' >
        <div className={adminSideBar === true ? "transition-all delay-200 w-10/12 px-1 py-1": "transition-all delay-200 w-full px-1 py-1"} >
          <div className='lg:px-4 lg:py-3 px-3 py-1.5'>
          <a href='/allUsers' className='bg-green-500 text-white px-2 py-1.5 rounded-md text-lg'> <i className='fa-solid fa-arrow-left'/> Go Back </a>
          <h1 className='text-2xl mt-3'>User Details :-</h1>
          {/* <hr className={darkMode ? 'mb-4 mt-2 w-full border-white' : 'mb-4 mt-2 w-full border-black'} /> */}
          <div className='flex lg:flex-row flex-col lg:items-center gap-5 lg:gap-20'>
            <div>
              <h1>Username: {user.username} </h1>
              <h1>Email Id: {user.email} </h1>
            </div>
            <div>
            <h1> Joined on {new Date(user.createdAt).toDateString()} </h1>
            <h1> Account updated on {new Date(user.updatedAt).toDateString()} </h1>
            </div>
          </div>
          <hr className={darkMode ? 'my-4 w-full border-white' : 'my-4 w-full border-black'} />
          { user.cart?.length === 0 ? <div className={darkMode ? 'w-full effect rounded-sm py-2 px-2.5 bg-black text-white' : 'w-full effect rounded-sm py-2 px-2.5 bg-gray-100 text-black'} > 
            User's Cart is empty !
          </div> : <div className='my-5' >
          <div className={darkMode ? 'w-full bg-gray-700 rounded-lg pb-1 px-3' : 'w-full bg-slate-100 rounded-lg pb-1 px-3'}>
            <h1 className='text-xl py-2 underline' > User's Cart -  </h1>
              {user.cart?.map((cart) => {
                  const {name, image, quantity, price} = cart
                  return <>
                      <div key={cart?.id} className='flex flex-wrap lg:gap-16 gap-3'>
                          <div className='flex items-start gap-6' >
                          <img className='lg:w-32 lg:h-32 w-20 h-20 rounded-md' src={image}/>
                          <div>
                              <h1 className='text-xl' > {name} </h1>
                              <h1 className='text-lg'> Rs. {price} each </h1>
                              <h1 className='text-base' > ( {quantity} x {price} ) </h1>                         
                          </div>
                          </div>
                          <div>
                              <div className='text-lg flex flex-row justify-between items-center gap-14'>
                                  <h1 className='text-lg' > {quantity} in quantity </h1>
                                  <h1 className='text-lg' > ( {quantity} x {price} ) + GST </h1>
                                  <h1 className='underline' > Total of Rs. {price * quantity} /-</h1>
                              </div>
                          </div>
                      </div>
                      {/* <div className='lg:relative my-2 lg:my-0 lg:-top-11 lg:text-right' > Added on {new Date(cart?.createdAt).toDateString() } </div> */}
                      <hr className={darkMode ? 'my-4 effect border-white' : 'my-4 effect border-black'} />
                  </>
              })}
            </div>
            </div>
          }
          Orders
          </div>
        </div>
        <AdminSideBar/>
      </div>
    </section>
  </>
  )
}

export default SingleUser