import React, { useState , useEffect } from 'react'
import {BsEyeFill} from 'react-icons/bs'
import {BsEyeSlashFill} from 'react-icons/bs'
import './form.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link ,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'


const Register = () => {

  const navigate = useNavigate()


  const token = Cookies.get('token');
  useEffect(()=>{
    if(token){
      navigate("/allrows")
    }
  },[])

    const[user, setUser]= useState({
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""
})

const [visible, setVisible] = useState(0)
    
    let name, value;
    const handleInput = (e)=>{
       name= e.target.name
       value= e.target.value
       setUser({...user,[name]:value});
    }


    const submit = async(e)=>{

        e.preventDefault();
        const { name,email,phoneNumber,password, confirmPassword} = user;
       

        if(password!==confirmPassword){
            toast.error("password not matched!!")
            
        }else{

         
        const res = await fetch("http://localhost:3001/",{
            method:"POST",
            
              headers: {  'Content-Type': 'application/json' },
              body: JSON.stringify({
          
                name,
                email, 
                phoneNumber,
                password
              })
             
          })

           const result = await res.json();
           const msg = result.message;
           if(result.success===true){
             
            const options = {
              expires:new Date(
                  Date.now() + 5*24*60*60*1000
              ),
              // httpOnly:false
              
          }
      
      //  Cookies.set('token', result.token,options)
            
             setUser({
               name:"",
               email:"",
               phoneNumber:"",
               password:""
              })

              
              
           toast.success(msg)
          
           let response = await fetch('http://localhost:3001/otp-sent');
           let data = await response.json();
           
           toast.success(data.message)
           
           navigate("/email-verification")
           
           }else{
            
            toast.error(msg);
           
           }
        }

        


    }

  return (
    <div  >

        <form style={{top:'50px', backgroundImage: 'linear-gradient( 102.1deg,  rgba(96,221,142,1) 8.7%, rgba(24,138,141,1) 88.1% )'}} className="form" method="POST">
            <label for="name" >Name  </label>
            <input  name="name" id="name" value={value} type="text"
            onChange={handleInput} />
            <br/>

            <label for="email" >Email  </label>
            <input  name="email" id="email" value={value} type="text"
            onChange={handleInput} />
            <br/>

            <label for="phone" >Phone Number  </label>
            <input  name="phoneNumber" id="phone"
            value={value}
             type="tel" 
             onChange={handleInput} />
            <br/>
            <lable for="password" style={{fontSize:'20px', fontWeight:'bold'}}> Password</lable>
            <div className='password-input'>
            <input name='password' id="password" value={value} type={visible===true?`text` :`password`} onChange={handleInput}
            ></input>
            <span onClick={()=>{
                setVisible(!visible)
             
            }}>{visible===true?<BsEyeFill/>:<BsEyeSlashFill/>}</span>
            </div>
            <lable for="confirmPassword" style={{fontSize:'20px', fontWeight:'bold'}}>Confirm password</lable>
            <div className='password-input'>
            <input name='confirmPassword' value={value} id="confirmPassword" onChange={handleInput} type={visible===true?`text` :`password`}
            ></input>
            <span onClick={()=>{
                setVisible(!visible)
               
            }}>{visible===true?<BsEyeFill/>:<BsEyeSlashFill/>}</span>
            </div>

           
            
            <input type="submit" className="submit" value="REGISTER" onClick={submit}/>
            <div className='already-registered'>Already registered? 
            <Link to="/login">
            <button>Log in</button>
            </Link>
           </div>
        </form>
        
    </div>
  )
}

export default Register
