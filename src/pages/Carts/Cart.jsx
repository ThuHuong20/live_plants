import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { convertToUSD, randomId } from '@mieuteacher/meomeojs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import ItemCard from './CartItem'
export default function DetailItem() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userLoginStore = useSelector(store => store.userLoginStore)
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
    }, [])

    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            if (localStorage.getItem("carts")) {
                setCartData(JSON.parse(localStorage.getItem("carts")))
            }
        } else {
            setCartData(userLoginStore.userInfor.carts)
        }
    }, [userLoginStore.userInfor])

    function handleUpdateCart(type, productId) {
        // type => 1: +, 2: -, 3: delete
        if (localStorage.getItem("token")) {
            // online
            if (type == 1) {
                let cartTemp = [...userLoginStore.userInfor.carts];
                cartTemp = cartTemp.map(item => {
                    if (item.id == productId) {
                        let objTemp = Object.assign({}, item);
                        objTemp.quantity++;
                        return objTemp
                    }
                    return item;
                })
                if (!userLoginStore.loading) {
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: cartTemp
                            }
                        }
                    ))
                }
            }
            if (type == 2) {
                let cartTemp = [...userLoginStore.userInfor.carts];
                for (let i in cartTemp) {
                    if (cartTemp[i].id == productId) {
                        if (cartTemp[i].quantity == 1) {
                            if (window.confirm("Ban co muon xoa khong?")) {
                                cartTemp.splice(i, 1)
                            }
                        } else {
                            let objTemp = Object.assign({}, cartTemp[i]);
                            objTemp.quantity--;
                            cartTemp[i] = objTemp;
                        }
                        break
                    }
                }
                if (!userLoginStore.loading) {
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: cartTemp
                            }
                        }
                    ))
                }
            }
            if (type == 3) {
                let cartTemp = [...userLoginStore.userInfor.carts];
                for (let i in cartTemp) {
                    if (cartTemp[i].id == productId) {
                        cartTemp.splice(i, 1)
                        break
                    }
                }
                if (!userLoginStore.loading) {
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: cartTemp
                            }
                        }
                    ))
                }
            }
        } else {
            // local
            if (localStorage.getItem("carts")) {
                let cartLocal = JSON.parse(localStorage.getItem("carts"));
                if (type == 1) {
                    cartLocal = cartLocal.map(item => {
                        if (item.id == productId) {
                            item.quantity += 1;
                        }
                        return item
                    })
                    localStorage.setItem("carts", JSON.stringify(cartLocal))
                }
                if (type == 2) {

                    for (let i in cartLocal) {
                        if (cartLocal[i].id == productId) {
                            if (cartLocal[i].quantity == 1) {
                                if (window.confirm("Ban co muon xoa khong ?")) {
                                    cartLocal.splice(i, 1)
                                }
                            } else {
                                cartLocal[i].quantity--;
                            }
                            break;
                        }
                    }

                    localStorage.setItem("carts", JSON.stringify(cartLocal))
                }
                if (type == 3) {

                    for (let i in cartLocal) {
                        if (cartLocal[i].id == productId) {
                            cartLocal.splice(i, 1)
                            break;
                        }
                    }

                    localStorage.setItem("carts", JSON.stringify(cartLocal))
                }
                // load lai data local
                setCartData(JSON.parse(localStorage.getItem("carts")))
                dispatch(userLoginActions.changeDependentData())
            }
        }
    }
    return (
        <div className='cart_container'>
            <div className='cart_shipping'>
                <h1>MY BAG: {cartData?.reduce((value, nextItem) => {
                    return value + nextItem.quantity
                }, 0)} ITEM</h1>
                <p><i class="fa-solid fa-truck"></i></p>
                <p>This order qualifies for FREE Shipping!</p>
            </div>
            <div>
                {cartData?.length > 0 ? (
                    cartData.map((product, index) =>
                        <ItemCard handleUpdateCart={handleUpdateCart} key={randomId()} product={product} />
                    )
                ) : (<div style={{ textAlign: "center", fontSize: "30px", marginTop: "7px", fontWeight: "bold" }}>Your Cart Is Empty </div>)}

            </div>
            <div className='total'>
                <h1>Total</h1>
                <p style={{ color: "#de7474", fontWeight: "bold", fontSize: "25px" }}>{
                    convertToUSD(cartData?.reduce((value, nextItem) => {
                        return value + (nextItem.quantity * nextItem.price)
                    }, 0))
                }</p>
                <button onClick={() => {
                    if (cartData.length == 0) {
                        return
                    }
                    navigate('/payment')
                }}>Check Out</button>
            </div>
        </div>
    )
}
