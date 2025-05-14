import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useLoginContext } from './Context/loginContext';
import Loading from "./Components/Loading"

import Home from "./Pages/Home"
import Login from './Pages/Login';
import Register from './Pages/Register';
import Products from './Pages/Products';
import AdminLogin from './Pages/AdminLogin';
import AdminPanel from "./Pages/AdminPanel"
import Error from './Pages/Error';
import SingleProduct from './Pages/SingleProduct';
import NewProduct from './Pages/NewProduct';
import AdminProductView from './Pages/AdminProductView';
import AdminSingleProduct from './Pages/AdminSingleProduct';
import AllUsers from './Pages/AllUsers';
import SingleUser from './Pages/SingleUser';
import AccountSettings from './Pages/AccountSettings';
import UserCart from './Pages/UserCart';
import Aos from "aos"
import 'aos/dist/aos.css';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';
import AdminOrderView from './Pages/AdminOrderView';
import SingleOrder from './Pages/SingleOrder';
import UserOrderView from './Pages/UserOrderView';
const App = () => {

  const {user,admin} = useLoginContext()

  const [spinner, setSpinner] = useState(true)

    useEffect(() => {
      setTimeout(() => setSpinner(false), 1000)
    }, [])

    useEffect(() => {
      Aos.init({
        once: true,
        duration: 1500,
        delay: 300,
      });
    }, [] );

    if (spinner) {
      return <Loading/>
    }


  return (
    !spinner && <Router>
      <Routes>
        <Route path="/" element={admin ? <AdminPanel/> : <Home/>}/>
        <Route path="/register" element={ admin && user ? <Error/> : <Register/> }/>
        <Route path="/login" element={admin && user ? <Error/> : <Login/>}/>
        <Route path="/adminLogin" element={admin && admin ? <Error/> : <AdminLogin/>}/>
        <Route path="/products" element={admin ? <AdminProductView/> : <Products/>}/>
        <Route path="/products/:id" element={admin? <AdminSingleProduct/> : <SingleProduct/>}/>
        <Route path='/allUsers' element={admin ? <AllUsers/> : <Error/>}/>
        <Route path="/newProduct" element={admin ? <NewProduct/> : <Error/>}/>
        <Route path='/account' element={user ? <AccountSettings/> : <Error/> }/>
        <Route path="/allUser/:id" element={admin ? <SingleUser/> : <Error/>}/>
        <Route path='/cart' element={user ? <UserCart/> : <Error/> }/>
        <Route path='/placeOrder' element={user ? <PlaceOrder/> : <Error/> }/>
        <Route path='/orders' element={user ? <Orders/> : <AdminOrderView/> }/>
        <Route path="/orders/:id" element={user ? <UserOrderView/> : <SingleOrder/>} />
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App