import {useState, useEffect, useRef} from 'react';
import { USER_START, USER_FAILIURE, USER_SUCCESS, USER_LOGOUT, USER_CART_START, USER_CART_SUCCESS, USER_CART_FAIL, ADMIN_FAILURE, ADMIN_START, ADMIN_SUCCESS, ADMIN_LOGOUT} from "../action"
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { useThemeContext } from '../Context/themeContext'
import { useLoginContext } from '../Context/loginContext';
import nothing from "../images/nothing.svg"
import { format } from "timeago.js";
import axios from 'axios';
import CartCard from '../Components/CartCard';
const UserCart = () => {

    const {darkMode} = useThemeContext()
    const {user, dispatch} = useLoginContext()
    const [cart, setCart] = useState([])

    useEffect( async () => {
        // dispatch({type: USER_CART_START})
        try {
            const res = await axios.get(`/user/${user._id}`)
            setCart(res.data)
        } catch (err) {
            console.log(err)
        }
    }, [])

   const handleClearCart = async () => {
    try {
        await axios.put(`/user/${user._id}/clearCart`)
        window.location.reload("/cart")
    } catch (err) {
        console.log(err)
    }
   }

        const sum = (array) => {
            let s = 0
            for (let i = 0; i < array?.length; i++) {
                s = s + array[i];
            }
            return s
        }
        let fuck = cart.cart?.map((c) => c.price * c.quantity)
        let total = sum(fuck) 
    // }, [])



    return <>
        <Navbar/>
        <section className={darkMode ? "relative effect top-12 lg:top-14 text-white bg-black w-full h-full" : "relative effect top-14 text-black bg-stone-100 w-full h-full"} >
            <div className='py-7 min-h-screen h-full lg:px-8 px-3' >
                {cart?.cart == 0 ?  
                <div className='h-full text-center'>
                    <div className='relative top-16' >
                    <h1> Your Cart is empty. Go fill it </h1>
                    <img className='w-full my-10 h-60' src={nothing}/> 
                    <a href='/products' className='bg-green-500 text-white px-3 py-2 rounded-md'>
                        Fill It! <i className="fa-solid fa-fill pl-2"/>
                    </a>
                    </div>
                </div> :
                <div className='flex lg:flex-row flex-col lg:gap-9 gap-5 mx-auto'>
                    <div className={darkMode ? 'bg-stone-800 empty text-white p-4 lg:w-8/12 w-full' : 'bg-white empty p-4 text-black lg:w-8/12 w-full'} >
                        {cart.cart?.map((cart) => (
                            <CartCard item={cart}/> 
                        ))}
                    </div>
                <div className='lg:w-4/12 w-full h-fit' >
                    <div className={darkMode ? 'bg-stone-800 effect text-white p-4 ' : 'bg-white effect p-4 text-black'}>
                        {cart.cart?.map((cart) => {
                            return <>
                            <div>
                                <div className='flex justify-between'>
                                    <h1 className='text-lg mb-2' > {cart.name} </h1>
                                    <h1 className='text-base' > {cart.price * cart.quantity } </h1>
                                </div>
                            </div>
                            </>
                        })} 
                        <hr className='my-2' />                        
                        <div className='flex mb-4 justify-between '>
                            <h1 className='text-xl' > Total price </h1>
                            <h1 className='text-base' >{total} </h1>
                        </div>
                        <a href='/placeOrder' className='bg-green-500 text-white rounded-md px-3 py-2 shadow-md'>Place Order <i className='fas fa-chevron-right'/> </a>
                    </div>
                    <button onClick={handleClearCart} className='bg-red-500 text-white rounded-md px-3 py-2 my-3 shadow-md'> Clear Cart <i className='fa-solid fa-trash pl-2'/> </button>
                    </div>
                </div>
                }
            </div>
            <Footer/>
        </section>
    </>
}

export default UserCart;