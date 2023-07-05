
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

    function createBuyAnimation(element1, element2, width, height) {
        // Tạo một bản sao của phần tử đầu tiên
        var clone = element1.cloneNode(true);

        // Lấy thông tin về vị trí của phần tử thứ nhất
        var element1Rect = element1.getBoundingClientRect();

        // Đặt các thuộc tính CSS để phần tử sao chép di chuyển
        clone.style.position = 'absolute';
        clone.style.left = element1Rect.left + 'px';
        clone.style.top = element1Rect.top + 'px';
        clone.style.borderRadius = "50%";
        clone.style.maxWidth = width + "px";
        clone.style.maxheight = height + "px";
        clone.style.transform = "scale(1)";
        element2.style.transform = "scale(2)";

        // Thêm phần tử sao chép vào body hoặc phần tử cha của element1 nếu muốn
        document.body.appendChild(clone);

        // Tính toán vị trí đích của phần tử sao chép
        var destinationRect = element2.getBoundingClientRect();
        var destinationLeft = destinationRect.left;
        var destinationTop = destinationRect.top;

        // Tạo hiệu ứng di chuyển
        var duration = 1500; // Thời gian di chuyển (milliseconds)
        var startTime = null;

        function moveElement(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            var percentage = Math.min(progress / duration, 1);

            // Tính toán vị trí hiện tại của phần tử sao chép
            var currentLeft = element1Rect.left + (destinationLeft - element1Rect.left) * percentage;
            var currentTop = element1Rect.top + (destinationTop - element1Rect.top) * percentage;

            // Cập nhật vị trí của phần tử sao chép
            clone.style.left = currentLeft + 'px';
            clone.style.top = currentTop + 'px';

            if (percentage < 1) {
                // Tiếp tục di chuyển cho đến khi đạt đến vị trí đích
                requestAnimationFrame(moveElement);
            } else {
                // Kết thúc di chuyển và loại bỏ phần tử sao chép
                clone.parentNode.removeChild(clone);
                element2.style.transform = "unset";
            }
        }

        // Bắt đầu di chuyển
        requestAnimationFrame(moveElement);
    }

    return (
        <form onSubmit={(eForm) => {
            eForm.preventDefault();
            const imgElement = eForm.target.productImg
            const cartElement = document.querySelector(".fa-cart-shopping");
            createBuyAnimation(imgElement, cartElement, 50, 50)
        }} className='detail_container'>
            <div className='detail_img'>
                <img style={{ zIndex: "1000000" }} name="productImg" src={product?.img} alt='' />
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
                    <button type='submit' className='addToCart' onClick={() => addToCart(
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
        </form>
    )
}
