import React,{ useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import styles from "./styles/home.css";
import { Button, IconButton,TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { authContext } from '../contexts/authContext';
 function HomeComponent(){
    let navigate=useNavigate();
    const[meetingCode,setMeetingCode]=useState("");
    let handelJoinVideoCall=async()=>{
        navigate(`/${meetingCode}`);
    }
    return (
        <>
        <div className="navBar">
        <div style={{display:"flex",alignItems:"center"}}>
            <IconButton onClick={()=>{
                navigate("/history")
            }}>
                <RestoreIcon/>
            </IconButton>
            <p>History</p>
            <Button onClick={()=>{
                localStorage.removeItem("token")
                navigate("/auth")
            }}>
                Logout
            </Button>
            <h3>Apna Video call</h3>
        </div>
        </div>
        <div className="meetContainer">
            <div className="leftPanel">
                <div>
                    <h2>Providing Quality Video Call Just Like Quality Education</h2>
                <div style={{display:'flex',gap:'10'}}>
                      <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handelJoinVideoCall} variant='contained'>Join</Button>
                </div>
            </div>
        </div>
        <div className="rightPanel">
            <img srcSet='/logo3.png' alt=""/>
        </div>
        </div>
        </>
    )
}
export default withAuth(HomeComponent);