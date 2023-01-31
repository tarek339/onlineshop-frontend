import React from 'react';
import Total from '../components/Total';
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import {useNavigate} from 'react-router-dom';
import withRestriction from '../hoc/withRestriction';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

 function Cart(value) {
  const cart = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return  (
      <div>
      <div className="head">
        <Typography fontSize="26px" >Dein Einkaufswagen ist leer</Typography>
      </div>
      <Grid container justifyContent="center" marginTop="5em">
        <Total/>
      </Grid>
      </div>
    )
  }
    return (
      <div>
        <div className="head" style={{marginBottom:"5em"}}>
      <Typography fontSize="26px">Dein Einkaufswagen</Typography>
    </div>
    <div className='cart-container'>
      <div>
      <Grid container justifyContent="center" spacing={{ xs: 2, sm:3 }}>
      {cart.map((item, index) => {
        return(
          <Grid item xs={12} sm={3} md={3} key={item.product._id}>
          <CartItem
            key={index}
            id={item.product._id}
            image={item.product.image}
            name={item.product.name}
            price={item.product.price}
            quantity={item.quantity}
          />
          </Grid>
        )
      })}
      </Grid>

      <div className='total-container'>
      <Total/>
      <div className='button-container'>
      <button className="cart-button" onClick={ async () => {
        const res = await axios.delete("/cart/clear-cart")
        dispatch((setCart(res.data)))
      }}><DeleteOutlineIcon/></button>
      <button className="carts-button" onClick={() => navigate('/checkout')}>bezahlen</button>
      </div>
      </div>
      </div>
    </div>
      </div>
  )}

  export default withRestriction(Cart)