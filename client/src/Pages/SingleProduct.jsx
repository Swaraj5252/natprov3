import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useLocation } from 'react-router-dom';
import { useThemeContext } from '../Context/themeContext';
import { useLoginContext } from '../Context/loginContext';
import Navbar from "../Components/Navbar"
import AddToCart from '../Components/AddToCart';
import Footer from '../Components/Footer';

const SingleProduct = () => {

    const location = useLocation()
    const [plant, setPlant] = useState({})
    const [relatedPlants, setRelatedPlants] = useState([])
    const {darkMode} = useThemeContext()
    const {user} = useLoginContext()
    const path = location.pathname.split("/")[2]
    const commentRef = useRef()
    const [error, setError] = useState(false)

    useEffect(() => {
        const getPlant = async () => {
            const res = await axios.get("/product/" + path)
            setPlant(res.data)
        }
        const getRelatedProducts = async () => {
            const res = await axios.get("/product/category/" + path )
            setRelatedPlants(res.data)
        }
        getPlant()
        getRelatedProducts()
    }, [path])

    const handleComment = async (e) => {
        e.preventDefault()
        setError(false)
        try {
            const res = await axios.post(`/product/${plant._id}/reviews`, {
                comment: commentRef.current.value, user: user._id, name: user.username
            }) && window.location.reload()
            console.log(res);
        } catch (err) {
            setError(err)
        }
    }

  return <>
    <Navbar/>
    <section className={darkMode ? "relative effect h-full lg:top-14 top-12 bg-black text-white" : "relative effect lg:top-16 top-12 text-black h-full bg-white"} >
        <>
        <div className='py-7 lg:mt-0 mt-0 lg:px-12 px-6' >
            <a href='/products' className='bg-green-500 text-white rounded-md shadow-md px-3 py-2'>Go Back <i className='fas fa-arrow-right'/> </a>
        </div>
        <div className='flex flex-col lg:gap-10 gap-4 pt-0 pb-4 justify-between items-start lg:flex-row w-11/12 mx-auto'>
            {/* image */}
            <div className='w-full lg:w-2/5'>
                <img className='w-full' src={plant.photo} alt={plant.name}/>
            </div>
            {/* text content */}
            <div className='lg:w-3/5 py-2 w-full'>
                <div className='flex flex-row justify-between items-center'>
                    <h1 className='text-2xl' > {plant.name} </h1>
                    <h1 className='text-xl'> Rs. {plant.price} </h1>
                </div>
                <hr className={darkMode ? "border-white my-2 effect" : "border-slate-900 effect my-2"} />
                <h3 className='text-lg text-left' > {plant.desc} </h3>
                <div className='flex flex-row mt-3 items-center gap-5'>
                    <div className='text-xl' >
                        <h1>Category - </h1>
                        <h1>Care level - </h1>
                        <h1>Available - </h1>
                    </div>
                    <div className='text-lg' >
                        <h1> {plant.category} </h1>
                        <h1> {plant.careLevel} </h1>
                        <h1> {plant.stock > 1 ? "In stock": "Currently not available"} </h1>
                    </div>
                </div>
                <hr className={darkMode ? "border-white effect my-2" : "border-black effect my-2"} />
                {plant.stock > 1 ? <AddToCart product={plant} /> : <h1 className='text-xl' >Sorry! currently this product is out of stock</h1> }
            </div>
        </div>
        {/* comments */}
        <div className='w-11/12 py-3 mx-auto'>
            <h1 className='text-3xl mb-1 text-green-700'>Reviews....</h1>
            <form >
                <textarea type="text" ref={commentRef} className='w-full bg-sky-200 text-black mb-4 px-3 py-2 rounded-lg' placeholder='Add your thoughts....'/>
                {error ? <h1>Something went wrong!</h1>: null}
                {user ? 
                <button onClick={handleComment} className='btn btn-purple'> <i className="fas fa-comment"></i> Comment </button>
                : <h1 className='text-xl bg-green-400 px-2 py-0.5 w-fit rounded-md '>Login to comment</h1> }
            </form>
            {console.log(plant.reviews)}
            <div className='flex flex-col my-4 gap-4'>
                {plant.reviews?.length === 0 ? <h1>No reviews on this product yet...</h1> : null}
                {plant.reviews?.map((review) => (
                        <div key={review.name} className={darkMode ? 'px-4 py-2 rounded-md shadow-md w-full bg-slate-800 text-white' : 'px-4 py-2 rounded-md shadow-md w-full bg-slate-300'}>
                            <h1 className='lg:no-underline underline' > {review.name} </h1>                            
                            <p > {review.comment} </p>
                            <h1 className='text-right' > {new Date(review.createdAt).toLocaleDateString()} </h1>
                        </div>
                ))}
            </div>
            {/* Related Products Section */}
            <div className="w-full">
                <div className='flex justify-between items-center'>
                <h1 className='text-lg lg:text-2xl'> Products related to this item </h1>
                <h1 className='lg:text-lg' > {relatedPlants.length} plants found </h1>
                </div>
            <hr className={darkMode ? 'w-full mb-3 border-white' : 'w-full  border-black'} />
            </div>
            <div className='grid gap-12 lg:grid-cols-4 sm:grid-cols-1 sm:grid-col-2 my-7'>
            {relatedPlants.map((product) => (
                <div className={darkMode ? "rounded-t-md effect shadow-md bg-slate-800" : "rounded-t-md effect shadow-md bg-slate-50"}>
                    <img src={product.photo} className='object-cover rounded-t-md w-full h-80' alt={product.name}/>
                    <div className='flex items-center p-2 shadow-lg justify-between'>
                    <Link to={`/products/${product._id}`}>
                        <h1> {product.name} </h1>
                    </Link>
                    <h1> Rs. {product.price} </h1>
                    </div>
                </div>
            ))}
            </div>
        </div>
        </>
    <Footer/>
    </section>
  </>
};

export default SingleProduct;
