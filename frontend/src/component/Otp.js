import React, { useState } from 'react'
import './form.css'
import  OTPInput from "otp-input-react";
import { toast ,ToastContainer } from 'react-toastify';
import {Link ,useNavigate} from 'react-router-dom'

const Otp = () => {

  const[otp,setOtp] = useState("")
  const navigate = useNavigate()

  const submit = async(e)=>{
    e.preventDefault();
    // let oo=otp
  
    let response = await fetch('http://localhost:3001/email-verification',{
      method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
          
               otp
              })

    });
    
    let data = await response.json();
    console.log(data)

    if(data.success==true){
       toast.success(data.message)
        navigate("/allrows")
    }
    else{
      toast.error(data.message)
    }
    setOtp("")

  }

  const resendOtp = async()=>{

    let response = await fetch('http://localhost:3001/otp-sent');
    let data = await response.json();
    toast.success(data.message)
  }

  return (
    <div style={{ margin:'auto',padding:'2rem 3rem', background: 'linear-gradient(to right, #000000, #0f9b0f)'}} className='form'>
    <div >
      <div style={{color:'white', fontSize:"1.5rem", fontWeight:'bold',paddingBottom:'20px'}} >Please check your mail for OTP</div>
      <div style={{fontSize:'1rem', fontWeight:'bold', color:'white', paddingBottom:'0.5rem'}}>Check spam if not visible in inbox</div>
      <label style={{color:'white'}}>Enter OTP</label>
      
      <div style={{paddingTop:'10px'}} className='otp-input'>
        {/* <input type="number"></input>
        <input type="number"></input>
        <input type="number"></input>
        <input type="number"></input>
        <input type="number"></input> */}

<OTPInput   autoFocus OTPLength={5} value={otp} onChange={setOtp} otpType="number" disabled={false} />
      </div>
      <div style={{cursor:'pointer', float:'right', padding:'10px 0px', color:'white', fontWeight:'bold'}} onClick={resendOtp}> resend Otp?</div>
      <input style={{cursor:'pointer', backgroundImage: 'radial-gradient( circle farthest-corner at 50.7% 54%,  rgba(204,254,152,1) 0%, rgba(229,253,190,1) 92.4% )', fontWeight:'bold'}} type="submit" value="Next" onClick={submit}></input>
     
    </div>
    </div>
  )
}

export default Otp;
