import React from 'react'
import '../assets/checkoutProduct.css'
import { useStateValue } from '../StateProvider'

function CheckoutProduct({ id, image, title, price, rating }) {
    const [{basket} ,dispatch]  = useStateValue();
    const removFromBasket = () => {
        // remove the item from basket 
        dispatch ({
            type :'REMOVE_BASKET',
            id:id,
            
        })
    }
    return (
        <div className='chekoutProduct'>
            <img className='checkoutProduct_image' src={image} alt="image" />
            <div className='checkoutProduct_info'>
                <p className='checkoutProduct_title'>{title}</p>
                <p className='checkoutProduct_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkProduct_rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}

                </div>
                <button onClick={removFromBasket}>Remove from basket</button>

            </div>
        </div>
    )
}

export default CheckoutProduct