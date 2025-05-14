import React, {useReducer, useContext, useEffect} from "react";
import axios from "axios";
import {PRODUCTS_BEGIN, PRODUCTS_ERROR, PRODUCTS_SUCCESS} from "../action";
import reducer from "../Reducer/ProductReducer";

const INITIAL_STATE = {
    productsLoading: false,
    productsError: false,
    products: [],
    adminProducts: []
}

const ProductContext = React.createContext()

export const ProductProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const fetchProducts = async () => {
        dispatch({type: PRODUCTS_BEGIN})
        try {
            const res = await axios.get("/product")
            const products = res.data
            dispatch({type: PRODUCTS_SUCCESS, payload: products})
        } catch (err) {
            dispatch({type: PRODUCTS_ERROR})
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return(
        <ProductContext.Provider value={{...state}} >
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext)
}