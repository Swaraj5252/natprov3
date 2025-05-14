import React, {useState} from 'react';
import AdminNav from "../Components/AdminNav"
import {MdFilterListAlt} from "react-icons/md"
import {BsPlusLg} from "react-icons/bs"
import AdminSideBar from "../Components/AdminSideBar"
import { useThemeContext } from '../Context/themeContext';
import {useAdminFilterProContext} from "../Context/AdminFilterContext"
import {getUniqueValue} from "../getUnique"
import { Link } from 'react-router-dom';

const AdminProductView = () => {

  const {darkMode, adminSideBar} = useThemeContext()
  const {filteredProducts: products, allProducts, sort, updateSort, filter: {text, careLevel, minPrice, maxPrice, price, shipping}, updateFilter, clearFilter} = useAdminFilterProContext()
  const [filter, setFilter] = useState(false)
  const care = getUniqueValue(allProducts, "careLevel")
  const onTop = () => {
   window.scrollTo({
            top: 0,
            behavior: "smooth",
    });
  };
  return <>
    <AdminNav/>
    <section className={darkMode ? "relative top-14 bg-gray-900 text-white": "relative top-14 bg-white text-black"} >
      <div className='flex sm:flex-col flex-row w-full' >
        <div className={adminSideBar === true ? "transition-all delay-200 lg:w-10/12 w-full": "w-full transition-all delay-200"} >
          <div className='px-4 py-4 flex flex-col gap-6'>
            <button 
              className={filter ? 'bg-green-600 mx-2 text-2xl fixed bottom-2 lg:left-2 right-2 text-white w-fit px-4 py-2 hidden cursor-pointer' : 'rounded-3xl cursor-pointer bg-green-600 mx-2 text-2xl fixed bottom-2 lg:left-2 right-2 text-white w-fit px-3 py-3 block'}
              onClick={() => filter ? setFilter(false) : setFilter(true)}
            > <MdFilterListAlt /> </button>
            <a href='/newProduct'
              className='rounded-3xl cursor-pointer bg-green-600 mx-2 text-2xl fixed lg:bottom-2 lg:left-20 bottom-20 right-2 text-white w-fit px-3 py-3 block' >
                <BsPlusLg/>
            </a>
            {/* filter */}
            <div className={filter ? "lg:flex-row flex-col" : "hidden"}>
              <i onClick={() => setFilter(false)} className='fas fa-times cursor-pointer text-xl text-right py-2 px-2'/>
              <form onSubmit={(e) => e.preventDefault()} >
                <div className='flex gap-3 justify-between my-2 flex-row items-center flex-wrap'>
                 <input name='text' value={text} onChange={updateFilter} className='bg-sky-200 text-black w-full lg:w-2/12 my-2 text-lg px-2 py-1 rounded-md' type="text" placeholder='search...'/>
                  <div>
                    <label className='text-lg mr-2' >Carelevel</label>
                    <select name="careLevel" value={careLevel} onChange={updateFilter} className='bg-sky-200 text-black shadow-none rounded-md px-2 py-1' >
                      {care.map((c, index) => {
                        return <option key={index} value={c}> {c} </option> 
                      })}
                    </select>
                  </div>
                  <div>
                    <label className='text-lg mr-2'>Categories</label>
                    <select className='bg-sky-200 text-black shadow-none rounded-md px-2 py-1' name="category" onChange={updateFilter}>
                      {care.map((c, index) => {
                        return <option key={index} value={c}> {c} </option> 
                      })}
                    </select>
                  </div>
                  <div className='flex items-center gap-3' >
                    <label className='text-lg' >Price range</label>
                    <input name='price' value={price} max={maxPrice} min={minPrice} onChange={updateFilter} type="range"></input>
                    <p> {price} </p>
                  </div>
                  <button onClick={clearFilter} className='bg-red-500 text-white px-2 py-1 w-fit h-fit rounded-md'>Clear filters</button>
                </div>
              </form>
              <hr className={darkMode ? "border-white bg-white my-1" : "border-black my-1"} />
            </div>
            {/* sort */}
            <div className="mb-3">
              <div className='flex lg:flex-row items-center justify-between'>
                <h1 className='text-xl' > {products.length}  products found </h1>
                <hr className={darkMode ? 'border-white transition-all delay-100 lg:w-8/12 w-0': 'transition-all delay-100 border-black lg:w-8/12 w-0'} />
                <div className='flex' >
                  <label className='text-xl lg:flex hidden' >Sort</label>
                  <select name='sort' value={sort} onChange={updateSort} className='bg-sky-200 ml-2 text-black rounded-md px-2 py-1' >
                    <option value="price-lowest" >price (low - high)</option>
                    <option value="price-highest" >price(high - low)</option>
                    <option value="stock-lowest" > stocks(low - high) </option>
                    <option value="stock-highest" > stocks(high - low) </option>
                    <option value="name-a" > name(a-z) </option>
                    <option value="name-z" > name(z-a) </option>
                  </select>
                </div>
              </div>
            </div>
            {products.map((product) => {
              return(
                <>
                <div key={product._id} className='flex lg:flex-row flex-col gap-6 w-full m-auto'>
                  <img className='lg:w-3/12 w-full' src={product.photo} alt={product.name}/>
                  <div className='lg:w-9/12 w-full'>
                    <div className='flex justify-between items-center'>
                      <h1 className='text-2xl' > {product.name} </h1>
                      <h1 className='text-xl' > Rs.{product.price} </h1>
                    </div>
                    <p className="text-xl my-3 text-justify" > {product.desc.substring(0, 300)}........... </p>
                    <div className='flex mb-3 gap-2 items-center'>
                      <div className="text-lg" >
                        <h1> Category </h1>
                        <h1> Carelevel </h1>
                        <h1> Stock</h1>
                      </div>
                      <div className='text-lg' >
                        <h1> {product.category} </h1>
                        <h1> {product.careLevel} </h1>
                        <h1> {product.stock} </h1>
                      </div>
                    </div>
                    <a href={`/products/${product._id}`} className='bg-green-600 text-white text-lg rounded-md shadow-md px-2 py-1'> Know More </a>
                  </div>
                </div>
                 <hr className={darkMode ? "border-white" : "border-black"} />
                </>
              )
            })}
          </div>
        </div>
        <AdminSideBar/>
      </div>
    </section>
  </>
};

export default AdminProductView;
