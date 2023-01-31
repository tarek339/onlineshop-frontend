import { Button } from '@mui/material'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <form onSubmit={ async (e) => {
        e.preventDefault()
        const result = await stripe.confirmPayment({
            //Instanz "Elements", die zur Erstellung des Zahlungselements verwendet wurde
            elements,
            redirect: "if_required"
          });
          console.log(result)
          const res = await axios.post("/orders")
          console.log(res.data)
          dispatch(clearCart())
          navigate("/")
    }}>
        <PaymentElement/>

        <Button type="submit">Pay and order</Button>
    </form>
  )
}

export default CheckOutForm