import React, { useEffect } from 'react'
import './ReceiptDetail.scss'
import { convertToUSD } from '@mieuteacher/meomeojs';
export default function ReceiptDetail(props) {
    useEffect(() => {
        console.log("popData", props.popData)
    }, [])
    return (
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
