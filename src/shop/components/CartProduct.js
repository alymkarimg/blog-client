import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';

import CartItem from './CartItem';
// 

const CartProducts = () => {

    const { cartItems } = useContext(CartContext).cart;

    useEffect(() => {

    }, [cartItems])

    return ( 
        <div>
            <div className="card card-body border-0">

                {
                    cartItems.map(product =>  <CartItem key={product._id} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CartProducts;