import { TextField, Alert, Snackbar, Typography  } from '@mui/material'
import axios from 'axios'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import withRestriction from '../hoc/withRestriction'
import { useDispatch } from 'react-redux'
import { addUser } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom'

function EditProfile() {
  const user = useSelector((state) => state.user.user)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [street, setStreet] = useState(user.street)
  const [houseNumber, setHouseNumber] = useState(user.houseNumber)
  const [zip, setZip] = useState(user.zip)
  const [city, setCity] = useState(user.city)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(user)
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
    <div className="sign-body">
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
        <Typography fontSize="26px">Profil bearbeiten</Typography>
        </div>

      <div className="form">
        <form onSubmit={(e) => {
            e.preventDefault() // prevents from reloading the page
            axios.put("/users", {
              firstName,
              lastName,
              street,
              city,
              houseNumber : + houseNumber,
              zip : + zip
            },)

            .then((res) => {
              console.log(user)
              dispatch(addUser(res.data))
              navigate("/profile")
            })
            .catch((err) => {
              console.log(err)
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
                label="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
    
            <TextField
                className="TextField-without-border-radius"
                margin="normal"
                size="small"
                color="warning"
                fullWidth
                label="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
                className="TextField-without-border-radius"
                margin="normal"
                size="small"
                color="warning"
                fullWidth
                label="Straße"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />

            <TextField
                className="TextField-without-border-radius"
                margin="normal"
                size="small"
                color="warning"
                fullWidth
                label="Hausnummer"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
            />

            <TextField
                className="TextField-without-border-radius"
                margin="normal"
                size="small"
                color="warning"
                fullWidth
                label="PLZ"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
            />

            <TextField
                className="TextField-without-border-radius"
                margin="normal"
                size="small"
                color="warning"
                fullWidth
                label="Ort"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button className="sign-button">speichern</button>
            <Typography style={{textAlign:"right"}}>* Pflichtfelder</Typography>
        </form>
        </div>
        </div>
  )
}

export default withRestriction(EditProfile)
