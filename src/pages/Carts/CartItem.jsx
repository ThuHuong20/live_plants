import React, { useState } from 'react'
import { convertToUSD } from '@mieuteacher/meomeojs';

export default function CartItemLocal(props) {

    return (
        <div className='cart_content'>
            <div className='cart_image'>
                <img src={props.product?.img} alt='' />
            </div>
            <div className='cart_item'>
                <h1>{props.product?.name}</h1>
                <div className='cart_price'>
                    <div className='price'>
                        {/* <span>{convertToUSD(props.product?.price)}</span> */}
                        <span>{convertToUSD(props.product.price * props.product.quantity)}</span>
                    </div>
                    <div className='cart_count'>
                        <button
                            onClick={() => {
                                props.handleUpdateCart(2, props.product.id)
                            }}
                        >-</button>
                        <span style={{ padding: "5px" }} className="quantity">{props.product.quantity}</span>
                        <button onClick={() => {
                            props.handleUpdateCart(1, props.product.id)
                        }}>+</button>
                    </div>
                    <div>
                        <i style={{ color: " #de7474", fontSize: "20px" }} class="fa-solid fa-trash"
                            onClick={() => {
                                props.handleUpdateCart(3, props.product.id)
                            }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
