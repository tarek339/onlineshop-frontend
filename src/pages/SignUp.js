import React, { useState } from "react";
import { TextField, 
         Typography, 
         Alert, 
         Snackbar
        } from "@mui/material";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [street, setStreet] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Snackbar Funktion
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

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

    return(
        <div>
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

        <div className="head">
        <Typography fontSize="26px" >
          Registrieren oder 
        <button className="button" onClick={() => navigate('/signin')} >Anmelden</button>
        </Typography>
        </div>

        <div className="form">
        <form onSubmit={(e) => {
            e.preventDefault()
            axios.post("/users/signup", {
                firstName,
                lastName,
                email,
                password,
                street,
                houseNumber : +houseNumber,
                zip : +zip,
                city
            })
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
              label="* Vorname"
              color="warning"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
            />
       
            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* Straße"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* Hausnummer"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />

            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* PLZ"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />

            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              fullWidth
              size="small"
              color="warning"
              label="* Ort"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="sign-button" type="submit">Registrieren</button>
            <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
        </form>
        </div>
        </div>
    )
}