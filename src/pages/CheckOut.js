import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import withRestriction from '../hoc/withRestriction'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from '../components/CheckOutForm';
import { Grid, Typography } from '@mui/material';

const stripePromise = loadStripe('pk_test_51LxuKOLC3UmUHQtdP18hJjDio2eHc33LNnlFToMxZB1IoEGKkatvttP1Et6Bq9s1jsFj7IaMbus4EyeftShFqvLG001Ox4z6kr');

function CheckOut() {
    const cart = useSelector((state) => state.cart.cartItems)
    const [secret, setSecret] = useState(null)


  const getTotal = () => {
    let totalPrice = 0
    cart.forEach(item => {
      totalPrice += item.product.price * item.quantity
    })
    return totalPrice
  }

  async function getPaymentIntent() {
    try {
        const res = await axios.post("payment-intent", {amount: getTotal().toFixed(2)})
    console.log(res.data)
    setSecret(res.data)
    } catch (error) {
        console.log(error.message)
    }
    
  }
  useEffect(() => {
    getPaymentIntent()
  })



  if(!secret) {
    return(
      <Grid container justifyContent="center">
        <p>Laden...</p>
      </Grid>
    )  
  }

  return (
    <div>
      <div className="head">
        <Typography fontSize="26px">Bezahlung</Typography>
      </div>
      <div className="form" style={{marginTop:"2em"}}>
        <Elements stripe={stripePromise} options={{
            clientSecret: secret
          }}>
            <CheckOutForm/>
        </Elements>
      </div>
    </div>
  )
}

export default withRestriction(CheckOut)