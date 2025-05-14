import React, {useState, useEffect} from 'react'
import AdminNav from '../Components/AdminNav'
import AdminSideBar from '../Components/AdminSideBar';
import Footer from '../Components/Footer'
import { useThemeContext } from '../Context/themeContext';
import axios from 'axios';
const AdminOrderView = () => {
    const {darkMode, adminSideBar} = useThemeContext()
    const [orders, setOrders]  = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get("/order/")
                setOrders(res.data)
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getOrders()
    }, [])
  return (
    <>
    <AdminNav/>
    <section className={darkMode ? 'relative effect top-14 bg-stone-900 text-white ' : 'relative effect top-14 bg-blue-50 text-black '} >
        <div className='flex min-h-screen h-full sm:flex-col flex-row w-full' >
        <AdminSideBar/>
        <div className={adminSideBar === true ? "lg:w-10/12 w-full min-h-screen h-full transition-all delay-200": "w-full transition-all delay-200"}>
            <div className='p-3'>
                <div className="my-0 overflow-x-auto sm:-mx-6 lg:mx-0">
              <table className="min-w-full divide-y  divide-gray-400">
                <thead className={darkMode ? "bg-gray-700 effect text-white" : "bg-stone-200 effect text-black"}>
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Order number
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Total Amount
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Total Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Shipping Address
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Phone Number
                    </th>
                    {/* <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Ordred On
                    </th> */}
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Status
                    </th>
                  </tr>
                </thead>
                <tbody className={darkMode ? "divide-y effect bg-stone-800 divide-gray-600" : "divide-y effect bg-white divide-gray-200"}>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="py-4 px-4 lg:px-2 whitespace-nowrap">
                        <a href={`/orders/${order._id}`} > Order no. :- </a>
                        <h1 className='text-sm'>{order._id}</h1>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap">
                            <div className="text-base ">{order.user}</div>
                            <div className="text-sm ">{order.email}</div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm ">Rs. {order.totalAmount} /-</div>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap text-sm ">{order.totalQuantity} products</td>
                      <td className="py-4 px-4 lg:px-2 whitespace-nowrap">
                        {order.shippingAddress.substring(0, 40)}....
                      </td>
                      <td className='py-4 px-4 whitespace-nowrap text-sm'> {order.phoneNumber} </td>
                      {/* <td className='py-4 px-2 whitespace-nowrap text-sm'> {new Date( order.createdAt).toDateString() } </td> */}
                      <td className='py-4 px-2 whitespace-nowrap text-sm'> {order.status} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
        </div>
        </div>
    <Footer/> 
    </section>
    </>
  )
}

export default AdminOrderView