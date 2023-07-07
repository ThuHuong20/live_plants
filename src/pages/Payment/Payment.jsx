import React, { useEffect, useState } from 'react'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import './Payment.scss'
import { useDispatch, useSelector } from 'react-redux';
import { convertToUSD, randomId } from '@mieuteacher/meomeojs';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd'
export default function Payment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartData, setCartData] = useState([]);
    const userLoginStore = useSelector(store => store.userLoginStore);
    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    }, [])
    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            if (localStorage.getItem("carts")) {
                setCartData(JSON.parse(localStorage.getItem("carts")))
            } else {
                navigate("/")
            }

        } else {
            if (userLoginStore.userInfor.carts.length == 0) {
                Modal.success({
                    content: 'Sucsses Checkout, Thankyou',
                });
                setTimeout(() => {
                    navigate("/receipts")
                }, 1000)
            } else {
                setCartData(userLoginStore.userInfor.carts)
            }
        }
    }, [userLoginStore.userInfor])

    function checkout(eventForm) {
        if (eventForm.target.userName.value == "" ||
            eventForm.target.userPhoneNumber.value == "" ||
            eventForm.target.userAddress.value == "") {
            alert('Please complete all information')
            return
        }
        let patchData = {
            userId: userLoginStore.userInfor.id,
            data: {
                carts: [],
                receipts: [{
                    receiptId: randomId(),
                    total: userLoginStore.userInfor.carts.reduce((value, nextItem) => {
                        return value + (nextItem.quantity * nextItem.price)
                    }, 0),
                    paid: true,
                    createDate: Date.now(),
                    customerInfor: {
                        name: eventForm.target.userName.value,
                        phoneNumber: eventForm.target.userPhoneNumber.value,
                        address: eventForm.target.userAddress.value
                    },
                    receiptDetail: [
                        ...userLoginStore.userInfor.carts
                    ]
                }, ...userLoginStore.userInfor.receipts]
            }
        }
        dispatch(userLoginActions.checkout(patchData))
    }
    return (
        <div>
            <div className="shipping">
                <form onSubmit={(eventForm) => {
                    eventForm.preventDefault();
                    // kiem tra login
                    if (userLoginStore.userInfor != null) {
                        checkout(eventForm)
                    } else {
                        Modal.warning({
                            content: 'Please login!',
                        });
                    }
                }} className="form-group">
                    <h2>Information</h2>
                    <div className="form-groupInput" >
                        <input
                            id="name"
                            className="form-group-input"
                            type="text"
                            placeholder="Name"
                            name="userName"
                        />
                        <br />
                        <input
                            id="phone"
                            className="form-group-input"
                            type="text"
                            placeholder="Phone Number"
                            name="userPhoneNumber"
                        />
                        <br />
                        <input
                            id="address"
                            className="form-group-input"
                            type="text"
                            placeholder="Address"
                            name="userAddress"
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
                            <img src='../image/banner/payment.png' />
                        </div>
                    </div>
                    <button type='submit' className="form-group-checkout" >Check Out</button>
                    <p className="validate-email" />
                </form>
                <div className="informationLine">
                    {cartData.map((product) =>
                        <div>
                            <div className="informationLine_product">
                                <img src={product.img} />
                                <div className="informationLine_text">
                                    <h4>{product.name}</h4>
                                    <p>{convertToUSD(product.price)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="informationLine_total">
                        <h3>Total:</h3>
                        <span>
                            {convertToUSD(cartData?.reduce((value, nextItem) => {
                                return value + (nextItem.quantity * nextItem.price)
                            }, 0))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
