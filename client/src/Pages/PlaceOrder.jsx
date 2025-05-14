import React,{useState, useEffect} from 'react'
import {GoPackage} from "react-icons/go"
import {AiFillMobile} from "react-icons/ai"
import Navbar from '../Components/Navbar'
import { useThemeContext } from '../Context/themeContext'
import { useLoginContext } from '../Context/loginContext'
import Footer from '../Components/Footer'
import axios from 'axios'
const PlaceOrder = () => {

    const paymentOption = {
        question: "Please select your method of payment:",
        choices: [
            { text: 'UPI', value: 'UPI' },
            { text: ' Net Banking', value: ' Net Banking' },
            {text: 'Cash on Delivery', value: 'Cash on Delivery'}
        ]
    }

    const {darkMode} = useThemeContext()
    const {user} = useLoginContext()
    const [cart, setCart] = useState([])
    const [shippingAddress, setShippingAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect( async () => {
        // dispatch({type: USER_CART_START})
        try {
            const res = await axios.get(`/user/${user._id}`)
            setCart(res.data)
        } catch (err) {
            console.log(err)
        }
    }, [])

    // code for total sum - 
    const sum = (array) => {
        let s = 0
        for (let i = 0; i < array?.length; i++) {
            s = s + array[i];
        }
            return s
        }
        let fuck = cart.cart?.map((c) => c.price * c.quantity)
        let totalAmount = sum(fuck) 

        // code for total quantity - 
    const sumOfQuantity = (array) => {
        let sq = 0
        for (let i = 0; i < array?.length; i++) {
            sq = sq + array[i + 1]
        }
        return sq
    }
    let fuck2 = cart.cart?.map((q) =>  [q.quantity * q.quantity] - q.quantity )
    let totalQuantity = sum(fuck2)
    
    // making new order
    
    const handleOrder = async (e) => {
        // return orderItems
        e.preventDefault()
        const order = { userId: user?._id, user: user.username , totalAmount: totalAmount,
            totalQuantity: totalQuantity, shippingAddress, phoneNumber, paymentMethod: paymentMethod, email: user.email,
            orderItems: cart.cart?.map((c) => c)
        }
        
        try {
            const res = await axios.post("/order/", order)
            await axios.put(`/user/${user?._id}/clearCart`)
            window.location.replace("/orders")
            
        } catch (error) {
                alert(error)
                console.log(error)
            }
        }
    
        
        return (
            <>
    <Navbar/>
    <section className={darkMode ? "relative lg:top-14 top-12 bg-stone-900 text-white min-h-screen h-full " : "relative lg:top-16 top-12 bg-white text-black min-h-screen h-full"} >
        <div className='h-full lg:pt-8 lg:px-5 px-3 pt-4'>
        <div className='flex gap-5 justify-between mb-3 flex-wrap min-h-screen h-full lg:flex-row flex-col items-start'>
            {/* cart products */}
            <div className={darkMode ? 'py-5 px-2 border-white border-2 lg:w-5/12 w-full rounded-md ' : ' py-5 px-2 border-black border-2 lg:w-5/12 w-full rounded-md'}>
            <div className='absolute lg:left-7 lg:top-3 top-1 rounded-xl bg-white text-black py-1 px-3 w-fit border-2 border-black'> {totalQuantity} items in total </div>
            <div className='flex flex-col gap-5'>
                {cart.cart?.map((c) => {
                    return <>
                    <div className='flex flex-wrap  gap-3 lg:gap-10 items-start' >
                        <div className='flex gap-4'>
                            <img className='w-32 h-32 rounded-md' src={c.image}/>
                        <div>
                            <h1 className='text-xl' > {c.name} </h1>
                            <h1 className='text-lg' > Rs. {c.price} each </h1>
                        </div>
                        </div>
                        <h1 className='text-lg underline' > ({c.quantity} x {c.price}) </h1>
                        <h1 className='text-lg'> Rs. {c.quantity * c.price} </h1>
                    </div>
                    <hr className={darkMode ? "w-full border-white" : "w-full border-black" }/>
                </>
                })}
        </div>
            <div className='flex mt-3 px-1 justify-between'>
                <h1 className='text-xl' > Total Amount - </h1>
                <h1 className='text-lg'> Rs. {totalAmount} /- </h1>
            </div>
            </div>
            {/* address and other info */}
            <>
            <div className='w-full lg:w-6/12 rounded-md' >
            <div className={darkMode? "py-5 px-3 border-white border-2 mb-4  rounded-md" : "py-5 px-3 border-black border-2 mb-4 w-full  rounded-md"}>
                <form onSubmit={handleOrder} className='flex flex-col gap-6 lg:gap-3'>
                    <div className='flex flex-col gap-1.5'>
                        <span className='text-xl'> <i className='fa-solid fa-location-dot'/> Address - </span>
                        <textarea onChange={(e) => setShippingAddress(e.target.value)} rows={2} type="text" className={darkMode? 'border-2 p-2 rounded-md border-green-600 text-black w-full': 'border-2 rounded-md p-2 border-black w-full' } />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <span className='text-xl flex gap-1 items-center'> <AiFillMobile/> Mobile Number - </span>
                        <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} className={darkMode? 'border-2 rounded-md p-2 border-green-600 text-black w-full': 'border-2 rounded-md p-2 border-black w-full' } />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <span className='text-xl flex gap-1 items-center'> <AiFillMobile/> Email Address - </span>
                        <input type="text" value={user?.email} readOnly className={darkMode? 'border-2 rounded-md p-2 border-green-600 text-black w-full': 'border-2 rounded-md p-2 border-black w-full' } />
                    </div>
                    {/* payment info */}
                    <div className='text-lg ' >
                        {/* <h1 className='text-xl ' >Please select your method of payment:</h1  >
                        <input type="radio" id="html" name="fav_language" value="HTML"/>
                        <label className='px-1.5' for="html">UPI</label><br/>
                        <input type="radio" id="css" name="fav_language" value="CSS"/>
                        <label className='px-1.5' for="css"> Net Banking </label><br/>
                        <input type="radio" id="javascript" name="fav_language" value="JavaScript"/>
                        <label className='px-1.5' for="javascript"> Cash on Delivery (Pay Rs. {totalAmount}) </label>  */}
                        { paymentOption.choices.map((choice, index) => (
                            <label key={index} >
                                <input className='mr-2' type="radio" name="vote" value={choice.value} onChange={(e) => setPaymentMethod(e.target.value) } />
                                 {choice.text} <br/>
                            </label>
                        )) }
                    </div>
                </form>
            </div>
            <div className='flex items-center gap-3'>
            <button onClick={handleOrder} className='btn-purple relative rounded-md text-lg px-3 py-2 flex items-center gap-1'> Confirm Order <GoPackage/>  </button>
            <a href='/cart' className='btn-purple relative rounded-md text-lg px-3 py-2' > <i className='fa-solid fa-arrow-left'/> Go Back </a>
            </div>
            </div>
            </>
        </div>
    </div>
    <Footer/>
    </section>
    </>
  )
}

export default PlaceOrder