import React, {useState, useEffect} from 'react'
import { useThemeContext } from '../Context/themeContext'
import { useLoginContext } from '../Context/loginContext'
import axios from 'axios'

const CartCard = ({item}) => {
    const {user, dispatch} = useLoginContext()
    const {darkMode} = useThemeContext()
    const {name, image, price, plant, quantity, stock} = item
    const [real, setReal] = useState([])
    useEffect(() => {
        const getPlant = async () => {
            const res = await axios.get(`/product/${plant}`)
            setReal(res.data)
        }
        getPlant()
    }, [])
    console.log(real?.stock);
    const handleDelete = async () => {
        try {
            await axios.put(`/user/${user?._id}/removeCart`, {plant: item?.plant})
            const {plant} = item
            const updatedPlant = {stock: +real?.stock + +item?.quantity}
            await axios.put(`/product/${item?.plant}`, updatedPlant)
            console.log(updatedPlant);
            window.location.reload("")
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    const [add, setAdd] = useState(quantity)

        const decrease = () => {
            setAdd((oldAdds) => {
                let tempAdds = oldAdds - 1
                if (tempAdds < 1) {
                    tempAdds = 1
                }
                return tempAdds
            })
        }

        const increase = () => {
        setAdd((oldAdds) => {
            let tempAdds = oldAdds + 1
            if (tempAdds > stock) {
                tempAdds = stock
            }
            return tempAdds
        })
    }
    

    return <>
        <div key={item?.plant} className='flex justify-between flex-wrap lg:gap-9 gap-3'>
            <div className='flex items-start gap-4' >
                <img className='lg:w-32 lg:h-32 w-20 h-20 rounded-md' src={image}/>
                <div>
                    <a href={`/products/${item.plant}`} className='text-xl' > {item.name} </a> 
                    <h1 className='text-base'> Rs. {price} </h1>
                </div>
            </div>
            <div>
                <div className='text-xl flex flex-row items-center gap-5'>
                    <button className='border-2 bg-transparent px-2 py-1' onClick={decrease}>
                        <i className='fas fa-minus'/>
                    </button>
                    <h1 className='text-3xl' > {add} </h1>
                    <button onClick={increase} className='border-2 bg-transparent px-2 py-1' >
                        <i className='fas fa-plus' />
                    </button>
                    <h1> Rs. {price * add} /-</h1>
                </div>
            </div>
            <div className='flex pt-2 gap-4'>
            <i className="fa-solid fa-pen-to-square bg-blue-500 h-fit p-2 cursor-pointer"></i>
            <i onClick={handleDelete} className='fas fa-trash cursor-pointer bg-red-500 h-fit p-2'/>
            </div>
        </div>
        <div className='lg:relative my-2 lg:my-0 lg:-top-11 lg:text-right' > Added on {new Date(item?.createdAt).toDateString()} </div>
        <hr className={darkMode ? 'mb-4 border-white' : 'mb-4 border-black'} />
        </>
}

export default CartCard