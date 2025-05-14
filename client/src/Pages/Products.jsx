import React, {useEffect, useState} from 'react'
import AllProducts from '../Components/AllProducts'
import Filters from '../Components/Filters'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import {useThemeContext} from "../Context/themeContext"

const Products = () => {

    const {darkMode} = useThemeContext()
    const [showTopBtn, setShowTopBtn] = useState(false);
      useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }


    return (
        <>
            <Navbar/>
            {showTopBtn &&
                <button onClick={scrollTop} className='fixed transition-all delay-300 px-4 py-2 z-[100] text-2xl bg-green-600 text-white rounded-3xl bottom-16 lg:bottom-3 right-2'>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            }
            <section className={darkMode ? "relative effect top-12 lg:top-14 text-white bg-black w-full min-h-screen h-full" : "min-h-screen relative effect top-14 text-black bg-white w-full h-full"} >
                <div className='flex lg:flex-row h-full md:flex-row flex-col w-full'>
                    <Filters/>
                    <AllProducts/>
                </div>
            {/* <Footer/> */}
            </section>      
        </>
    )
}

export default Products
