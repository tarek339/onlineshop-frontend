import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product'
import { Grid, Typography } from '@mui/material'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function Home() {
  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])
  const keys= ["name", "description"]
  const [loadItems, setLoadItems] = useState(4)

  const fetchData = async () => { await axios
    .get(`/products`)
    .then( res => {
        setProducts(res.data)
        setProductsCopy(res.data)
        
    })
    .catch((err) => {
        console.log("Err", err) 
    })
    }
    useEffect(() => {
    fetchData()
    }, [])

  const onSearch = (value) => {
      const newSearch = productsCopy.filter(
        (product) =>
          keys.some(
          (key) => product[key]
          .toLowerCase()
          .includes(value.toLowerCase())
          )
      );
  if(value.length > 2){
    setProducts(newSearch)
  }
  if(!value) {
    setProducts(productsCopy)
    }
  }

  function handleClick() {
    setLoadItems((more) => more + 4)
  }

  return (
    <div>
      <div className="head">
        <Typography fontSize="26px">Produktauswahl</Typography>
      </div>
      <div className='listing-container'>
      <div className='search-bar'>
        <input
          autoFocus
          type="search"
          placeholder="Produktsuche"
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      
      {products.length === 0 ? 
        <div className='not-found'>
          <Typography variant='h4'>No products found...</Typography>
        </div>
       :
      <Grid container justifyContent="center" spacing={{ md:3 }}>
      {products.slice(0,loadItems).map((value) => {
        return(
          <Grid item xs={12} sm={6} md={3} key={value._id}>
            <Product
              id={value._id}
              image={value.image}
              name={value.name}
              description={value.description}
              quantity={value.quantity}
              price={value.price}
              taxes={value.taxes}
            />
          </Grid>
      )
      })}
      </Grid>}
      {products.length === 0 ?
      null
      :
      <div className='load-more-div'>
      <button 
        className='load-more-button' 
        onClick={handleClick}
      ><KeyboardDoubleArrowDownIcon fontSize='medium'/></button>
      </div>}
      </div>
    </div>
  )
}