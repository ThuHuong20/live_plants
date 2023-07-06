import React, { useEffect, useState } from 'react'
import './Receipts.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { convertToUSD, getDateInfo, randomId } from '@mieuteacher/meomeojs';
import ReceiptDetail from "./components/ReceiptDetail"
export default function Receipts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartData, setCartData] = useState([]);
    const userLoginStore = useSelector(store => store.userLoginStore);
    const [showDetail, setShowDetail] = useState(false);
    const [popData, setPopData] = useState([]);
    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    }, [])

    useEffect(() => {
        if (userLoginStore.userInfor != null) {
            setCartData(userLoginStore.userInfor.carts)
        }
    }, [userLoginStore.userInfor])
    return (

        <div className="informationLine_receipts">
            {
                showDetail ? <ReceiptDetail popData={popData} setShowDetail={setShowDetail}></ReceiptDetail> : <></>
            }
            <div className="informationLine_h2" >
                <h2>Purchase History</h2>
            </div>
            <div>
                {/* <div className="informationLine_product_receipts">
                    <img src='' />
                    <div className="informationLine_text">
                        <h4>ghfh</h4>
                        <p>5463</p>
                    </div>
                </div> */}
                {/* Noi hien thi history */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className='tableContent'>
                                    #
                                </div>
                            </th>
                            <th scope="col">
                                <div className='tableContent'>
                                    Receipt Id
                                </div>
                            </th>
                            <th scope="col">
                                <div className='tableContent'>
                                    Total
                                </div>
                            </th>
                            <th scope="col">
                                <div className='tableContent'>
                                    Paid Status
                                </div>
                            </th>
                            <th scope="col">
                                <div className='tableContent'>
                                    Create Time
                                </div>
                            </th>
                            <th scope="col">
                                <div className='tableContent'>
                                    Custumer Name
                                </div>
                            </th>
                            <th scope="col">
                                <div className='tableContent'>
                                    Detail
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userLoginStore.userInfor?.receipts.map((receipt, index) =>
                                <tr key={randomId()}>
                                    <th scope="col">
                                        <div className='tableContent'>
                                            {index + 1}
                                        </div>
                                    </th>
                                    <td scope="col">
                                        <div className='tableContent'>
                                            {receipt.receiptId}
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className='tableContent'>
                                            {convertToUSD(receipt.total)}
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className='tableContent'>
                                            {
                                                receipt.paid ? "Da Thanh Toan" : "Chua Thanh Toan"
                                            }
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className='tableContent'>
                                            {
                                                getDateInfo(receipt.createDate).format
                                            }
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className='tableContent'>
                                            {
                                                receipt.customerInfor.name
                                            }
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className='tableContent'>
                                            <button onClick={() => {
                                                setShowDetail(true)
                                                setPopData(receipt.receiptDetail)
                                            }} type="button" className="btn btn-primary">Details</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>
            <div className="informationLine_total">
                <h3>Total:</h3>
                <span>
                    total price
                </span>
            </div>
            <div className="informationLine_Continue">
                <button
                    onClick={() => navigate('/')}
                >Continue Shopping
                </button>
            </div>
        </div>


    )
}
