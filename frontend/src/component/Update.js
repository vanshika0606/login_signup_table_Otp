import React, { useContext } from 'react'
import "./form.css"
import { toast, ToastContainer } from 'react-toastify';
import FullContext from '../Context/FullContext';

import 'react-toastify/dist/ReactToastify.css';


const Update = () => {

  const store = useContext(FullContext)

    

    let value , name;
    const handleInput=(e)=>{
      
        name= e.target.name;
      value=  e.target.value;
        
      store.setUpdateRow({...store.updateRow,[name]:value});


    }

    const update = async(e)=>{
        const {name, phoneNumber,email,
            hobbies} = store.updateRow;

        e.preventDefault();

        const res = await fetch("http://localhost:3001/updaterow/" + store.id, {
            method:"PUT",
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
        store.setUpdate(0);
        toast.success("Row updated successfully!")

    }



  return (
    <div className='box-form'>
      <form  className="formm" method="PUT">
            <label for="name" >Name  </label>
            <input  name="name" id="name" value={store.updateRow.name} type="text"
            onChange={handleInput} />
            <br/>

            <label for="email" >Email  </label>
            <input  name="email" id="email" value={store.updateRow.email} type="text"
            onChange={handleInput} />
            <br/>

            <label for="phone" >Phone Number  </label>
            <input  name="phoneNumber" id="phone"
            value={store.updateRow.phoneNumber}
             type="tel" 
             onChange={handleInput}/>
            <br/>


            <label for="hobbies" >Hobbies  </label>
            <input  name="hobbies" id="hobbies" value={store.updateRow.hobbies} type="text"
            onChange={handleInput} />
            <br/>


            <input type="submit" value="UPDATE ROW" className='update' onClick={update}/>
        </form>
      
    
    </div>
  )
}

export default Update
