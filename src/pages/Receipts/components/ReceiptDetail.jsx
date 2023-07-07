import React, { useEffect } from 'react'
import './ReceiptDetail.scss'
import { convertToUSD } from '@mieuteacher/meomeojs';
export default function ReceiptDetail(props) {
    useEffect(() => {
    }, [])
    return (
        <div className='opacity'>


            <div className='receiptDetail_container'>
                <h5 onClick={() => {
                    props.setShowDetail(false)
                }}>X</h5>
                <div className="informationLine">
                    {props.popData.map((product) =>
                        <div className="informationLine_product">
                            <img src={product.img} />
                            <div className="informationLine_text">
                                <h4>{product.name}</h4>
                                <p>{convertToUSD(product.price)}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='informationLine_total_price'>
                    <h1 >Total:</h1>
                    <p>{
                        convertToUSD(props.popData?.reduce((value, nextItem) => {
                            return value + (nextItem.quantity * nextItem.price)
                        }, 0))
                    }</p>
                </div>
            </div>
        </div>
    )
}
