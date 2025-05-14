import React, { useEffect, useContext, useReducer, useRef, useState } from 'react'
import reducer from "../Reducer/AdminFilterReducer"
import {useProductContext} from "./ProductContext"
import { LOAD_ADMIN_PRODUCTS, SORT_ADMIN_PRODUCTS, UPDATE_ADMIN_FILTER, UPDATE_ADMIN_SORT, FILTER_ADMIN_PRODUCTS, CLEAR_ADMIN_FILTER } from '../action'

const INITIAL_STATE = {
    allProducts: [],
    filteredProducts: [],
    sort: "price-lowest",
    filter: {
        text: "",
        careLevel: "all",
        minPrice: 0,
        maxPrice: 0,
        price: 0,
        shipping: false
    },
}

const AdminFilterContext = React.createContext()

export const AdminFilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const {adminProducts} = useProductContext()
    useEffect(() => {
        dispatch({type: LOAD_ADMIN_PRODUCTS, payload: adminProducts})
    }, [adminProducts])


    const updateSort = (e) => {
        const value = e.target.value
        dispatch({type: UPDATE_ADMIN_SORT, payload: value})
    }

    const updateFilter = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "price") {
            value = Number(value)
        }
        if (name === "shipping") {
            value = e.target.checked
        }
        dispatch({type: UPDATE_ADMIN_FILTER, payload: {name, value}})
    }

    useEffect(() => {
        dispatch({type: FILTER_ADMIN_PRODUCTS})
        dispatch({type: SORT_ADMIN_PRODUCTS})
    }, [adminProducts, state.sort, state.filter])

    const clearFilter = () => {
        dispatch({type: CLEAR_ADMIN_FILTER})
    }

    return(
        <AdminFilterContext.Provider value={{...state, updateSort, updateFilter, clearFilter}}>
            {children}
        </AdminFilterContext.Provider>
    )
} 

export const useAdminFilterProContext = () => {
    return useContext(AdminFilterContext)
}