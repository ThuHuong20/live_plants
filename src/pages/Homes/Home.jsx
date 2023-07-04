import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Banner from "../../components/Banner/Banner"
import { productActions } from '../../stores/slices/product.slice';
import { userLoginActions } from '../../stores/slices/userLogin.slice';
import Product from '../../components/Product/Product';
import { convertToUSD } from '@mieuteacher/meomeojs';
import "./Home.scss"
import { Col, Row } from 'antd';
export default function Home() {
  const dispatch = useDispatch()

  const productStore = useSelector(store => store.productStore)
  const [nowPage, setNowPage] = useState(1);
  const [pageElements, setPageElements] = useState([]);
  useEffect(() => {
    //ispatch(productActions.findAllProducts())
    dispatch(productActions.paginateProduct(
      {
        nowPage: nowPage,
        maxItemPage: 8
      }
    ))
  }, [])

  useEffect(() => {
    if (!productStore.maxPage) {
      let temp = []
      for (let i = 1; i <= 1; i++) {
        temp.push(
          {
            i: i
          }
        );
      }
      setPageElements(temp)
    } else {
      let temp = []
      for (let i = 1; i <= Math.ceil(productStore.maxPage / 8); i++) {
        temp.push(
          {
            i: i
          }
        );
      }
      setPageElements(temp)
    }

  }, [productStore.maxPage])

  // kiểm tra chưa đăng nhập thì vẫn thêm sp vào giỏ hàng

  const userLoginStore = useSelector(store => store.userLoginStore)

  useEffect(() => {
    dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (userLoginStore.userInfor != null) {
        if (localStorage.getItem("carts")) {
          if (userLoginStore.userInfor.carts.length == 0) {
            dispatch(userLoginActions.updateCart(
              {
                userId: userLoginStore.userInfor.id,
                carts: {
                  carts: JSON.parse(localStorage.getItem("carts"))
                }
              }
            ))
          } else {
            let carts = JSON.parse(localStorage.getItem("carts"));
            let jssCarts = [...userLoginStore.userInfor.carts];

            for (let i in carts) {
              for (let j in jssCarts) {
                if (carts[i].productId == jssCarts[j].productId) {
                  carts[i].quantity += jssCarts[j].quantity;
                  jssCarts.splice(j, 1);
                }
              }
            }

            let result = carts.concat(jssCarts);

            dispatch(userLoginActions.updateCart(
              {
                userId: userLoginStore.userInfor.id,
                carts: {
                  carts: result
                }
              }
            ))
          }
        }
      }
    }
  }, [])

  return (
    <div>
      <Banner />
      <h1 style={{ marginTop: "30px", marginLeft: "80px" }}>New Arrivals</h1>
      <div className='listProducts'>
        <div className='center_content'>
          <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {productStore.listProducts?.map((product) =>

              <Col style={{ marginBottom: "20px", minWidth: "250px" }} className="gutter-row" span={6}>
                <Product product={product} />
              </Col>
            )}

          </Row>
          <div className='pages'>
            {
              pageElements.map((page, index) =>
                <button onClick={() => {
                  dispatch(productActions.paginateProduct(
                    {
                      nowPage: page.i,
                      maxItemPage: 8
                    }
                  ))
                  setNowPage(page.i)
                }} style={{ width: "100px", marginRight: "20px", backgroundColor: nowPage == page.i ? "green" : "" }}>{page.i}</button>
              )
            }

          </div>
        </div>
      </div>
    </div>
  )
}
