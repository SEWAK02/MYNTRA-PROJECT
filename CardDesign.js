import React from 'react'
import './CardDesign.css'
const CardDesign = (props) => {
    return (
        <>
              <div className= "cards">
        <div className = "card" style = {{width:"200px"}}>
          <img src ={props.img} alt = "mypic" className = "card_img" />
          <div className = "card_info">
          <h6 className = "card_title">{props.product}</h6>
          <p className = "card_text">{props.brand}
          <div className= "size">{props.sizes}</div>
          <span className = "price">Rs.{props.price}</span>
          <span className = "mrp">Rs.{props.mrp}</span>
          <span className = "discount">{props.dis}</span></p>
            <a href = " " className = "btn btn-success butt" >
            Add to Cart
     </a>
    </div>
  </div>
    </div> 
        </>
    )
}

export default CardDesign
