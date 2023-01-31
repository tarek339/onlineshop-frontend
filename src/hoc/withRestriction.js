import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function withRestriction(Component) {
    return () => {
        const user = useSelector((state) => state.user.user)
        const navigate = useNavigate()
        useEffect(() => {
            if (!user) {
                return navigate("/")
               }
        }, [navigate, user])
        if(!user) {

        return null
        }
        return (
        <>
        <Component/>
        </>
        )
    }
}

// export default withRestriction