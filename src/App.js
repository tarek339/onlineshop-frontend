import './App.css';
import Cart from './pages/Cart';
import ProductListing from './pages/ProductListing';
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import NavBar from './components/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { addUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import EditProfile from './pages/EditProfile';
import Verification from './pages/Verification';
import EditEmail from './pages/EditEmail';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import InputEmail from './components/InputEmail';
import { setCart } from './redux/cartSlice';
import CheckOut from './pages/CheckOut';
import NotFound from './pages/NotFound';
import OrderedProducts from "./pages/OrderedProducts"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const emailVerified = useSelector((state) => state.user.user?.emailVerified)
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    // Abrufen der Userdaten
    axios.get("/users/profile")
    .then( (res) => {
      dispatch(addUser(res.data)) // speichern der user im state
      setLoading(false)
    })
    .catch(() => {
      dispatch(addUser(null)) // wenn user nicht eingelogt ist
      setLoading(false)
    })
}, [dispatch])   

// Abrufen Einkaufswagendaten vom User
useEffect(() => {
  axios.get("/cart")
    .then((res) => {
      console.log(res.data)
      dispatch(setCart(res.data))
    })
    .catch(() => {
      dispatch(addUser(null))
      setLoading(false)
    })
}, [dispatch, user])

if(loading) {
  return(
    <Grid container justifyContent="center">
      <p>Laden...</p>
    </Grid>
  )
}
  return (
    <div className="app">
      <NavBar/>
      {(user && emailVerified) || !user?
    <Routes>
      <Route exact path='/' element={<ProductListing />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
      <Route path="/verification" element={<Verification/>}/>
      <Route path="/edit-email" element={<EditEmail/>}/>
      <Route path="/confirm-email" element={<InputEmail/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/get-orders" element={<OrderedProducts/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>:<Typography>Bitte verifiziere deine E-Mail</Typography>}
    <Routes>
      <Route path="/verify-email" element={<VerifyEmail/>}/>
    </Routes>
    </div>
  )
}

export default App;