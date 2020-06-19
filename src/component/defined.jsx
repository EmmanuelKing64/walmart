import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../store';
import { Link } from "react-router-dom";

function Defined({history,location,match,prod,prodId}) {
    const {value,dispatch} = useContext(AppContext);
    const descriptionRef = useRef(null);
    useEffect(()=>{
        console.log('history',history,location,match);
          dispatch({type:"ACTION",payload:'yes'});
          console.log('Product',value,product)
    },[])

    const id = match.params.id;
        const dataProducts = value &&value.entities;
        const productItems = dataProducts &&dataProducts.products;
        const product = id&& productItems && productItems.find(x=>x['productId'] === id);
      if(product && descriptionRef.current ){
          descriptionRef.current.innerHTML=product.shortDescription
      }
    return (
        <div>

            <ul>
                <li>Product name:{product.productName}</li>
                <li>Product price:{product.price}</li>
                <li>Product stock:{product.inStock?'Available':'Unavailable'}</li>
                
                <li >Product description:<span ref={descriptionRef}></span></li>
                <li>Product Review Count:{product.reviewCount}</li>
                <li>Product Review Rating:{product.reviewRating}</li>

            </ul>
            <Link to="/">Home</Link>
        </div>
    );
}

export default Defined;