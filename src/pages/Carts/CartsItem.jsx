import React, { useState } from 'react'
import { convertToUSD } from '@mieuteacher/meomeojs';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginActions } from '@stores/slices/userLogin.slice';

export default function CartsItem({ product, setCartData, cartData }) {
    const [quantity, setQuantity] = useState(product.quantity)

    const dispatch = useDispatch();

    const userLoginStore = useSelector(store => store.userLoginStore);

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

    function handleChangeQuantityProduct(productCart) {
        let updatedCart = cartData.map((product) => {
            if (product.productId === productCart.productId) {
                return productCart;
            } else {
                return product;
            }
        });

        setCartData(updatedCart);

        // Tính tổng giá trị mới
        // let foodSubTotal = updatedCart.reduce((total, food) => {
        //     return total + food.price * food.quantity;
        // }, 0);

        // Cập nhật tổng giá trị
        // setSubTotal(foodSubTotal);

        dispatch(
            userLoginActions.updateCart({
                userId: userLoginStore.userInfor.id,
                carts: {
                    carts: updatedCart,
                },
            })
        );
    }

    return (
        <div className='cart_content'>
            <div className='cart_image'>
                <img src={product?.img} alt='' />
            </div>
            <div className='cart_item'>
                <h1>{product?.name}</h1>
                <div className='cart_price'>
                    <div className='price'>
                        <span>{convertToUSD(product.price * product.quantity)}</span>
                    </div>
                    <div className='cart_count'>
                        <button
                            onClick={() => {
                                setQuantity(quantity - 1)
                                handleChangeQuantityProduct(
                                    {
                                        ...product,
                                        quantity: quantity - 1
                                    }
                                )
                            }}
                        >-</button>
                        <span style={{ padding: "5px" }} className="quantity">{quantity}</span>
                        <button onClick={() => {
                            setQuantity(quantity + 1)
                            handleChangeQuantityProduct(
                                {
                                    ...product,
                                    quantity: quantity + 1
                                }
                            )
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
    )
}
