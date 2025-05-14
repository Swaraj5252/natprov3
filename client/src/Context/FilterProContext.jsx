import React, { useEffect, useContext, useReducer } from 'react'
import reducer from "../Reducer/FilterProReducer"
import {useProductContext} from "./ProductContext"
import { LOAD_PRODUCTS,
        SET_GRIDVIEW,
        SET_LISTVIEW,
        SORT_PRODUCTS,
        UPDATE_SORT,
        UPDATE_FILTER,
        FILTER_PRODUCTS,
        CLEAR_FILTER, } from '../action'

const INITIAL_STATE = {
    filteredProducts: [],
    allProducts: [],
    gridView: false,
    sort: "price-lowest",
    filter: {
        text: "",
        category: "all",
        careLevel: "all",
        minPrice: 0,
        maxPrice: 0,
        price: 0,
        shipping: false
    },
}

const FilterProContext = React.createContext()

export const FilterProProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const {products} = useProductContext()

    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: products})
    }, [products])

    const setGridView = () => {
        dispatch({type: SET_GRIDVIEW})
    }

    const setListView = () => {
        dispatch({type: SET_LISTVIEW})
    }

    const updateSort = (e) => {
        const value = e.target.value
        dispatch({type: UPDATE_SORT, payload: value})
    }

    const updateFilter = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'category') {
            value = e.target.textContent
        }
        if (name === "price") {
            value = Number(value)
        }
        if (name === "shipping") {
            value = e.target.checked
        }
        dispatch({type: UPDATE_FILTER, payload: {name, value}})
    }

    useEffect(() => {
        dispatch({type: FILTER_PRODUCTS})
        dispatch({type: SORT_PRODUCTS})
    }, [products, state.sort, state.filter])

    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }
    

    return(
        <FilterProContext.Provider value={{...state, setGridView, setListView, updateSort, updateFilter, clearFilter}} >
            {children}
        </FilterProContext.Provider>
    )
}

export const useFilterProContext = () => {
    return useContext(FilterProContext)
}