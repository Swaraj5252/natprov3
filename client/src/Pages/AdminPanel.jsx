import React, { useEffect, useState, useMemo } from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import { useThemeContext } from '../Context/themeContext';
import axios from 'axios';
import Chart from '../Components/Chart';
const AdminPanel = () => {

  const {darkMode, adminSideBar, openAdminSidebar, closeAdminSidebar} = useThemeContext()
  const [toggle, setToggle] = useState(false)
  const [name, setName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [error, setError] = useState(false)
  const [plant, setPlant] = useState([])
  const [users, setUsers] = useState([])
  const [admin, setAdmin] = useState([])
  const [orders, setOrders] = useState([])
  const [userStats, setUserStats] = useState([]);

 const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/adminRegister", {
            name, adminEmail, adminPassword
        })
            res.data && alert("New admin created sucessfully")
        } catch (error) {
            setError(true) 
            alert("Process failed! Try later :(")
        }
    }

    useEffect(() => {

    const getAllUsers = async () => {
      const res = await axios.get("/user/")
      setUsers(res.data)
    }
    
    const getAllPlants = async () => {
        try {
            const plants = await axios.get("/product")
            setPlant(plants.data) 
        } catch (error) {
            alert('check your connection properly');
        } 
    }

    const getAllAdmins = async () => {
      const res = await axios.get("/user/adminget/")
      setAdmin(res.data)
    }

    const getAllOrder = async () => {
        const res =  await axios.get("/order/")
        setOrders(res.data)
        console.log(res.data)
    }

     const getStats = async () => {
      try {
        const res = await axios.get("/user/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,  
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
          );
      } catch {}
    };

    getAllPlants()
    getAllAdmins()
    getAllUsers()
    getAllOrder()
    getStats()
  }, [])




  useEffect(() => {
    const getAllAdmins = async () => {
      const res = await axios.get("/user/adminget/")
      setAdmin(res.data)
    }
    getAllAdmins()
  }, [])

  return <>
    <AdminNav/>
    <section className={darkMode ? "relative effect top-14 bg-gray-900 text-white h-screen": "relative top-14 effect bg-white text-black"} >
      <div className='flex sm:flex-col flex-row w-full' >
        <AdminSideBar/>
        <div className={adminSideBar === true ? "lg:w-10/12 w-full transition-all delay-200": "w-full transition-all delay-200"} >
          <div className='p-4' >
            <button onClick={() => toggle===true ? setToggle(false) : setToggle(true) } className='text-lg bg-green-600 text-white px-3 py-1 rounded-md' to="/newAdmin">
              <i className="fas fa-user-cog mr-2"/>
              New Admin
              <i className={toggle ? 'ml-4 fas fa-chevron-up' : 'ml-4 fas fa-chevron-right'}></i>
            </button>
            <div className={toggle===true? "block fixed left-0 top-24 lg:top-14 w-full z-[100] bg-transparent backdrop-blur-sm h-screen transition-all delay-150" : "hidden transition-all delay-150"} >
              <div className={darkMode ? 'mx-auto relative bg-black top-24 p-1 lg:px-3.5 lg:py-5 px-3 py-5  rounded-md w-11/12 lg:w-5/12' : 'mx-auto bg-green-100 shadow-md relative top-24 p-1 lg:px-3.5 lg:py-5 px-3 py-5 rounded-md w-11/12 lg:w-5/12' }>
              <h1 className='pt-2 text-xl' > Make a new Admin </h1>
              <form >
                <input
                  className={darkMode ? 'my-3 effect  w-full text-white bg-sky-700 rounded-md px-3 py-1 text-xl': 'text-xl effect my-3  w-full bg-sky-200 text-black rounded-md px-3 py-1'}
                  placeholder="Username" type="text" onChange={e => setName(e.target.value)} >
                </input> <br/>
                <input className={darkMode ? 'my-3  w-full text-white effect bg-sky-700 rounded-md px-3 py-1 text-xl': 'text-xl effect my-2  w-full bg-sky-200 text-black rounded-md px-3 py-1'}
                  placeholder="Email Id" 
                  onChange={e => setAdminEmail(e.target.value)}
                  type="text"/> <br/>
                <input className={darkMode ? 'my-3  w-full text-white effect bg-sky-700 rounded-md px-3 py-1 text-xl': 'text-xl effect my-2  w-full bg-sky-200 text-black rounded-md px-3 py-1'}
                  placeholder="Password"
                  onChange={e => setAdminPassword(e.target.value)}
                  type="password"/> <br/>
                {error ? <p className='text-red-600 mt-3'>Something went wrong</p> : null}
                <div className='flex items-center gap-4'>
                <button onClick={handleSubmit} className='px-3 py-1 my-2 rounded-md text-lg bg-green-500 text-white'> Submit </button>
                <button onClick={() => setToggle(false)} className='px-3 py-1 my-2 rounded-md text-lg bg-red-500 text-white'> Close </button>
                </div>
              </form>
              </div>
            </div>
          </div>
          {/* dashboard */}
          <div className='px-4'>
            <h1 className='text-xl pb-3 text-green-500'>Take a quick look here .......</h1>
            <div className={adminSideBar ? 'flex flex-wrap gap-5 lg:gap-6 items-center effect' : 'flex flex-wrap gap-5 effect lg:gap-12 items-center'}>
              <div className={darkMode ? 'lg:px-8 px-4 lg:py-4 py-2 effect lg:w-fit md:w-fit w-full flex justify-between items-center rounded-md gap-20 bg-stone-700 text-white' : 'lg:w-fit md:w-fit effect w-full bg-slate-200 text-black shadow-md px-8 py-4 flex justify-between items-center gap-20 rounded-md'}>
                <div>
                  <h1 className='lg:text-5xl text-3xl text-center'> {plant.length} </h1>
                  <h1 className='lg:text-xl text-lg text-center'> Plants </h1>
                </div>
                <i className='fas fa-leaf text-green-600 lg:text-5xl text-4xl'/>
              </div>
              <div className={darkMode ? 'lg:w-fit md:w-fit w-full px-8 py-4 effect flex justify-between items-center rounded-md gap-20 bg-stone-700 text-white' : 'lg:w-fit effect  md:w-fit w-full bg-slate-200 text-black shadow-md px-8 py-4 flex justify-between items-center gap-20 rounded-md'}>
                <div>
                  <h1 className='lg:text-5xl text-3xl text-center'> {users.length} </h1>
                  <h1 className='lg:text-xl text-lg text-center'> Users </h1>
                </div>
                <i className='fas fa-users text-green-600 lg:text-5xl text-4xl'/>
              </div>
              <div className={darkMode ? 'lg:w-fit md:w-fit w-full px-8 py-2 effect lg:py-4 flex justify-between items-center rounded-md gap-20 bg-stone-700 text-white' : ' effect lg:w-fit md:w-fit w-full bg-slate-200 text-black shadow-md px-8 py-4 flex justify-between items-center gap-20 rounded-md'}>
                <div>
                  <h1 className='lg:text-5xl text-3xl text-center'> {admin.length} </h1>
                  <h1 className='lg:text-xl text-lg text-center'> Admin </h1>
                </div>
                <i className='fas fa-user-cog lg:text-5xl text-4xl text-green-600'/>
              </div>
              <div className={darkMode ? 'lg:w-fit md:w-fit w-full px-8 py-2 effect lg:py-4 flex justify-between items-center rounded-md gap-20 bg-stone-700 text-white' : ' effect lg:w-fit md:w-fit w-full bg-slate-200 text-black shadow-md px-8 py-4 flex justify-between items-center gap-20 rounded-md'}>
                <div>
                  <h1 className='lg:text-5xl text-3xl text-center'> {orders.length} </h1>
                  <h1 className='lg:text-xl text-lg text-center'> Orders </h1>
                </div>
                <i className='fas fa-cube lg:text-5xl text-4xl text-green-600'/>
              </div>
            </div>
            <div className={adminSideBar ? 'py-4 w-full effect' : 'py-4 effect w-full lg:w-10/12'}>
            {/* chart analytics */}
            {/* <MainChart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
            /> */}
            <Chart data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User" />
            </div>
          </div>
          </div>
      </div>
    </section>
  </>
};

export default AdminPanel;
