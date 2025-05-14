import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useLocation } from 'react-router-dom';
import { useThemeContext } from '../Context/themeContext';
import AdminSideBar from '../Components/AdminSideBar';
import AdminNav from '../Components/AdminNav';

const AdminSingleProduct = () => {

    const [plant, setPlant] = useState({})
    const [updateMode, setUpdateMode] = useState(false)
    const {darkMode, adminSideBar} = useThemeContext()

    const location = useLocation()
    const path = location.pathname.split("/")[2]

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [careLevel, setCareLevel] = useState("")
    const [shipping, setShipping] = useState("")

    useEffect(() => {
        const getPlant = async () => {
            const res = await axios.get("/product/" + path)
            setPlant(res.data)
            setName(res.data.name)
            setDesc(res.data.desc)
            setCareLevel(res.data.careLevel)
            setCategory(res.data.category)
            setShipping(res.data.shipping)
            setPrice(res.data.price)
            setStock(res.data.stock)
        }
        getPlant()
    }, [path])

    const handleDelete = async () => {
        await axios.delete(`/product/${plant._id}`)
        window.location.replace("/products")
    }

    const handleUpdate = async (e) => {
        try {
            await axios.put(`/product/${plant._id}`, {
                name, price, desc, careLevel, category, shipping, stock
            })
            window.location.reload()
            setUpdateMode(false)
        } catch (err) {
            console.log(err);
        }
    }

  return <>
    <AdminNav/>
    <section className={darkMode ? "relative top-14 bg-gray-900 text-white lg:h-screen h-full": "relative top-14 h-full bg-white text-black"} >
      <div className='flex sm:flex-col flex-row w-full' >
        <div className={adminSideBar === true ? "lg:w-10/12 w-full transition-all delay-200": "w-full transition-all delay-200"} >
            <div className='px-4 py-4' >
                <a href='/products' className={updateMode ? "hidden" : 'px-3 py-1.5 bg-green-500 text-white rounded-md shadow-md'} > <i className='fas fa-arrow-left'/> Go Back </a>
                <div className='flex my-3 lg:flex-row w-full flex-col lg:gap-5 gap-2'>
                    <img className='lg:w-4/12 w-full' src={plant.photo} alt={plant.name}/>
                    <div className='w-full p-1'>
                        <div className={updateMode ? 'flex lg:flex-row flex-col gap-3 justify-between items-center' : 'flex justify-between items-center'}>
                            {updateMode ? <input className='bg-sky-200 w-full px-2 py-1' autoFocus value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' /> : <h1 className='text-2xl' > {plant.name} </h1> } 
                            {updateMode ? <input className='bg-sky-200 w-full px-2 py-1' autoFocus value={price}  onChange={(e) => setPrice(e.target.value)} type="text" placeholder='Price' /> : <h1 className='text-xl' > Rs.{plant.price} </h1> }
                        </div>
                        {updateMode ? <textarea className='bg-sky-200 my-3 px-2 py-1 w-full' autoFocus value={desc} onChange={(e) => setDesc(e.target.value)} rows="8" placeholder='Description'/> : 
                        <p className={adminSideBar === true ? 'text-lg transition-all delay-200 text-justify my-2' : 'text-xl transition-all delay-200 text-justify my-2'} > {plant.desc} </p>
                        }
                        <div className='flex gap-2 items-start'>
                            <div className={updateMode ? "text-lg hidden" : "text-lg"} >
                                <h1> Category </h1>
                                <h1> Carelevel </h1>
                                <h1> Stock</h1>
                                <h1> Shipping </h1>
                            </div>
                            <div className='text-lg' >
                                {updateMode ? <input className='bg-sky-200 w-full px-2 py-1' type="text" autoFocus value={plant.category} onChange={(e) => setCategory(e.target.value)}  /> :
                                <h1>-  {plant.category} </h1>
                                 }
                                {updateMode ? <select autoFocus value={careLevel} onChange={(e) => setCareLevel(e.target.value)} className='bg-sky-200 my-1 px-2 py-1' >
                                    <option value="easy" >easy</option>
                                    <option value="intermediate" >intermediate</option>
                                    <option value="hard" >hard</option>
                                </select>
                                : <h1>-  {plant.careLevel} </h1>}
                                {updateMode ? <input className='bg-sky-200 w-full px-2 py-1' type="text" autoFocus value={stock} onChange={(e) => setStock(e.target.value)} /> : <h1>-  {plant.stock} </h1> }
                                {updateMode ? <select value={shipping} autoFocus onChange={(e) => setShipping(e.target.value)}  className='bg-sky-200 my-1 px-2 py-1' >
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select> : <h1>-  {plant.shipping === true ? "true": "false"} </h1> }
                                
                            </div>
                        </div>
                        <hr className={darkMode ? "border-white my-2": "border-black my-2"} />
                        {updateMode ? <div className='flex gap-3' >
                            <button onClick={handleUpdate} className='bg-green-500 text-white px-2 py-1 rounded-md shadow-md' > <i className='fas fa-pen'/> update </button>  
                            <button onClick={() => setUpdateMode(false)} className='bg-red-500 text-white px-2 py-1 rounded-md shadow-md' > <i className='fas fa-times'/> cancel </button> 
                        </div> : 
                        <div className='flex justify-between items-center'>
                            <h1 className='text-lg'> Created on {new Date(plant.createdAt).toLocaleDateString()} & last updated on {new Date(plant.updatedAt).toLocaleDateString()} </h1>
                            <div className='flex gap-3'>
                                <i onClick={() => setUpdateMode(true)} className='fas fa-edit cursor-pointer'/>
                                <i onClick={handleDelete} className='fas fa-trash cursor-pointer'/>
                            </div>
                        </div>
                        }
                </div>
            </div>
        </div>
    </div>    
        <AdminSideBar/>
      </div>
    </section>
  </>
};

export default AdminSingleProduct;
