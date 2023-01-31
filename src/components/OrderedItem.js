import { createTheme, Divider, ThemeProvider, Typography } from '@mui/material'
import React from 'react'

let theme = createTheme()
theme.typography.h4 = {
  fontFamily: "'Roboto', Arial, Helvetica, sans-serif",
  fontSize: '2rem',
};

function OrderItem({ totalPrice, items, createdAt, taxes, nettoPrice, quantity}) {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Typography>Bestelldatum: {createdAt}</Typography>
      <br/>
        {items.map((item, index) => {
          return <div key={index}>
            <Typography variant='h4'>{item.product.name}</Typography>
            <Typography>Menge: {item.quantity}</Typography>
          </div>
        })}
        <br/>
        <Typography>Gesamtmenge: {quantity}</Typography>
        <br/>
        <Typography>Netto: {nettoPrice.toFixed(2)} EUR</Typography>
        <Typography>19% MwSt.: {taxes.toFixed(2)} EUR</Typography>
        <Typography style={{fontWeight:"bold"}}>Summe: {totalPrice.toFixed(2)} EUR</Typography>
        <Divider
          orientation="horizontal"
          />
      </ThemeProvider>
    </div>
  )
}
export default OrderItem