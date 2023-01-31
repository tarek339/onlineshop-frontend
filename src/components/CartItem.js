import React from 'react';
import { setCart } from '../redux/cartSlice';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const StyledButton = styled(Button)`
  border: none;
  background-color: white;
  color:black;
  font-size:22px;
    &:hover {
      background-color: transparent;
    }
  `
export default function CartItem({id, name, price, quantity=0}) {
  const dispatch = useDispatch()

  return (
    <div>
      <Card className='card' elevation={1} style={{marginBottom:"1em"}}>
        <CardContent>
          <div className='name-container'>
          <Typography 
            variant="h5" 
            component="div"
            gutterBottom 
            >
            {name}
          </Typography>
          </div>
          <Typography 
            variant="body2" 
            color="text.secondary"
            >
            {price.toFixed(2)} EUR
          </Typography>
        </CardContent>
        <CardActions>
          <StyledButton
           onClick={ async () => 
            {
             const res = await axios.post("/cart/item/decrement", {
              productId: id
            })
            dispatch((setCart(res.data)))
            }}>-</StyledButton>
            <Typography>{quantity}</Typography>
          <StyledButton
           onClick={ async () => {
             const res = await axios.post("/cart/item", {
              productId: id
            })
            console.log(res.data)
            dispatch((setCart(res.data)))
            }}>+</StyledButton>
        </CardActions>
        <CardActions>
          <button className='cart-button'
            onClick={ async () => {
               const res = await axios.post("/cart/item/delete", {
                productId: id
              })
              dispatch((setCart(res.data)))
            }}
          >
          <DeleteOutlineIcon fontSize="medium" />
          </button>
        </CardActions>
      </Card>
    </div>
  )
}