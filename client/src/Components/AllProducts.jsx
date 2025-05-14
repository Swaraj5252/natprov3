import React from 'react'
import Sort from './Sort'
import { useFilterProContext } from '../Context/FilterProContext'
import {useThemeContext} from "../Context/themeContext"
import ListView from "../Components/ListView"
import GridView from '../Components/GridView'
import {MdFilterListAlt} from "react-icons/md"
import nothing from "../images/nothing.svg"

const AllProducts = () => {

    const {filteredProducts: products, gridView} = useFilterProContext()
    const {darkMode, filterBar, openFilterBar, closeFilterBar} = useThemeContext()
    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className={filterBar ? 'lg:w-9/12 relative effect lg:left-1/4  w-full': 'lg:left-1/4 effect w-full'} >
            <button 
                onClick={!filterBar ? openFilterBar : closeFilterBar}
                className={filterBar ? "lg:hidden fixed right-2 bottom-1 bg-green-600 px-3 py-3 text-2xl rounded-[100%] text-white" : "fixed right-2 bottom-1 bg-green-600 px-3 py-3 text-2xl rounded-[100%] text-white" }>
                    <MdFilterListAlt onClick={toTop} /> 
            </button>
            <Sort/>
            {products.length < 1 ? <div className='relative top-20' > 
                <img className='w-full mb-5 h-60' src={nothing}/>
                <h1 className='text-center' >Sorry! No Products search your match ....</h1> 
            </div> : null}
            <div className='px-3 py-3'>
                {gridView  ? <GridView products={products} /> : <ListView products={products} />}
            </div>
        </div>
    )
}

export default AllProducts
