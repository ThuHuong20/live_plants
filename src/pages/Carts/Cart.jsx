import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice';
import { convertToUSD } from '@mieuteacher/meomeojs';
import { Link } from 'react-router-dom';
export default function DetailItem() {
    const [cartData, setCartData] = useState([])
    const dispatch = useDispatch();
    const userLoginStore = useSelector(store => store.userLoginStore);
    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
    }, []);
    useEffect(() => {
        if (userLoginStore.userInfor !== null) {
            let carts = [...userLoginStore.userInfor.carts]
            setCartData(carts)
        }
    }, [userLoginStore.userInfor])

    function handleDeleteProduct(productId) {

        let carts = userLoginStore.userInfor.carts
        // console.log(carts);

        let updatedCart = carts.filter((product) => product.productId !== productId)

        setCartData(updatedCart)

        // console.log(updatedCart);

        dispatch(userLoginActions.updateCart(
            {
                userId: userLoginStore.userInfor.id,
                carts: {
                    carts: updatedCart
                }
            }
        ))
    }
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartData.forEach(product => {
            totalPrice += product.price * product.quantity;
        });
        return totalPrice;
    }

    return (
        <div className='cart_container'>
            <div className='cart_shipping'>
                <h1>MY BAG: 1 ITEM</h1>
                <p><i class="fa-solid fa-truck"></i></p>
                <p>This order qualifies for FREE Shipping!</p>
            </div>
            <div>
                {cartData?.map((product) =>
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
                                        onClick={(e) => {
                                            if (Number(e.target.parentNode.querySelector(".quantity").innerText > 1)) {
                                                e.target.parentNode.querySelector(".quantity").innerText =
                                                    Number(e.target.parentNode.querySelector(".quantity").innerText) - 1;
                                            }
                                        }}
                                    >-</button>
                                    <span style={{ padding: "5px" }} className="quantity">{product.quantity}</span>
                                    <button onClick={(e) => {
                                        e.target.parentNode.querySelector(".quantity").innerText =
                                            Number(e.target.parentNode.querySelector(".quantity").innerText) + 1;
                                    }}>+</button>
                                </div>
                                <div>
                                    <i style={{ color: " #de7474", fontSize: "20px" }} onClick={() => {
                                        handleDeleteProduct(product.productId)
                                    }} class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className='total'>
                <h1>Total</h1>
                <p style={{ color: "#de7474", fontWeight: "bold", fontSize: "25px" }}>{convertToUSD(calculateTotalPrice())}</p>
                <button><Link style={{ textDecoration: "none" }} to='/payment'>Check Out</Link></button>
            </div>
        </div>
    )
}
