import React from 'react';
import Loading from "../Components/Loading"
import { useThemeContext } from '../Context/themeContext';
import { useProductContext } from "../Context/ProductContext";
import { Link } from 'react-router-dom';

const GridView = ({products}) => {
  
  const {darkMode} = useThemeContext()

    const {productsLoading: loading}  = useProductContext()
    if (loading) {
        return <Loading/>
    }


  return <div className={darkMode? "w-full effect lg:w-full mx-auto grid gap-12 lg:grid-cols-3 sm:grid-cols-1 sm:grid-col-2" : "effect w-11/12 lg:w-full mx-auto grid gap-16 lg:grid-cols-3 sm:grid-cols-1 sm:grid-col-2"} >
    {products.map((product) => {
      return(
       <div className={darkMode ? "lg:rounded-t-md lg:rounded-b-md shadow-md bg-slate-800" : "lg:rounded-t-md rounded-b-md shadow-md bg-slate-50"}>
         <img src={product.photo} className='object-cover lg:rounded-t-md w-full h-80' alt={product.name}/>
         <div className='flex items-center p-2 shadow-lg justify-between'>
           <Link to={`/products/${product._id}`}>
            <h1> {product.name} </h1>
           </Link>
           <h1> Rs. {product.price} </h1>
         </div>
      </div>
      )
    })}
  </div>;
};

export default GridView;
