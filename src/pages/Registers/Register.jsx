import React, { useEffect, useState } from 'react'
import './Register.scss'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@components/Loadings/Loading'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLoginStore = useSelector(store => store.userLoginStore);
    const [loadingCheck, setLoadingCheck] = useState(false);
    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            if (localStorage.getItem("token")) {
                dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
            }
        } else {
            // vua dang nhap thanh cong
            let userCarts = userLoginStore.userInfor.carts;
            if (localStorage.getItem("carts")) {
                let localCarts = JSON.parse(localStorage.getItem("carts"));
                if (userCarts.length == 0) {
                    // truong hop tren mang chua co gio hang
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: localCarts
                            }
                        }
                    ))
                    localStorage.removeItem('carts');
                    navigate('/')
                } else {
                    // truong hop tren mang da co san pham

                    let userCartsCopy = [];

                    for (let i in userCarts) {
                        let flag = false;
                        for (let j in localCarts) {
                            if (userCarts[i].id == localCarts[j].id) {
                                let newObj = { ...userCarts[i] };
                                newObj.quantity += localCarts[j].quantity;
                                localCarts.splice(j, 1);
                                userCartsCopy.push(newObj);
                                flag = true;
                                break
                            }
                        }

                        if (!flag) {
                            let newObj = { ...userCarts[i] };
                            userCartsCopy.push(newObj);
                        }
                    }

                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: userCartsCopy.concat(localCarts)
                            }
                        }
                    ))
                    localStorage.removeItem('carts');
                    navigate('/')
                }
            } else {
                navigate('/')
            }
        }
    }, [userLoginStore.userInfor])


    return (
        <div className='register_container'>
            {
                userLoginStore.loading || loadingCheck ? <Loading></Loading> : <></>
            }
            <form onSubmit={async (eventForm) => {
                eventForm.preventDefault(); // vô hiệu hành vi mặc định form

                if (eventForm.target.inputPassword.value == "" || eventForm.target.inputUserName.value == "" || eventForm.target.inputUserEmail.value == "") {
                    alert("Please enter full information")
                    return
                }

                if (eventForm.target.inputPassword.value != eventForm.target.inputRePassword.value) {
                    alert("Please enter confirm password")
                    return
                }


                if (loadingCheck) {
                    return
                }
                setLoadingCheck(true)
                let resultCheck = await axios.get(process.env.REACT_APP_SERVER_JSON + "users" + "?userName=" + eventForm.target.inputUserName.value);
                if (resultCheck.data.length != 0) {
                    alert("User Name already exists")
                    setLoadingCheck(false)
                    return
                }
                setLoadingCheck(false)

                dispatch(userLoginActions.register(
                    {
                        userName: eventForm.target.inputUserName.value,
                        email: eventForm.target.inputUserEmail.value,
                        password: eventForm.target.inputPassword.value,
                        isAdmin: false,
                        firstName: "New",
                        lastName: "Member",
                        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZfYb4CWzn9zbn-jLTwei46uk0dMEgMsh3gQ&usqp=CAU",
                        carts: [],
                        receipts: []

                    }
                ))

            }} className='register_form'>
                <p className='form_title'>Register</p>
                {/* input User Name */}
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="User name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='inputUserName'
                    />
                </div>
                {/* input email */}
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='inputUserEmail'
                    />
                </div>
                {/* input password */}
                <div className="form_input input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='inputPassword'
                    />
                </div>
                <div className="form_input input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='inputRePassword'
                    />
                </div>
                <button style={{ width: "100%" }} type="submit" className="btn btn-success">Register</button>
            </form>
        </div>

    )
}
