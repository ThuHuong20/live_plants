import React, { useEffect } from 'react'
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbars() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userLoginStore = useSelector(store => store.userLoginStore);

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    }, [])

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
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
                {
                    userLoginStore.userInfor == null ?
                        <div className='icon'>
                            <Link to='/login' style={{ textDecoration: "none", color: "black", fontSize: "20px" }} ><i className="icon_img fa-solid fa-user"></i></Link>
                            <Link to='/cart' style={{ textDecoration: "none", color: "black", fontSize: "20px" }}> <i className="icon_img fa-solid fa-cart-shopping"></i></Link>
                        </div>
                        :
                        <div className='avatarBox'>
                            {/* <span>Xin Chào {userLoginStore.userInfor.firstName} {userLoginStore.userInfor.lastName}</span> */}
                            <img className='avatarImg' src={userLoginStore.userInfor.avatar} />
                            <Link to='/cart' style={{ textDecoration: "none", color: "black", fontSize: "20px" }}><i className="icon_img fa-solid fa-cart-shopping"></i></Link>
                            {localStorage.getItem("token") ? (<Link to='/' style={{ textDecoration: "none", color: "black", fontSize: "20px" }} onClick={() => {
                                alert("Ban co muon dang xuat khoong")
                                localStorage.removeItem("token")
                                dispatch(userLoginActions.logOut())
                                navigate('/')
                            }}><i class="fa-solid fa-right-from-bracket"></i></Link>) : (<Link to='/register' style={{ textDecoration: "none", color: "black", fontSize: "20px" }} ><i className="icon_img fa-solid fa-user"></i></Link>)}
                        </div>

                }


            </div>
        </nav >
    )
}
