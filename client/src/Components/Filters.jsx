import React, {useState} from 'react'
import {getUniqueValue} from "../getUnique"
import {useThemeContext} from "../Context/themeContext"
import { useFilterProContext } from '../Context/FilterProContext'

const Filters = () => {

    const {darkMode, filterBar, openFilterBar, closeFilterBar} = useThemeContext()
    const {filter: {text, category, careLevel, minPrice, maxPrice, price, shipping}, allProducts, updateFilter, clearFilter} = useFilterProContext()
    const categories = getUniqueValue(allProducts, "category")
    const care = getUniqueValue(allProducts, "careLevel")
    
    return (
        <div className={filterBar ? "lg:w-3/12 fixed lg:block hidden custom overflow-y-auto left-0 lg:top-14 top-0 right-0 h-full w-full lg:px-1 px-3 lg:pt-3 " : "lg:w-3/12 custom overflow-y-auto lg:block left-0 lg:top-14 top-0 right-0 w-full lg:px-1 px-3 py-5 relative  text-black h-full lg:fixed  lg:h-screen"}>
            <div className="py-1 px-4" >
            <div className="flex justify-between my-2 lg:my-0 items-center">
                <p className={darkMode ? "text-lg text-white" : "text-lg text-black"}> Filters <i class="fa-solid fa-filter"></i> </p>
                <i  onClick={!filterBar ? openFilterBar : closeFilterBar} className={darkMode ? "fa-solid fa-minus block cursor-pointer lg:hidden text-white" : "fa-solid fa-minus block text-black cursor-pointer lg:hidden"}/>
            </div>
            <button type="button" onClick={clearFilter}  className="rounded-md px-2 py-1 my-2 translate-x-0 duration-300 btn-red hover:bg-red-200 hover:text-black"> Clear Filters </button>
            <form className='text-left' onSubmit={(e) => e.preventDefault()}>
                {/* search */}
                <input placeholder='search' type="text" name='text' onChange={updateFilter} value={text} className='rounded-md border-black w-full bg-sky-100 lg:text-base text-lg text-green-500 mt-3 py-1 px-2'/>
                <p className='pb-3 ' > type in small letters* </p>
                {/* categories */}
                <div className='text-left'>
                    <h1 className={darkMode ? "text-xl text-white" : "text-xl text-black"} > Categories </h1>  
                    <div className={darkMode? "text-white" : "text-black"} >
                    {categories.map((c, index) =>  {
                        return (
                            <>
                            <button key={index} type="button" className={`${category === c ? "underline text-green-600 transition-all text-lg delay-150" : "no-underline transition-all delay-150 text-base" }`} name="category" onClick={updateFilter}>{c}</button>
                            <br/>
                            </>
                        )
                    })}
                    </div>
                </div>
                <hr className={darkMode ? "my-3 border-white w-full" : "my-3 border-black w-full"} />
                {/* careLevel */}
                <div className='mt-2' >
                    <h1 className={darkMode ? 'mb-2 text-xl text-white' : 'mb-2 text-xl text-black'} > Care level </h1>
                    <select name="careLevel" value={careLevel} onChange={updateFilter} className={darkMode ? "bg-slate-800 text-white p-1 rounded-md" : "rounded-md bg-sky-100 text-black p-1"} >
                        {care.map((c, index) =>  {
                            return (
                                <option value={c} key={index} > {c} </option>
                                )
                            })}
                    </select>
                </div>
                {/* price range */}
                <div className={darkMode ? 'mt-4 text-white flex flex-col lg:w-fit w-9/12' : 'mt-4 text-black flex flex-col lg:w-fit w-9/12'} >
                    <label className='text-xl' > Select price range </label>
                    <input name="price" value={price} onChange={updateFilter} max={maxPrice} min={minPrice} className='mt-2' type="range"/>
                    <p className='py-2 text-lg' > {price} </p>
                </div>
                {/* free shipping */}
                <label className={darkMode ? 'text-white' : 'text-black'} >Shipping -</label>
                <div className={darkMode ? 'flex my-3 mb-10 text-white  items-center' : 'flex my-3 mb-10 text-black  items-center'} >
                    <h3 className='mr-5' htmlFor="shipping" > Free shipping </h3>
                    <input type="checkbox" onChange={updateFilter} checked={shipping} name="shipping"/>
                </div>
                <hr className={darkMode ? "my-3 mb-10 border-white w-full" : "my-3 mb-10 border-black w-full"} />
            </form>

        </div>
     </div>
    )
}

export default Filters