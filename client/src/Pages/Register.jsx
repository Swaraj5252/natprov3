import {useState} from 'react'
import Navbar from '../Components/Navbar'
import {useThemeContext} from "../Context/themeContext"
import axios from 'axios'
const Register = () => {

    const {darkMode} = useThemeContext()
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/register", {
            username, email, password
        })
            res.data && window.location.replace("/login")
            console.log(res)
        } catch (error) {
            setError(true) 
        }
    }

    return (
        <>
        <Navbar/>
        <section className={darkMode ? "h-screen bg-gray-900 text-white w-full" : "h-full w-full bg-white text-black"}>
            <div className='relative m-auto flex sm:flex-row flex-col lg:w-9/12 lg:top-20 top-24'>
                {/* form */}
                <div className={darkMode ? "lg:px-10 px-4 lg:py-12 py-28 lg:w-9/12 w-11/12 mx-auto bg-sky-900 text-white" : "lg:px-10 px-4 lg:w-9/12 lg:py-12 py-28 w-11/12 mx-auto bg-sky-50 text-black"}>
                    <form onSubmit={handleSubmit} >
                        <h1 className='text-3xl mb-3 text-center'> Register </h1>
                        
                        <div className='mb-7' >
                            <label>Username *</label>
                            <input 
                                type="text" required
                                className='w-full rounded-md text-black px-2 py-1 text-1xl'
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='mb-7' >
                            <label>Email Id*</label>
                            <input
                                 type="text" required 
                                 className='w-full text-black rounded-md px-2 py-1 text-1xl'
                                 onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password *</label>
                            <input
                                type="password" required 
                                className='w-full text-black rounded-md px-2 py-1 text-1xl'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='btn btn-purple mt-4'>Register</button>
                        {error ? <p className='text-red-600 mt-3'>Something went wrong</p> : null}
                        <p className='mt-4' > Already have a account ? <a href='/login' className='text-blue-600' > Login </a> </p>
                    </form>
                </div>
                <div className='rss lg:block md:block hidden py-32 px-32 lg:w-5/12'>
            </div>
            </div>
        </section>
      </>
    )
}

export default Register
