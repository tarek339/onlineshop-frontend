import React, {useState} from 'react'
import { Typography, TextField } from '@mui/material'
import axios from 'axios'

function InputEmail() {
    const [email, setEmail] = useState("")
  return (
    <div>
      <div className="head">
        <Typography fontSize="26px">Confirm E-Mail</Typography>
      </div>

      <div className="form">
        <form onSubmit={(e) => {
            e.preventDefault() // prevents from reloading the page
            axios.post("/users/forgot-password-email", {email})
            .then(() => {
                alert("check your inbox")
            })
            .catch((err) => {
                console.log(err)
            })
        }}>
            <TextField
              className="TextField-without-border-radius"
              margin="normal"
              size="small"
              color="warning"
              fullWidth
              label="* E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button" type="submit">Send E-Mail</button>
            <Typography style={{textAlign:"right"}}>* required text fields</Typography>
        </form>
      </div>
    </div>
  )
}

export default InputEmail