const Table = require("../Model/model.js");
const sendEmail = require("../sendEmail/send_email");
const User = require('../Model/user_model.js');


exports.addRow = async(req,res,next)=>{

   if(req.body.name=="" || req.body.email=="" || req.body.hobbies=="" || req.body.phoneNumber=="" || req.body.password===""){

    return (res.status(201).json({
      success:false,
      message:"All fields has to be filled correctly!"
    }))
   }
  //  console.log(req.user._id)
    const table = await Table.create(req.body);
    const user = await User.findOne({_id:req.user._id})
    await user.updateOne({$push:{table:table._id}})
    res.status(200).json({
        success:true,
        table,
        message: "Row created successfully",
    })

}

exports.Allrows = async(req,res,next)=>{
    
  const user = await User.findOne({_id:req.user._id})
  // console.log(user.table)
  const table = await Promise.all(user.table.map(id=>{
    // console.log(id)
    return Table.findById(id)
  }))

    res.status(200).json({
        success:true,
        message:"Table is here",
        table
    })
}

exports.updateRow = async(req,res,next)=>{

    let table = await Table.findById(req.params.id);
  
    if(!table){
  
      return ( res.status(404).json({
        success:true,
        message:"Row not found",
        
      })
      )
    }
    
    table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
  
    res.status(200).json({
      success: true,
      message:"Row updated successfully",
      table,
    })
  
  
  }



  exports.deleteRow = async (req, res, next) => {
    const table = await Table.findById(req.params.id);
   
    const user = await User.findOne({_id:req.user._id})
    await user.updateOne({$pull:{table:table._id}})
    if (!table) {
      return ( res.status(404).json({
        success:true,
        message:"Row not found",
        
      }))
    }
  
    
   
    await table.remove();
  
    res.status(200).json({
      success: true,
      message: "Row Deleted Successfully",
    });
  };




  exports.sendrow = async(req,res,next) =>{

   let email = req.body.email;
   
   let send= req.body.send;

  //  console.log(send)

  //  console.log(email)


  const message = `ROWS PRESENT IN JSON FORMAT :-  \n\n${(send)}`

  



  try{

    await sendEmail({

      email:email,
      subject:"Table rows (full stack table)",
      message,


    })
    console.log(send);
    res.status(200).json({
      success: true,
      message: `email sent to ${email} successfully`,
    });
  }catch(err){

    console.log(err);
  }

  }