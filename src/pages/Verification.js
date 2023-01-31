import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Snackbar, TextField, Typography  } from '@mui/material'

function Verification() {
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

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

    async function verifyPassword(e){
      e.preventDefault()
        try {
            const response = await axios.post("/users/verify-password", {password})
            console.log(response.data)
            navigate("/edit-email")
        } 
        catch (err) {
            console.log(err)
            handleClick(
                setMessage(err.response.data.message)
            )
        }
    }
  return (

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
        <Typography fontSize="26px">Bestätige dein Passwort</Typography>
        </div>
        
        <div className="form">
        <form onSubmit={verifyPassword}>
        <TextField
            className="TextField-without-border-radius"
            margin="normal"
            fullWidth
            size="small"
            color="warning"
            label="* Passwort"
            placeholder='enter your password'
            type="password"
            onChange={(e) => {setPassword(e.target.value)}}
            autoFocus
            />
        <button className="sign-button" onClick={verifyPassword}>bestätigen</button>
        <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
        </form>
        </div>
    </div>
  )
}

export default Verification