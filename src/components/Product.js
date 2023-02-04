import React from 'react';
import { useDispatch } from 'react-redux';
import {  setCart } from '../redux/cartSlice';
import { Card, 
         CardActions, 
         CardContent, 
         CardMedia, 
         Typography
        } from '@mui/material';
import axios from 'axios';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function Item({id, name, description, image, quantity, price }) {
  const dispatch = useDispatch()

  return (
    <div>
      <Card className='card' elevation={0} style={{marginBottom:"1em"}}>
        <CardMedia
          component="img"
          image={image}
          height="150px"
          alt="product image"
        />
        <CardContent>
          <Typography 
            variant="h5" 
            component="div"
            gutterBottom 
            >
            {name}
          </Typography>
        <div className='description-container'>
          <Typography 
            variant="body2" 
            color="text.secondary"
            >
            {description}
          </Typography>
        </div>
          <br/>
          <Typography 
            variant="body2" 
            color="text.secondary"
            >
            {quantity} Stk.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            >
            {price.toFixed(2)} EUR
          </Typography>
        </CardContent>
        <CardActions>
          {quantity > 0 ?
            <button className='cart-button'
            onClick={async () => {
            const res = await axios.post("/cart/item", {
              productId: id
            })
            console.log(res.data)
            dispatch((setCart(res.data)))
          }
          }><AddShoppingCartOutlinedIcon fontSize='medium'/>
          </button>:<Typography>ausverkauft</Typography>}
        </CardActions>
      </Card>
    </div>
  )
}