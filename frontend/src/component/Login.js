import React, { useEffect, useState } from 'react'
import {BsEyeFill} from 'react-icons/bs'
import {BsEyeSlashFill} from 'react-icons/bs'
import { toast } from 'react-toastify'
import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate()
    const token = Cookies.get('token');
    useEffect(()=>{
      if(token){
        navigate("/allrows")
      }
    },[])
    const[visible, setVisible] = useState(0)

    const [login, setLogin ]= useState({
        email:'',
        password:''
    })

    let value,name;
    const handleInput = (e)=>{
        name=e.target.name;
        value=e.target.value;
        setLogin({...login,[name]:value})
    }


    const submit= async(e)=>{

         e.preventDefault();

         const{email, password} = login

         const res = await fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email, 
              password
            })
           
        })

        const result = await res.json();
       

        if(result.success===true){
            toast.success(result.message)

            navigate("/allrows")
            

        }else{
            toast.error(result.message)
        }

    }

  return (
    <div >
      
      <form style={{ backgroundImage: 'linear-gradient( 135deg, #92FFC0 10%, #0b5661 100%)'}} className="form" method="POST">
           

            <label for="email" >Email  </label>
            <input  name="email" id="email" value={value} type="text"
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
            
            <input type="submit" className="submit" value="LOGIN" onClick={submit}/>
            <div className='already-registered'>Don't have an account?
            <Link to="/">
            <button>Register</button>
            </Link>
            </div>
        </form>
    </div>
  )
}

export default Login
