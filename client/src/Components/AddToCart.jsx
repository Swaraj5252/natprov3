import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLoginContext } from '../Context/loginContext';
import { USER_START, USER_FAILIURE, USER_SUCCESS, USER_LOGOUT, USER_CART_START, USER_CART_SUCCESS, USER_CART_FAIL, ADMIN_FAILURE, ADMIN_START, ADMIN_SUCCESS, ADMIN_LOGOUT} from "../action"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AddToCart = ({product}) => {

    const {user, dispatch} = useLoginContext()
    const {stock, price} = product
    const [adds, setAdds] = useState(1)
    const [real, setReal] = useState([])

    useEffect(() => {
        const getPlant = async () => {
            const res = await axios.get(`/product/${product._id}`)
            setReal(res.data)
            console.log(real?.stock)
        }
        getPlant()
    }, [])

    const increase = () => {
        setAdds((oldAdds) => {
            let tempAdds = oldAdds + 1
            if (tempAdds > stock) {
                tempAdds = stock
            }
            return tempAdds
        })
    }

    const decrease = () => {
        setAdds((oldAdds) => {
            let tempAdds = oldAdds - 1
            if (tempAdds < 1) {
                tempAdds = 1
            }
            return tempAdds
        })
    }

    const handleCart = async () => {
        dispatch({type: USER_CART_START})
        try {
            const cart = [adds, product, product._id]
            const item = {plant: product._id,
                    name: product.name,
                    price: price,
                    image: product.photo,
                    quantity: adds,
                    stock: product.stock}
            const res = await axios.put(`/user/${user._id}/cart`, item)
            dispatch({type: USER_CART_SUCCESS, payload: res.data})
            // alert("item added to cart")
            const updatedPlant = {stock: real?.stock - item.quantity}
            await axios.put(`/product/${product._id}`, updatedPlant)
            alert(updatedPlant)
        } catch (err) {
            console.log(err);
            alert("Item already in the cart")
            // toast("Item added to the cart!", {position: toast.position.TOP_RIGHT})

        }
    }
    
    return <div>
         
      <div className='text-2xl flex flex-row items-center gap-5'>
        <button>
            <i onClick={decrease} className='fas fa-minus'/>
        </button>
          <h1 className='text-3xl' > {adds} </h1>
        <button>
            <i onClick={increase} className='fas fa-plus'/>
        </button>
         <h1> Rs. {(adds * price) + 80 } /-</h1>
      </div>
      {user ? 
        <button onClick={handleCart} className='my-2 px-3 py-1 bg-green-600 text-white text-lg shadow-md rounded-md'> <i className='fas fa-cart-shopping'/> <a href='/cart'> Add to Cart </a> </button>
        : <h1 className='text-xl text-green-500' > Log in to add to cart </h1> }
  </div>;
};

export default AddToCart;
