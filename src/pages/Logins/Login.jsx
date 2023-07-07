import React, { useEffect } from 'react'
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@components/Loadings/Loading'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userLoginStore = useSelector(store => store.userLoginStore);

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
        <div className='login_container'>
            {/* {
                userLoginStore.loading ? <Loading></Loading> : <></>
            } */}
            <form onSubmit={(eventForm) => {
                eventForm.preventDefault(); // vô hiệu hành vi mặc định form

                if (eventForm.target.inputUserName.value === "" || eventForm.target.inputPassword.value == "") {
                    alert("Please enter full information")
                    return
                }

                dispatch(userLoginActions.login(
                    {
                        userName: eventForm.target.inputUserName.value,
                        userEmail: eventForm.target.inputEmail.value,
                        password: eventForm.target.inputPassword.value
                    }
                ))

            }} className='login_form'>
                <p className='form_title'>Login Form</p>
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
                {/* Email */}
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='inputEmail'
                    />
                </div>
                {/* {Password} */}
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
                <button style={{ width: "100%" }} type="submit" className="btn btn-success">Login</button>
                <p style={{ textAlign: "center", marginTop: "10px" }}>Not a member ? <span style={{ color: "green", fontWeight: "bold" }} onClick={() => navigate("/register")}>Register</span></p>
            </form>
        </div>

    )
}
