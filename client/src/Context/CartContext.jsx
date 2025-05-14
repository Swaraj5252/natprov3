import React, {useReducer, useContext} from "react";
import reducer from "../Reducer/CartReducer"
import {CART_SUCCESS, ADD_CART} from "../action"
import axios from "axios";
 
const INITIAL_STATE = {
    cart: [],
}

const CartContext = React.createContext()

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const fetchCart = async () => {
        const res = await axios.get("/cart")
        const cart = res.data
        dispatch({type: CART_SUCCESS, payload: cart})
    }


    return(
        <CartContext.Provider value={{...state,}} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}