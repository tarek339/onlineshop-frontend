import React, {useState} from 'react'
import { Typography, TextField } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function ForgotPassword() {
const [password, setPassword] = useState("")
const [search] = useSearchParams()

const navigate = useNavigate()
  return (
    <div>
        <div className="head">
        <Typography fontSize="26px">Forgot Password</Typography>
        </div>
        <form onSubmit={(e) => {
            e.preventDefault()
            axios.put("/users/forgot-password", {
                password,
                token: search.get("token")
            })
            .then(() => {
                navigate('/signin')
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
        }}>
            <TextField
            className="TextField-without-border-radius"
            margin="normal"
            size="small"
            color="warning"
            fullWidth
            label="* New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Change password</button>
            <Typography style={{textAlign:"right"}}>* required text fields</Typography>
        </form>
    </div>
  )
}