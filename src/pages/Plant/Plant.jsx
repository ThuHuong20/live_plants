import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { productActions } from '../../stores/slices/product.slice';
import Product from '../../components/Product/Product';
import { Col, Row } from 'antd';
export default function Plant() {
    const { type } = useParams();
    const dispatch = useDispatch();

    const productStore = useSelector(store => store.productStore)

    useEffect(() => {
        dispatch(productActions.filterProduct(type))
    }, [type])

    return (
        <div className='listProducts'>
            <div className='center_content'>
                <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {productStore.listProducts?.map((product) =>
                        <Col style={{ marginBottom: "20px", minWidth: "250px" }} className="gutter-row" span={8}>
                            <Product product={product} />
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}
