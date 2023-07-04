import React from 'react'
import './Product.scss'
import { useNavigate } from 'react-router-dom'
import { convertToUSD } from '@mieuteacher/meomeojs';
export default function Product({ product }) {
    const navigate = useNavigate();

    return (
        <div className='Card' onClick={() => navigate(`/detailItem/${product.id}`)}>
            <div className='card_img' >
                <img src={product.img} className="card-img-top" alt="..." />
                <div className='card_name'>
                    <div className="card-text">
                        <span >
                            {product.name}
                        </span>
                    </div>
                    <div className='card-price'>
                        <p>{convertToUSD(product.price)}</p>
                        <span style={{ marginLeft: "50px" }}> <i class="fa-solid fa-heart"></i></span>
                    </div>
                </div>
            </div>
        </div >
    )
}
