import React, { useEffect, useState } from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import { useThemeContext } from '../Context/themeContext';
import { useLoginContext } from '../Context/loginContext';
import axios from "axios"
import {Link} from "react-router-dom"

const AllUsers = () => {

  const {darkMode, adminSideBar, openAdminSidebar, closeAdminSidebar} = useThemeContext()
  const {admin} = useLoginContext()
  const [users, setUsers] = useState([])
  const [adminUsers, setAdminUsers] = useState([])
  const [adminVeiw, setAdminVeiw] = useState("userView")
  const [order, setOrder] = useState([])
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("/user/")
      setUsers(res.data)
    }
   
    
    const getOrders = async () => {
      const user = users.map((u) => u)
      console.log(user?._id)
      const res = await axios.get(`/order/${user._id}/orders`)  
      setOrder(res.data)
    }

    getOrders()
    getAllUsers()
  }, [])
  
  useEffect(() => {
    const getAllAdmins = async () => {
      const res = await axios.get("/user/adminget/")
      setAdminUsers(res.data)
    }
    getAllAdmins()
  }, [])

  const handleOptions = (e) => {
    const selectedView = e.target.value
    setAdminVeiw(selectedView)
    }

  
  return <>
    <AdminNav/>
   <section className={darkMode ? "relative top-14 bg-gray-900 text-white min-h-screen h-full": "relative top-14 h-full bg-white text-black"} >
      <div className='flex sm:flex-col flex-row w-full' >
        <div className={adminSideBar === true ? "transition-all delay-200 w-10/12 px-1 py-1": "transition-all delay-200 w-full px-1 py-1"} >
            <div className='pb-3 pt-1 items-center justify-between flex px-1'> 
            {adminVeiw === "userView" 
            ? 
              <div className='' > <h1 className='text-xl' > {users.length} Users found </h1> </div> :
               <div> <h1 className='text-lg' > {adminUsers.length} admins found </h1> </div>
            }
            {!adminSideBar && 
              <hr className={darkMode ? 'lg:w-9/12 w-0 bg-slate-100 border-white' : 'lg:w-9/12 w-0 bg-slate-900 border-black'} />
            }
              <div className=' flex items-center'>
                <label htmlFor="sort" className='lg:relative pr-2' > Select </label>
                  <select value={adminVeiw} onChange={handleOptions}  className={darkMode ? "bg-blue-200 rounded-md text-white p-1" : "rounded-md bg-sky-100 text-black p-1"} >
                      <option value="userView" > users </option>
                      <option value="adminView" > admin </option>
                  </select>
              </div>
            </div>
            {adminVeiw==="userView" ? 
            <div className="my-0 overflow-x-auto sm:-mx-6 lg:mx-0">
              <table className="min-w-full divide-y  divide-gray-400">
                <thead className={darkMode ? "bg-gray-700 text-white" : "bg-stone-200 text-black"}>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Cart
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Joined On
                    </th>
                  </tr>
                </thead>
                <tbody className={darkMode ? "divide-y bg-stone-800 divide-gray-600" : "divide-y divide-gray-200"}>
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium"> <Link to={`/allUser/${person._id}`}> {person.username} </Link>  </div>
                            <div className="text-sm ">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{person.cart.length} products</div>
                        <div className="text-sm ">{person.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm "> 
                      {/* {users.map((user) => {
                        // console.log(user)
                        return <SingleOrder user={user} />`
                      })} */}
                      <SingleOrder user={person} />
                       {/* {order.length} orders  */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                          In-Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(person?.createdAt).toDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            :
            <div className="my-0 overflow-x-auto sm:-mx-6 lg:mx-0">
              <table className="min-w-full divide-y  divide-gray-400">
                <thead className={darkMode ? "bg-gray-700 text-white" : "bg-stone-200 text-black"}>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Pending
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Joined on
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                      Delete 
                    </th>
                  </tr>
                </thead>
                <tbody className={darkMode ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
                  {adminUsers.map((person) => (
                    <tr key={person.adminEmail}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium"> <Link to={`/allUser/${person._id}`}> {person.name} </Link>  </div>
                            <div className="text-sm ">{person.adminEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">no products</div>
                        <div className="text-sm "></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">{new Date(person.createdAt).toDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                          In-Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {admin._id == person._id ? 
                          null :
                          <i className='fa-solid fa-trash cursor-pointer'/>
                        }
                          <DeleteAdmin adminUsers={adminUsers} /> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          } 
        </div>
        <AdminSideBar/>
      </div>
    </section>
  </>
};
const DeleteAdmin = ({adminUsers}) => {
  const {admin} = useLoginContext()
  const handleDeleteAdmin = async () => {
    {console.log(admin._id)}
    try {
      await axios.delete(`/adminDelete/${adminUsers._id}`) && window.location.reload("")
    } catch (error) {
      alert("Process Failed!")
    }
  }
  return <>
  {adminUsers._id == admin._id ?
  <i key={adminUsers._id} onClick={handleDeleteAdmin} className='fa-solid fa-trash cursor-pointer'/>
  : null
  }
  </>
}

const SingleOrder = ({user}) => {
  console.log(user._id);
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(`/order/${user._id}/orders`)
      setOrders(res.data)
      // console.log(res.data)
    }
    getOrders()
  }, [user])

  return <>
  <h1> {orders.length} orders </h1>
  </>

}

export default AllUsers;
