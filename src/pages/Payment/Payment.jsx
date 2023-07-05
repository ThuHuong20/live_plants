import React, { useEffect, useState } from 'react'
import './Payment.scss'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '@stores/slices/product.slice'
export default function Payment() {
    const PaymentPage = () => {
        const [cartItem, setCartItem] = useState([])
        const dispatch = useDispatch()
        const productStore = useSelector(store => store.productStore)
        const userLoginStore = useSelector(store => store.userLoginStore)
        useEffect(() => {
            dispatch(productActions.searchProductById())
        }, [])

    }
    return (
        <div>
            <div className="shipping">
                <div className="form-group">
                    <h2>Information</h2>
                    <div className="form-groupInput" >
                        <input
                            id="name"
                            className="form-group-input"
                            type="text"
                            placeholder="Name"
                        />
                        <br />
                        <input
                            id="phone"
                            className="form-group-input"
                            type="text"
                            placeholder="Phone Number"
                        />
                        <br />
                        <input
                            id="address"
                            className="form-group-input"
                            type="text"
                            placeholder="Address"
                        />
                        <br />
                    </div>
                    <div className="shippingDetails">
                        <p>Payment methods</p>
                        <input type="radio" name="payment" defaultValue="COD" />
                        Pay on delivery
                        <br />
                        <input type="radio" name="payment" defaultValue="ATM" />
                        Express checkout
                        <br />
                        <div className="shippingDetails_button">
                            <button>Shop Pay</button>
                            <button>PayPal</button>
                            <button>G Pay</button>
                        </div>
                    </div>
                    <button className="form-group-checkout">Check Out</button>
                    <p className="validate-email" />
                </div>
                <div className="informationLine">
                    <div className="informationLine_product">
                        <img src='../image/Orchid/Orchid1.webp' />
                        <div className="informationLine_text">
                            <h4>teen san pham</h4>
                            <p>Price</p>
                        </div>
                    </div>
                    <div className="informationLine_total">
                        <h3>Total:</h3>
                        <span>Price</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
