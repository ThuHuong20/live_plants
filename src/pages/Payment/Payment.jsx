import React from 'react'
import './Payment.scss'
export default function Payment() {
    return (
        <div className='payment_container'>
            <div className='payment_input'>
                <div className='input'>
                    <h1>Live Plants</h1>
                    <h2>Shipping address</h2>
                    <input type='text' placeholder='First Name' /><br />
                    <input type='text' placeholder='Last Name' /><br />
                    <input type='text' placeholder='Email' /><br />
                    <input type='text' placeholder='Address' />
                </div>
            </div>
            <div className='payment_total'>
                <div className='payment_img'>
                    <div>
                        <img src='../image/largeplant/plan2.webp' alt='' />
                    </div>
                    <div>
                        <h5>largeplant</h5>
                        <p>Price</p>
                    </div>
                    <div>
                        <p>Subtotal</p>
                        <p>total</p>
                    </div>
                    <div>
                        <h2>Total</h2>
                        <p>price</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
