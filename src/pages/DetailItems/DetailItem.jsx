
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { productActions } from '@stores/slices/product.slice';
import { userLoginActions } from '@stores/slices/userLogin.slice';
import { convertToUSD } from '@mieuteacher/meomeojs';
import './DetailItem.scss'
export default function DetailItem() {
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams();
    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore)
    const userLoginStore = useSelector(store => store.userLoginStore)
    useEffect(() => {
        dispatch(productActions.searchProductById(id))
    }, [])
    const product = productStore.listProducts[0]
    function addToCart(buyItem) {
        if (localStorage.getItem("token")) {
            let carts = [];
            let flag = false;

            carts = userLoginStore.userInfor.carts.slice().map(item => {
                if (item.productId === buyItem.productId) {
                    let temp = { ...item };
                    temp.quantity += buyItem.quantity;
                    flag = true;
                    return temp
                }

                return item
            })



            if (!flag) {
                carts?.push(buyItem)
            }

            dispatch(userLoginActions.updateCart(
                {
                    userId: userLoginStore.userInfor.id,
                    carts: {
                        carts: carts
                    }
                }
            ))
            return
        }

        // chưa đăng nhập

        if (localStorage.getItem("carts")) {
            // đã từng có giỏ hàng
            let carts = JSON.parse(localStorage.getItem("carts"));
            console.log(carts);
            let flag = false;
            carts.map(item => {
                if (item.productId === buyItem.productId) {
                    item.quantity += buyItem.quantity
                    flag = true;
                }
                return item
            })
            if (!flag) {
                carts?.push(buyItem)
            }
            localStorage.setItem("carts", JSON.stringify(carts));
        } else {
            // chưa từng có
            let carts = [buyItem]
            localStorage.setItem("carts", JSON.stringify(carts));
        }
    }


    return (
        <div className='detail_container'>
            <div className='detail_img'>
                <img src={product?.img} alt='' />
            </div>
            <div className='detail_content'>
                <h1>{product?.name}</h1>

                <div className='quantity-container'>
                    <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}> {convertToUSD(product?.price)}</span>
                    <div className='count_product'>
                        <button className='count' onClick={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1)
                            }
                        }}>
                            <span class="material-symbols-outlined">
                                remove
                            </span>
                        </button>

                        <span className='quantity' style={{ fontSize: "18px" }}>{quantity}</span>

                        <button className='count' onClick={() => setQuantity(quantity + 1)}>
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>

                </div>
                <div className='buttonAddCart' >
                    <button className='addToCart' onClick={() => addToCart(
                        {
                            productId: product.id,
                            quantity: quantity,
                            img: product.img,
                            name: product.name,
                            price: product.price
                        }
                    )}>Add To Cart</button><br />
                    <div style={{ marginTop: "20px" }}>
                        <span >30-Day Customer Happiness Guarantee</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
