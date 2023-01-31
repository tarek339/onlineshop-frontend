import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../redux/userSlice'
import { Alert, Snackbar, TextField, Typography } from '@mui/material'

function EditEmail() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function changeEmail(e) {
        e.preventDefault()
        try {
            const response = await axios.put("/users/edit-email", {email},)
            console.log(response.data)
            dispatch(addUser(response.data))
            navigate("/profile")
        } 
        catch (err) {
            console.log(err)
            handleClick(
                setMessage(err.response.data.message)
            )
        }
    }

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
        <Typography fontSize="26px">E-Mail bearbeiten</Typography>
        </div>

        <div className="form">
        <form onSubmit={changeEmail}>
        <TextField
              className="TextField-without-border-radius"
              margin="normal"
              size="small"
              color="warning"
              fullWidth
              label="* E-Mail"
              placeholder='Type in your new E-mail'
              onChange={(e) => {setEmail(e.target.value)}}
              autoFocus
            />
            <button className="sign-button" type='submit'>speichern</button>
            <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
        </form>
        </div>
    </div>
  )
}

export default EditEmail