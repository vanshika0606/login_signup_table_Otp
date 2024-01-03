import React from 'react'
import './acc.css'
import img1 from './images/img1.png'

const Card = (props) => {
  return (
    <div className='card'>
        <img src={props.img}/>
        <p>{props.info}</p>

        <h5>TYPE: ACCOMMODATION</h5>

        <div>Book Now</div>
      
    </div>
  )
}

export default Card
