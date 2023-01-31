import React from 'react';
import {Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import withRestriction from '../hoc/withRestriction';
import { useSelector } from 'react-redux';


function UserProfile() {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate()

    return(
        <div>
            <div className="head">
                <Typography fontSize="26px">Profile</Typography>
            </div>
            <div className="section-container">
                <Typography fontSize="20px" style={{marginTop:"24px"}}>Vorname: {user.firstName}</Typography>
                <Typography fontSize="20px">Nachname: {user.lastName}</Typography>
                <Typography fontSize="20px">E-Mail: {user.email}</Typography>
                <Typography fontSize="20px">Straße: {user.street}</Typography>
                <Typography fontSize="20px">Hausnummer: {user.houseNumber}</Typography>
                <Typography fontSize="20px">PLZ: {user.zip}</Typography>
                <Typography fontSize="20px">Ort: {user.city}</Typography>
            
            <div className='button-container'>
                <button className="edit-button" onClick={() => navigate("/editprofile")}>bearbeiten</button>
                <button className="edit-button" onClick={() => navigate("/verification")}>E-Mail ändern</button>
            </div>
            </div>
        </div>
    )
}
export default withRestriction(UserProfile)