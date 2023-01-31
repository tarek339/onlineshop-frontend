import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import withRestriction from '../hoc/withRestriction'
import axios from 'axios';
import OrderedItem from "../components/OrderedItem"

function OrderedProducts() {
    const [orders, setOrders] = useState([])
    const fetchData = async () => { await axios
      .get('/orders')
      .then( res => {
        console.log(res.data)
        setOrders(res.data)
      })
      .catch((err) => {
          console.log("Err", err)
      })
      }
      useEffect(() => {
      fetchData()
      }, [])

  return (
    <div>
      <div className="head">
        <Typography fontSize="26px">Verlauf Bestellungen</Typography>
      </div>
      <div className="section-container">
      {orders.map((order, index) => {
          return <OrderedItem
          key={index}
          createdAt={order.createdAt}
          totalPrice={order.totalPrice}
          items={order.items}
          taxes={order.taxes}
          nettoPrice={order.nettoPrice}
          />
        })}
      </div>
    </div>
  )
}

export default withRestriction(OrderedProducts)