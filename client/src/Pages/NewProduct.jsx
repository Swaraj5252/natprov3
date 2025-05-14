import React, {useState} from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import { useThemeContext } from '../Context/themeContext';
import {getStorage, ref, uploadBytesResumable, getDownloadURL,} from "firebase/storage";
import axios from "axios"
import app from '../firebase';

const NewProduct = () => {
    const {darkMode, adminSideBar} = useThemeContext()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [stock, setStock] = useState("")
    const [careLevel, setCareLevel] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
            // file/image upload
            const fileName = new Date().getTime() + photo.name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, photo)
            await uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                        default:
                    }
                }, 
                (err) => {
                    // handles sucessfull errors
                    // console.log("error!");
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                        const newPlant = {name, price, desc, photo: downloadURL, stock, careLevel, category, shipping}
                        const res = await axios.post("/product", newPlant)
                        window.location.replace("/products")
                        console.log('File available at', downloadURL, res);
                    });
                }
                );
    } 

  return <>
    <AdminNav/>
    <section className={darkMode ? 'relative top-14 bg-gray-900 lg:h-full h-screen text-white' : 'relative top-14 bg-white text-black'}>
        <div className='flex sm:flex-col flex-row w-full' >
        <div className={adminSideBar === true ? "w-10/12 effect": "w-full effect"} >
            <div className='px-5'>
            <form onSubmit={handleSubmit} >
                {photo ? <div className='h-96 w-3/12 my-3'> <img alt={name} className='h-full object-cover rounded-lg w-full' src={URL.createObjectURL(photo)} /> </div> : <div className='border-dotted my-3 border-2 border-sky-500 w-3/12 h-80'> <p className='text-center relative top-36'>Add photo for your product</p> </div>}
                <div className='flex flex-wrap items-center gap-3 lg:gap-5' >
                    <label htmlFor="fileInput">
                    <i className="w-max text-2xl cursor-pointer border-2 rounded-full flex items-start justify-center py-1 px-2 fas fa-plus"></i>
                    </label>
                    <input required id="fileInput" type="file" 
                    style={{ display: "none" }} onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
                    <div className='flex justify-between items-center lg:gap-8 gap-2'>
                        <input className='w-full text-black rounded-md my-3 px-3 py-1 bg-sky-200' type="text" placeholder="name...." autoFocus onChange={(e) => setName(e.target.value)} />
                        <input className='w-full text-black rounded-md my-3 px-3 py-1 bg-sky-200' autoFocus placeholder="category...." type="text" onChange={(e) => setCategory(e.target.value)}/>
                    </div>
                    <textarea className='w-full text-black rounded-md my-3 px-3 py-1 bg-sky-200' cols="100" rows="10" placeholder="description...." autoFocus onChange={(e) => setDesc(e.target.value)}/>
                    <div className="flex lg:flex-row flex-col items-center lg:gap-8 gap-2">
                        <input className='lg:my-3 text-black px-3 py-1 rounded-md w-full bg-sky-200' autoFocus placeholder="price..." type="text" onChange={(e) => setPrice(e.target.value) } />
                        <input className='lg:my-3 text-black px-3 py-1 w-full rounded-md bg-sky-200' autoFocus placeholder="stock..." type="number" onChange={(e) => setStock(e.target.value)}/>
                    </div>
                    <div className="my-3">
                        <p className='my-2 lg:my-0 text-xl' >  Select care level - </p>
                        <select className="lg:my-3 px-3 py-1 text-black rounded-md bg-sky-200" autoFocus onChange={(e) => setCareLevel(e.target.value)} >
                            <option value="easy" > easy </option>
                            <option value="intermediate" > intermediate </option>
                            <option value="hard" > hard </option>
                        </select>
                        <p className='my-2 lg:my-0 text-xl' >  Shipping offers - </p>
                        <select className="lg:my-3  px-3 py-1 text-black rounded-md bg-sky-200" autoFocus onChange={(e) => setShipping(e.target.value)} >
                            <option value="true" > true </option>
                            <option value="false" > false </option>
                        </select>
                    </div>
                    <button className='btn btn-purple mb-4' type="submit" > <i className="fas fa-plus"></i> Create </button>
                </form>
            </div>
        </div>
        <AdminSideBar/>
      </div>
    </section>
  </>
};

export default NewProduct;
