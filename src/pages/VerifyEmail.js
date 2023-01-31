import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addUser } from '../redux/userSlice'

export default function VerifyEmail() {
    const [search] = useSearchParams()
    console.log(search.get("token"))
    const dispatch = useDispatch()
    const navigate = useNavigate()
useEffect(() => {
    axios.post("/users/verify-email", {token: search.get("token")})
    .then((res) => {
        console.log(res.data)
        dispatch(addUser(res.data))
        navigate("/")
    })
    .catch((err) => {
        console.log(err)
    })
}, [search, dispatch, navigate])
  return (
    <div>VerifyEmail</div>
  )
}