import React, { useState } from 'react'
import { convertToUSD } from '@mieuteacher/meomeojs';
import { useDispatch } from 'react-redux';
import { cartsActions } from '../../stores/slices/cart.slice';

export default function CartItemLocal({ product }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantity)

    return (
        <div className='cart_content'>
            <div className='cart_image'>
                <img src={product?.img} alt='' />
            </div>
            <div className='cart_item'>
                <h1>{product?.name}</h1>
                <div className='cart_price'>
                    <div className='price'>
                        {/* <span>{convertToUSD(product?.price)}</span> */}
                        <span>{convertToUSD(product.price * product.quantity)}</span>
                    </div>
                    <div className='cart_count'>
                        <button
                            onClick={() => {
                                // if (Number(e.target.parentNode.querySelector(".quantity").innerText > 1)) {
                                //     e.target.parentNode.querySelector(".quantity").innerText =
                                //         Number(e.target.parentNode.querySelector(".quantity").innerText) - 1;
                                // }
                                if (quantity > 1) {
                                    setQuantity(quantity - 1)
                                    dispatch(cartsActions.updateItemInCart(
                                        {
                                            ...product,
                                            quantity: quantity - 1
                                        }
                                    ))
                                }

                            }}
                        >-</button>
                        <span style={{ padding: "5px" }} className="quantity">{quantity}</span>
                        <button onClick={() => {
                            setQuantity(quantity + 1)
                            dispatch(cartsActions.updateItemInCart(
                                {
                                    ...product,
                                    quantity: quantity + 1
                                }
                            ))
                            // e.target.parentNode.querySelector(".quantity").innerText =
                            //     Number(e.target.parentNode.querySelector(".quantity").innerText) + 1;
                        }}>+</button>
                    </div>
                    <div>
                        <i style={{ color: " #de7474", fontSize: "20px" }} class="fa-solid fa-trash"
                            onClick={() => dispatch(cartsActions.deleteItemInCart(product.productId))}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
