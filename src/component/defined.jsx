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
    console.log(prod,'got')
    console.log('got',prodId);
    const temp = prod&&prod.filter(i=>i.productId===prodId);
    console.log('got2',value&&value.test)

    const id = match.params.id;
        const product = id &&value &&value.entities.find(x=>x['productId'] === id);
      if(product && descriptionRef.current ){
          descriptionRef.current.innerHTML=product.shortDescription
      }
    return (
        <div>

            <ul>
                <li>Product name:{product.productName}</li>
                <li>Product price:{product.price}</li>
                <li>Product stock:{product.inStock}</li>
                
                <li >Product description:<span ref={descriptionRef}></span></li>
                <li>Product Review Count:{product.reviewCount}</li>
                <li>Product Review Rating:{product.reviewRating}</li>

            </ul>
            <Link to="/">Home</Link>
        </div>
    );
}

export default Defined;