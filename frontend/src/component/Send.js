import React, { useState , useContext} from 'react'
import { toast } from 'react-toastify';
import FullContext from '../Context/FullContext';
import './form.css'

const Send = () => { 


const store = useContext(FullContext)
    
let send=[];


const[email, setEmail] = useState("")
const handleInput = (e)=>{
    let  value= e.target.value;
    setEmail(value)
}


const submit = async(e)=>{
    
    e.preventDefault();
    
    send.push(  store.send)
    
    
    const res = await fetch("http://localhost:3001/send" , {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
    },
    body: JSON.stringify({
      
     email ,

         send
    
      
    })
   
   });

 
        store.setSendbutton(false)
        toast.success("Sent to given mail successfully!")
    }

    

    
  return (
    <div className='box-form'>
      
     
      <form className='send-form'>
        <label for="email">Enter email</label>
        <input type="email" id="email" name="email" value={email} onChange={handleInput}/>
        <input type="submit" value="Send"  onClick={submit}  className='send-button'/>
      </form>
    </div>
  )
}

export default Send
