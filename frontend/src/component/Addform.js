import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullContext from '../Context/FullContext';

import './form.css';

const Addform = () => {

  const store = useContext(FullContext)

const navigate = useNavigate()
    const [table,setTable] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        hobbies:""
    })
    
let value , name;
    const handleInput=(e)=>{
      
        name= e.target.name;
      value=  e.target.value;
        
      setTable({...table,[name]:value});

    }

    const submit = async(e)=>{
          e.preventDefault();

          const {name,email,phoneNumber, hobbies} = table;

          const res = await fetch("http://localhost:3001/addrow",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
          
                name,
                email, 
                phoneNumber,
                hobbies
              })
             
          })
           const result = await res.json();
          
           if(result.success===true){
             
             store.setAdd(0);
             setTable({
              name:"",
              email:"",
              phoneNumber:"",
              hobbies:""
            })
            store.setSubmitform(1);
            toast.success("Row added successfully!");
            navigate("/allrows")
           }else{
            const msg = result.message;
            toast.error(msg);
           
           }
          
           
    }
  return (
    <div className='box-form' >

        <form className="form" method="POST">
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


            <label for="hobbies" >Hobbies  </label>
            <input  name="hobbies" id="hobbies" value={value} type="text"
            onChange={handleInput} required />
            <br/>

            
            <input type="submit" className="submit" value="ADD ROW" onClick={submit}/>
        </form>
        
    </div>
  )
}

export default Addform
