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
                    content: 'Check out thanh cong vui long vao trang lich su mua hang',
                });
                navigate("/")
            } else {
                setCartData(userLoginStore.userInfor.carts)
            }
        }
    }, [userLoginStore.userInfor])

    function checkout() {

        let patchData = {
            userId: userLoginStore.userInfor.id,
            data: {
                carts: [],
                receipts: [{
                    receiptId: randomId(),
                    total: 1212,
                    paid: true,
                    createDate: Date.now(),
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
                            <img src='../image/banner/payment.png' />
                        </div>
                    </div>
                    <button onClick={() => checkout()} className="form-group-checkout">Check Out</button>
                    <p className="validate-email" />
                </div>
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
