import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice';
import { convertToUSD } from '@mieuteacher/meomeojs';
import { Link } from 'react-router-dom';
import CartItemLocal from './CartItemLocal';
import CartsItem from './CartsItem';
export default function DetailItem() {
    const [cartData, setCartData] = useState([])
    const [cartsLocal, setCartsLocal] = useState(() => JSON.parse(localStorage.getItem("carts")));
    const cartsLocalStore = useSelector(store => store.cartsLocalStore);

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
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartData.forEach(product => {
            totalPrice += product.price * product.quantity;
        });
        return totalPrice;
    }
    const calculateTotalQuantity = () => {
        let quantity = 0;
        cartData.forEach(product => quantity += product.quantity);
        return quantity;
    }

    return (
        <div className='cart_container'>
            <div className='cart_shipping'>
                <h1>MY BAG: {calculateTotalQuantity()} ITEM</h1>
                <p><i class="fa-solid fa-truck"></i></p>
                <p>This order qualifies for FREE Shipping!</p>
            </div>
            <div>
                {cartsLocal ? (cartsLocalStore?.map((product) => <CartItemLocal product={product} />)) :
                    (cartData?.map((product) => <CartsItem product={product} setCartData={setCartData} cartData={cartData} />))}
            </div>
            <div className='total'>
                <h1>Total</h1>
                <p style={{ color: "#de7474", fontWeight: "bold", fontSize: "25px" }}>{convertToUSD(calculateTotalPrice())}</p>
                <button><Link style={{ textDecoration: "none" }} to='/payment'>Check Out</Link></button>
            </div>
        </div>
    )
}
