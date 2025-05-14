import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { useThemeContext } from '../Context/themeContext'
import main from "../images/plant2.png"
import feature_1 from "../images/feature-1.svg"
import feature_2 from "../images/feature-2.svg"
import feature_3 from "../images/feature-3.svg"
import ClientsSlider from '../Components/ClientSlider'

const Home = () => {

    const { darkMode } = useThemeContext()
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
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
            <Navbar />
            {showTopBtn &&
                <button data-aos="fade-up" onClick={scrollTop} className='fixed transition-all delay-300 bottom-5 right-6 py-2.5 px-4 rounded-full z-[100] text-2xl bg-green-500 text-white'>
                    <i className="fa-solid fa-chevron-up text-2xl"></i>
                </button>
            }
            <section className={darkMode ? "h-screen effect  bg-gray-900 w-full text-white" : "h-screen effect  w-full bg-white text-black"}>
                <div className='flex lg:flex-row relative top-20 flex-col-reverse items-center justify-center mx-auto w-11/12'>
                    {/* content */}
                    <div className='flex-1 flex-col text-center lg:text-left items-center lg:items-start'>
                        <h1 data-aos='fade-down' data-aos-delay='900' className='lg:text-3xl text-4xl ' >Grow your health, Grow your garden </h1>
                        <p data-aos='fade-down' data-aos-delay='1000' className='lg:text-xl text-xl my-6' > Get 20% off today with indoor plants and buy one get one free. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat. </p>
                        <div className='lg:justify-start justify-center items-center flex flex-wrap gap-10'>
                            {/* <button data-aos='fade-down' data-aos-delay='1100' className='
                            btn btn-purple hover:bg-white hover:text-green-500 text-xl p-3 mt-2'> Products <i className='pr-1 fas fa-leaf' /> </button> */}
                            <button data-aos='fade-down' data-aos-delay='1100' class="relative group px-8 mt-2 btn btn-purple
                                    before:absolute 
                                    before:inset-0 
                                    before:bg-green-600
                                    text-lg
                                    before:rounded-md
                                    before:scale-x-0
                                    before:origin-right
                                    before:transition
                                    before:duration-300
                                    hover:before:scale-x-100
                                    hover:before:origin-left">
                            <span class="relative uppercase text-base text-white"> Products <i className='pr-1 fas fa-leaf' /> </span>
                            </button>
                            <button data-aos='fade-down' data-aos-delay='1200' class="relative group px-8 mt-2 btn btn-white
                                    before:absolute 
                                    before:inset-0 
                                    before:bg-green-600
                                    text-lg
                                    before:rounded-md
                                    before:scale-x-0
                                    before:origin-right
                                    before:transition
                                    before:duration-300
                                    hover:before:scale-x-100
                                    hover:before:origin-left">
                            <span class="relative uppercase text-base text-black">More Info <i className='pr-1 fas fa-lightbulb' /></span>
                            </button>
                        </div>
                    </div>
                    {/* image */}
                    <div data-aos='fade-up' data-aos-delay='1300' className='flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10'>
                        <img className='w-5/6 h-5/6 lg:w-4/5 lg:h-5/6 md:w-full md:h-full' src={main} alt='main-img' />
                    </div>
                </div>
                <div data-aos='fade-down' data-aos-offset="120" data-aos-delay='600' className='top-48 right-0 h-52 w-2/4 hidden md:block overflow-hidden bg-green-500 rounded-l-full absolute'></div>
            </section>
             <section className={darkMode ? 'dark-ab text-white py-10 ease-in-outout transition-all delay-200 h-full lg:bg-fixed effect bg-scroll bg-center bg-f bg-cover ' : 'py-16 light-about effect ease-out transition-all delay-200 h-full bg-center bg-cover lg:bg-fixed bg-scroll bg-no-repeat' } >
            <div className='lg:w-10/12 w-11/12  mx-auto' >
                <div data-aos='fade-down' data-aos-delay='100' className='text-center py-3 pb-10'>
                <h1 className='text-2xl line' > About Us </h1>
                </div>
                {/* features */}
                <div className='flex flex-col my-10 gap-14'>
                    {/* first feature */}
                    <div className='flex lg:flex-row mx-auto lg:w-full flex-col-reverse gap-5 lg:gap-10 items-center lg:justify-between'>
                    {/* text */}
                    <div data-aos='fade-right' data-aos-offset='120'  className='lg:w-8/12 w-full z-10'>
                        <h3 className={darkMode ? 'mb-2 text-teal-400 underline' : 'mb-2 text-teal-700 underline'} >Skill-set</h3>
                        <h1 className='mb-2 text-left font-bold text-xl' > Why choose us? </h1>
                        <p className='mb-3 text-base lg:text-left text-justify lg:text-lg' > Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain </p>
                        {/* <button className='bg-gradient-to-r hover:from-yellow-400  hover:to-pink-500 from-pink-500 to-yellow-500 text-gray-100 transition-all ease-linear delay-200  sm:w-4/12 lg:mx-0 mx-auto lg:w-max cursor-pointer  px-4 py-1.5 rounded-full shadow-sm shadow-blue-500 text-base'>
                        Learn More <i className='fa-solid fa-arrow-right'/>
                        </button> */}
                        <button class="relative group overflow-hidden px-6 py-3 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600">
                        <span class="relative text-sm text-white">Get Started</span>
                        <div class="flex items-center -space-x-3 translate-x-3">
                            <div class="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        </button>
                    </div>
                    <div className='hidden effect lg:block overflow-hidden trial rounded-r-full absolute h-64 w-9/12 -left-40'></div>
                    {/* image */}
                    <div data-aos='fade-left' data-aos-offset='120' className='lg:w-4/12 w-full mx-auto'>
                        <img className='w-full' src={feature_1}/>
                    </div>
                    </div>
                    <hr className={darkMode ? "my-3 border-white lg:w-0 w-full" : "my-3 border-black lg:w-0 w-full"} /> 
                    {/* second feature */}
                    <div className='flex lg:flex-row-reverse lg:w-full mx-auto flex-col-reverse gap-5 lg:gap-28 items-center lg:justify-between'>
                    {/* text */}
                    <div data-aos='fade-left' data-aos-offset='120' className='lg:w-6/12 w-full z-10'>
                        <h3 className={darkMode ? 'mb-2 text-teal-400 underline' : 'mb-2 text-teal-700 underline'} > Productive </h3>
                        <h1 className='mb-2 font-bold text-xl' > Good Presentation </h1>
                        <p className='mb-3 text-lg' > Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain </p>
                        <button class="relative group overflow-hidden px-6 py-3 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600">
                        <span class="relative text-sm text-white">Get Started</span>
                        <div class="flex items-center -space-x-3 translate-x-3">
                            <div class="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        </button>
                    </div>
                    {/* image */}
                    <div data-aos='fade-right' data-aos-offset='120' className='lg:w-5/12 w-full mx-auto'>
                        <img className='w-full' src={feature_2}/>
                    </div>
                    <div className='hidden effect lg:block overflow-hidden trial rounded-l-full absolute h-64 w-7/12 right-0'></div>
                    </div>
                    <hr className={darkMode ? "my-3 effect border-white lg:w-0 w-full" : "my-3 effect border-black lg:w-0 w-full"} /> 
                    {/* third feature */}
                    <div className='flex lg:flex-row mx-auto lg:w-full flex-col-reverse gap-5 lg:gap-10 items-center lg:justify-between'>
                    {/* text */}
                    <div data-aos='fade-right' data-aos-offset='120' className='lg:w-8/12 w-full z-10'>
                        <h3 className={darkMode ? 'mb-2 text-teal-400 underline' : 'mb-2 text-teal-700 underline'} >Team</h3>
                        <h1 className='mb-2 text-xl font-bold' > We have best Team! </h1>
                        <p className='mb-3 text-lg' > Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain </p>
                        <button class="relative group overflow-hidden px-6 py-3 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600">
                        <span class="relative text-sm text-white">Get Started</span>
                        <div class="flex items-center -space-x-3 translate-x-3">
                            <div class="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        </button>
                    </div>
                    <div className='hidden dropshadow-xl shadow-black lg:block overflow-hidden trial rounded-r-full absolute h-64 w-9/12 -left-40'></div>
                    {/* image */}
                    <div data-aos='fade-left' data-aos-offset='120' className='lg:w-4/12 w-full mx-auto'>
                        <img className='w-full' src={feature_3}/>
                    </div>
                    </div>
                </div>
        </div>
        </section>
        <section className={darkMode ? 'h-full dark-ab text-white pt-14 effect' : 'h-full light-about effect text-black relative pt-14'} >
            <div className='lg:w-10/12 w-11/12 mx-auto mb-40 rounded-lg'>
                <div  className={darkMode ? "bg-purple-900 max-h-96 rounded-md py-4" : " max-h-96 rounded-md py-4  bg-purple-400"}>
                <div className='text-center'>
                <h2
                    className='text-3xl font-bold mb-6'
                    data-aos='fade-up'
                    data-aos-offset='100'
                    data-aos-delay='200'
                >
                    What our clients say
                </h2>
                <p
                    className='max-w-2xl px-2 lg:px-0 mx-auto mb-12 lg:mb-24'
                    data-aos='fade-up'
                    data-aos-offset='300'
                    data-aos-delay='200'
                    >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                    provident deleniti. Eius soluta uisquam ex, nam dolor excepturi
                    id accusamus.
                </p>
                </div>
                {/* slider */}
                <div className='w-11/12 mx-auto mb-10' data-aos='fade-up' data-aos-delay="400" >
                <ClientsSlider />
                </div>
            </div>
            </div>
            <div className='my-3 text-center'>
                <h1 className='line lg:text-2xl text-lg mt-8' > View Our Plans </h1>
            </div>
            <div className='lg:px-0 px-5 py-5 grid lg:grid-cols-3 gap-6 mx-auto lg:w-10/12 '>
                {/* 1st card */}
                <div data-aos="fade-down" data-aos-delay="100">
                <div className={darkMode ? 'effect text-center bg-gray-900 shadow-sm shadow-gray-400 rounded-lg  py-4' : 'effect text-center shadow-sm shadow-gray-800 bg-white rounded-lg px-0 py-4' }>
                    <h1 className={darkMode ? 'text-white font-bold text-xl effect underline' : 'text-gray-800 effect font-bold text-xl underline'} > Free-Plan </h1>
                    <h1 className='text-xl my-2' > $ 0 </h1>
                    <div className={darkMode ? 'text-left flex my-2 text-green-500 flex-col gap-4 effect px-20' : 'text-left my-2 text-green-800 effect flex flex-col gap-4 px-20'}>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Free Reading  </p>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> 10+ Publish  </p>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Unlimited Access </p>
                        <p className='flex items-center gap-3' > <i class="fa-solid fa-circle-xmark"></i> Free Download  </p>
                    </div>
                    <button className={darkMode ? 'bg-transparent effect border-2 text-green-600 border-white px-3 py-1 my-2 rounded-3xl text-lg' : 'bg-transparent effect my-2 border-2 border-black text-green-600 px-3 py-1 rounded-3xl text-lg'}> Using Free Version </button>
                    <br/>
                    <button className={darkMode ? 'bg-white effect my-3 rounded-2xl text-green-600  px-3 py-1 text-lg' : 'bg-transparent border-2 effect border-black my-3 effect rounded-3xl bg-green-400 text-black px-3 py-1 text-lg'}> View More Option </button>
                </div>
                </div>
                {/* 2nd card */}
                <div data-aos="fade-down" data-aos-delay="300">
                <div className={darkMode ? 'text-center shadow-sm effect shadow-gray-400 bg-gray-900 rounded-lg  py-4' : 'text-center effect bg-white shadow-sm shadow-gray-800 rounded-lg px-0 py-4' }>
                    <h1 className={darkMode ? 'text-white font-bold text-xl effect underline' : 'text-gray-800 font-bold effect text-xl underline'} > Lite-Version </h1>
                    <h1 className='text-xl my-2' > $ 10 </h1>
                    <div className={darkMode ? 'text-left my-2 flex effect text-green-500 flex-col gap-4 effect px-20' : 'text-left my-2 effect text-green-800 effect flex flex-col gap-4 px-20'}>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Free Reading  </p>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> 100+ Publish  </p>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Unlimited Access </p>
                        <p className='flex items-center gap-3' > <i class="fa-solid fa-circle-check"></i> Lifetime Access  </p>
                    </div>
                    <button className={darkMode ? 'bg-transparent effect border-2 text-green-600 border-white px-3 py-1 my-2 rounded-3xl text-lg' : 'bg-transparent effect my-2 border-2 border-black text-green-600 px-3 py-1 rounded-3xl text-lg'}> Use Lite Version </button>
                    <br/>
                    <button className={darkMode ? 'bg-white effect my-3 rounded-2xl text-green-600  px-3 py-1 text-lg' : 'bg-transparent border-2 effect border-black my-3 effect rounded-3xl bg-green-400 text-black px-3 py-1 text-lg'}> View More Option </button>
                </div>
                </div>
                {/* 3rd card */}
                <div data-aos="fade-down" data-aos-delay="500">
                <div className={darkMode ? 'text-center shadow-sm shadow-gray-400 effect bg-gray-900 rounded-lg  py-4' : 'text-center effect shadow-sm bg-white shadow-gray-800  rounded-lg px-0 py-4' }>
                    <h1 className={darkMode ? 'text-white font-bold effect text-xl underline' : 'text-gray-800 effect font-bold text-xl underline'} > Pro-Version </h1>
                    <h1 className='text-xl my-2' > $ 30 </h1>
                    <div className={darkMode ? 'text-left my-2 flex text-green-500 flex-col gap-4 effect px-20' : 'text-left my-2 text-green-800 effect flex flex-col gap-4 px-20'}>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Free Reading  </p>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Umnlimited Publish  </p>
                        <p className='flex items-center gap-3' > <i className="fa-solid fa-circle-check"></i> Unlimited Access </p>
                        <p className='flex items-center gap-3' > <i class="fa-solid fa-circle-check"></i> Lifetime Access  </p>
                    </div>
                    <button className={darkMode ? 'bg-transparent effect border-2 text-green-600 border-white px-3 py-1 my-2 rounded-3xl text-lg' : 'bg-transparent effect my-2 border-2 border-black text-green-600 px-3 py-1 rounded-3xl text-lg'}> Use Pro Version </button>
                    <br/>
                    <button className={darkMode ? 'bg-white effect my-3 rounded-2xl text-green-600  px-3 py-1 text-lg' : 'bg-transparent border-2 effect border-black my-3 effect rounded-3xl bg-green-400 text-black px-3 py-1 text-lg'}> View More Option </button>
                </div>
                </div>
            </div>
        </section>
        {/* FAQ section */}
        <section className={darkMode ? "dark-ab text-white h-full p-4 effect" : "h-full light-about effect text-black p-4"}>
            <div className='sm:w-3/4 lg:w-8/12 mx-auto py-5 px-2'>
                <h1 className={darkMode ? "text-3xl effect lg:text-3xl text-center text-green-500" : "text-3xl effect lg:text-3xl text-center text-green-900"}> Frequently Asked Questions. </h1>
                <p className={darkMode ? "text-center effect text-gray-100 mt-4" : "text-center effect text-gray-800 mt-4"}>Here are some most asked FAQ's which will clear your doubt and you will understans more about this amazing extension </p>
            </div>
            <div data-aos="fade-down" className='flex flex-col gap-5 mx-auto my-10 lg:w-7/12 w-full px-1 lg:px-0'>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>What about chromium and brave browser?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>What about chromium and brave browser?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>What about chromium and brave browser?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>What about chromium and brave browser?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>Are there any accessories which come with plants?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>Are there any accessories which come with plants?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
                <div className='flex justify-between px-0.5 my-7 items-center border-b'>
                    <h1>Are there any accessories which come with plants?</h1>
                    <i className='fas fa-chevron-down' />
                </div>
            </div>
        </section>
        <section className={darkMode ? "dark-ab effect text-white h-full p-4" : "h-full effect light-about text-black p-4"} >
            <div data-aos="fade-up" className='container'>
                <div className='sm:w-3/4 lg:w-2/4 my-6 mx-auto'>
                    <p className='font-light uppercase text-center mb-8'> 45,000+ people already joined </p>
                    <h1 className='text-3xl text-center'>Stay up to date with what we are doing</h1>
                    <div className='flex flex-col sm:flex-row gap-6 mt-8'>
                        <input type="text" placeholder='Enter your email address' className='focus:outline-none flex-1 px-2 py-3 rounded-md text-black' />
                        {/* <button className='btn btn-purple hover:bg-white hover:text-green-500 text-xlb p-6 ' type='button'>contact us</button> */}
                        <button class="relative group overflow-hidden px-6 h-12 btn-purple rounded-md">
                            <div aria-hidden="true" class="transition duration-300 group-hover:-translate-y-12">
                                <div class="h-12 flex items-center justify-center">
                                    <span class="text-white">Contact </span>
                                </div>
                                <div class="h-12 flex items-center justify-center">
                                    <span class="text-white">Contact</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    <Footer />
    </>
    )
}

export default Home