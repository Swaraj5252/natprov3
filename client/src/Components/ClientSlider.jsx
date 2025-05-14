import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../swiper.css';

// import required modules
import { Autoplay, Pagination } from 'swiper';
import { useThemeContext } from '../Context/themeContext';

const ClientsSlider = () => {

    const {darkMode} = useThemeContext()

    const data = [
    {
        name: "Sahil Mohopatra",
        email: "sahilmohopatra@gmail.com",
        image: "https://images.pexels.com/photos/775279/pexels-photo-775279.jpeg?auto=compress&cs=tinysrgb&w=600",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s a type specimen book."
    },
    {
        name: "Swaroop Gogate",
        email: "swaroopgogate@gmail.com",
        image: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=600",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s a type specimen book."
    },
    {
        name: "Manali Ghnagurde",
        email: "manalighangurde@gmail.com",
        image: "https://images.pexels.com/photos/4065181/pexels-photo-4065181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s a type specimen book."
    },
    {
        name: "Arnav Bose",
        email: "arnavbose@gmail.com",
        image: "https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&w=600",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s a type specimen book."
    },
    {
        name: "Hrithik Chakraborty",
        email: "hrithikchakraborty@gmail.com",
        image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s type specimen book."
    },
    {
        name: "Aryan Niar",
        email: "aryannair@gmail.com",
        image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s a type specimen book."
    }
]

  return (
    <>
      <Swiper
        breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },}}       
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 8500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
      >
        {data.map((item, index) => {
          const { image, message, name, email } = item;
          return (
            <SwiperSlide key={index} className={darkMode ? 'bg-gradient-to-t from-purple-800 to-pink-700 cursor-pointer rounded-md p-4 mb-10' : 'bg-gradient-to-t from-purple-400 to-pink-300 cursor-pointer rounded-md p-4 mb-12' }>
                   <p className='mb-8 min-h-[100px] text-[15px]'>{message}</p>
                    <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
                    <div className='w-14'>
                        <img className='mb-3 object-cover md:mb-0 h-16 w-28 rounded-full' src={image} alt={name} />
                    </div>
                    <div>
                        <div className='font-medium text-base'>{name}</div>
                        <div className='font-medium text-rose-600'>{email}</div>
                    </div>
                    </div>
                </SwiperSlide>
          );
        })}
      </Swiper>
    </>

  )
}

export default ClientsSlider