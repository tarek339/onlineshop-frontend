import React, { useState } from "react";
import { Alert, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // Snackbar Funktion
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const handleClick = () => {
      setOpen(true);
    };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
  }
  setOpen(false)
  }
  //
  
  return (
      <div>
      <div className="head">
      <Typography fontSize="26px">Anmelden oder
        <button 
        className="button" 
        onClick={() => navigate('/signup')}>Registrieren</button>
      </Typography>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
      }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert variant="filled" severity="error">{message}</Alert>
      </Snackbar>
      
      <div className="form">
      <form onSubmit={(e) => {
          e.preventDefault()
          axios.post("/users/signin", {email, password})
          .then((res) => {
              console.log(res.data)
              localStorage.setItem("token", res.data.token)
              dispatch(addUser(res.data.user))
          })
          .then(() => {
              navigate('/')
          })
          .catch((err) => {
              console.log(err.response.data.message)
              handleClick(
                  setMessage(err.response.data.message)
              )
              
          })
      }}>
          <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            color="warning"
            fullWidth
            label="* E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            color="warning"
            fullWidth
            label="* Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="sign-button" 
            type="submit">Anmelden</button>
          <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
          <Typography 
            className="forgot-password"  
            onClick={() => navigate("/confirm-email")}>Passwort vergessen</Typography>
      </form>
      </div>
      </div>
  )
}