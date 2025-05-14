import React from 'react';
import Loading from "../Components/Loading"
import { useThemeContext } from '../Context/themeContext';
import { useProductContext } from "../Context/ProductContext";
import {Link} from "react-router-dom"

const ListView = ({products}) => {

  const {darkMode} = useThemeContext()

    const {productsLoading: loading}  = useProductContext()
    if (loading) {
        return <Loading/>
    }

  return <div className='flex flex-col gap-6'>
    {products.map((product) => {
      return(
        <>
        <div className={darkMode ? 'flex effect shadow-lg rounded-md flex-col lg:flex-row justify-between items-start gap-6' : 'effect flex rounded-md bg-transparent flex-col lg:flex-row justify-between items-start gap-6'}>
          <img className='lg:w-4/12 w-full' src={product.photo}/>
          <div className='lg:w-8/12 w-full px-0 py-0'>
            <div className='flex flex-row mb-3 items-center justify-between'>
              <h1 className='text-2xl' > {product.name} </h1>
              <h1 className='text-xl' > Rs. {product.price} </h1>
            </div>
            <p className='text-xl' > {product.desc.substring(0, 400)}....... </p>
            <Link to={`/products/${product._id}`}>
              <button className='bg-green-700 text-white px-3 py-1 rounded-md shadow-md mt-4'> View Details <i className='pl-1 fas fa-chevron-right'/> </button>
            </Link>
          </div>
        </div>
        <hr className={darkMode ? "border-slate-50" : "border-gray-900"} />
        </>
      )
    })}
  </div>;
};

export default ListView;
