import {Typography, 
    Badge, 
    Grid,
    createTheme, 
    ThemeProvider,
  } from "@mui/material";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import React from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


let theme = createTheme()

theme.typography.h4 = {
fontFamily:"'Roboto', Arial, Helvetica, sans-serif",
fontSize: '1.5em',

};

export default function Menu() {
const getTotalQuantity = () => {
let total = 0
cart.forEach(item => {
  total += item.quantity
})
return total
}
const navigate = useNavigate()
const cart = useSelector((state) => state.cart.cartItems)
const user = useSelector((state) => state.user.user)
const dispatch = useDispatch()

return (
<div className="navbar">
  <Grid container justifyContent="space-between">
  <Grid item xs={6} sm={9} md={10}>
  <ThemeProvider theme={theme}>
  <Typography variant="h4">Online Shop</Typography>
  </ThemeProvider>
  </Grid>

  <Grid>
  {user && <HomeOutlinedIcon className='icons' fontSize="medium" onClick={ () => navigate("/")}/>}
  </Grid>
  <Grid>
  {user && <LocalMallOutlinedIcon className='icons' fontSize="medium" onClick={ () => navigate("/get-orders")}/>}
  </Grid>

  <Grid>
  {user && <Badge 
    badgeContent={getTotalQuantity()}
    showZero
    max={9}
    overlap='circular'
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
    color="warning">
  <ShoppingCartOutlinedIcon className='icons' fontSize="medium" onClick={() => navigate('/cart')}/>
  </Badge>}
  </Grid>

  <Grid>
  {user && <AccountCircleOutlinedIcon className='icons' fontSize="medium" onClick={() => {
    navigate("/profile")
  }}/>}
  </Grid>

  <Grid>
  {user &&  <LogoutSharpIcon className='icons' fontSize="medium" onClick={() => {
    localStorage.removeItem("token")
    dispatch(removeUser())
    navigate('/signin')
  }}/>}
  </Grid>

  <Grid>
  {!user && <LoginSharpIcon className='icons' fontSize="large" onClick={() => navigate("/signin")}>Log In</LoginSharpIcon>}
  </Grid>
  </Grid>  
</div>
)}