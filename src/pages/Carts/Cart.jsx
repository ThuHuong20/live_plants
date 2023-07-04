import React, { useEffect } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice';
import { productActions } from '@stores/slices/product.slice';
import { convertToUSD } from '@mieuteacher/meomeojs';
export default function DetailItem() {
    const dispatch = useDispatch();
    const userLoginStore = useSelector(store => store.userLoginStore);

    const productStore = useSelector(store => store.productStore);

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
        dispatch(productActions.findAllProducts());
    }, []);

    let listProducts = productStore.listProducts

    let carts = [...userLoginStore.userInfor.carts]

    for (let i = 0; i < carts.length; i++) {
        for (let j = 0; j < listProducts.length; j++) {
            if (carts[i].productId === listProducts[j].id) {
                carts[i] = Object.assign({}, carts[i], { img: listProducts[j].img });
                carts[i] = Object.assign({}, carts[i], { price: listProducts[j].price });
                carts[i] = Object.assign({}, carts[i], { name: listProducts[j].name });
            }
        }
    }

    console.log(carts)
    return (
        <div className='cart_container'>
            <div className='cart_shipping'>
                <h1>MY BAG: 1 ITEM</h1>
                <p><i class="fa-solid fa-truck"></i></p>
                <p>This order qualifies for FREE Shipping!</p>
            </div>
            <div>
                {carts?.map((product) =>
                    <div className='cart_content'>
                        <div className='cart_image'>
                            <img src={product.img} alt='' />
                        </div>
                        <div className='cart_item'>
                            <h1>{product.name}</h1>
                            <div className='cart_price'>
                                <div>
                                    <span>{convertToUSD(product.price)}</span>
                                </div>
                                <div className='cart_count'>
                                    <button type="button" class="btn btn-light">-</button>
                                    <span>1</span>
                                    <button type="button" class="btn btn-light">+</button>
                                </div>
                                <div>
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='total'>
                <h1>Total</h1>
                <p>Price total</p>
                <button>Check Out</button>
            </div>
        </div>
    )
}
