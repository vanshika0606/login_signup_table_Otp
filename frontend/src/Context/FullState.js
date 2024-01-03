import react, { useState } from "react";
import FullContext from "./FullContext";

const FullState = (props)=>{
    const [add, setAdd]= useState(0)
    const [id, setId] = useState("")
    const[send, setSend] = useState([]);
    const[sendbutton , setSendbutton] = useState(0);
    const[submitform , setSubmitform] = useState(0);
    const [updateRow, setUpdateRow] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        hobbies: "",
      });

      const [update, setUpdate] = useState(0);
      
    


    return (
        <FullContext.Provider value={{
            add , setAdd, 
            id, setId, 
            send, setSend,
            sendbutton, setSendbutton,
            submitform, setSubmitform,
            updateRow, setUpdateRow,
            update, setUpdate
            }}>


           {props.children}
        </FullContext.Provider>
    )

}

export default FullState
