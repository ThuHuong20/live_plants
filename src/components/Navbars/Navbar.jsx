import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { Link, useNavigate } from 'react-router-dom';
import SearchModal from '@pages/SearchModal/SearchModal'

export default function Navbars() {
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userLoginStore = useSelector(store => store.userLoginStore);

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    }, [])

    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            setCartData(JSON.parse(localStorage.getItem("carts")))
        } else {
            setCartData(userLoginStore.userInfor.carts)
        }
    }, [userLoginStore.userInfor])
    return (
        <nav className="sub__navbar navbar navbar-expand-lg bg-body-tertiary">
            <div className="container_fluid">
                <Link className="navbar-brand" to="/">
                    Live Plant
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/">Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="plant/Largeplant"> Plant</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="plant/Cactus">Cactus</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="plant/Orchid">Orchid</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="plant/Dried">Dried Bouquets</Link>
                    </li>
                </ul>
            </div>
            <div className="searchBox d-flex" role="search">
                <div>
                    <SearchModal />
                </div>
                {
                    userLoginStore.userInfor === null ?
                        <div style={{ display: "flex" }} className='icon'>
                            <Link to='/login' style={{ textDecoration: "none", color: "black", fontSize: "20px" }} ><i className="icon_img fa-solid fa-user"></i></Link>
                        </div>
                        :
                        <div className="dropdown">
                            <img src={userLoginStore.userInfor.avatar} alt="" className='avatar' />
                            {/* <span>Xin Chào {userLoginStore.userInfor.firstName} {userLoginStore.userInfor.lastName}</span> */}
                            <div className="dropdownContent">
                                <a href="#"><i className="fa-regular fa-address-card" ></i>Profile</a>
                                <a href="#" onClick={() => {
                                    alert("Are you sure want to logout?")
                                    localStorage.removeItem("token")
                                    dispatch(userLoginActions.logOut())
                                    navigate("/")

                                }} ><i className="fa-solid fa-right-from-bracket"></i>LogOut</a>

                            </div>
                        </div>
                }
                <Link to='/cart' style={{ textDecoration: "none", color: "black", fontSize: "20px" }}> <i className="icon_img fa-solid fa-cart-shopping"></i></Link>
                <p style={{ color: "red", fontWeight: "bold" }}>
                    {cartData?.reduce((value, nextItem) => {
                        return value + nextItem.quantity
                    }, 0)}
                </p>


            </div>
        </nav >
    )
}
