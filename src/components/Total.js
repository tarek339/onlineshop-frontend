import React from 'react';
import {useSelector} from 'react-redux';
import { Typography } from '@mui/material';

export default function Total() {

  const cart = useSelector((state) => state.cart.cartItems)

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    let nettoPrice = 0
    let taxes = 0
    cart.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.product.price * item.quantity
      nettoPrice = totalPrice / 119 * 100
      taxes = totalPrice / 119 * 19
    })
    return {taxes, totalPrice, totalQuantity, nettoPrice}
     
  }

  return (
    <div>
      <Typography style={{fontSize:"24px", paddingBottom:"10px"}}>Rechnung</Typography>
      <Typography>Menge {getTotal().totalQuantity} Produkte</Typography>
      <Typography>Netto {getTotal().nettoPrice.toFixed(2)} EUR</Typography>
      <Typography>incl. 19% MwSt. {getTotal().taxes.toFixed(2)} EUR</Typography>
      <Typography style={{fontWeight:"bold"}}>Summe {getTotal().totalPrice.toFixed(2)} EUR</Typography>
    </div>
  )
}