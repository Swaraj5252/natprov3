import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { useFilterProContext } from '../Context/FilterProContext'
import { useThemeContext } from '../Context/themeContext'

const Sort = () => {

    const {filteredProducts: products, gridView, setGridView, setListView, sort, updateSort} = useFilterProContext()
    const {darkMode} = useThemeContext()

    return (
        <div className='lg:w-full mx-auto px-3 py-4 flex flex-row flex-wrap justify-between items-center' >
            <div className='flex gap-3 items-center'>
                <i onClick={setListView} className={gridView ? "fas fa-bars p-2 effect" : "fas fa-bars effect p-2 bg-green-600 text-white"} />
                <div className={gridView ? "bg-green-600 effect text-white p-2 cursor-pointer" : " p-2 effect cursor-pointer"} >
                    <BsFillGridFill className="cursor-pointer" onClick={setGridView}  />
                </div>
            </div>            
            <p className='' > {products.length} Products found </p>
            <hr className='lg:w-7/12 w-0 bg-slate-900' />
            <div>
                <label htmlFor="sort" className='lg:relative hidden' > Sort </label>
                <select name="sort" id="sort" value={sort} onChange={updateSort} className={darkMode ? "bg-slate-800 rounded-md text-white p-1" : "rounded-md bg-sky-100 text-black p-1"} >
                    <option value="price-lowest"> price (low - high) </option>
                    <option value="price-highest"> price (high - low) </option>
                    <option value="name-a"> name (a-z) </option>
                    <option value="name-z"> name (z-a) </option>
                </select>
            </div>
        </div>
    )
}

export default Sort
