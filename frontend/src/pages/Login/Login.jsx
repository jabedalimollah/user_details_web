import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [passwordToggle, setPasswordToggle] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogInBtn = async () => {
    try {
      let response = await axios.post(
        `http://localhost:5000/person/login`,
        data,
        { withCredentials: true }
      );

      // console.log(response.data);

      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
      // if(response.status)
    } catch (err) {
      console.log(err.response.status);
      console.log(err.response.data.error);
      alert("Invalid Username and Password");
    }
  };
  useEffect(() => {
    let auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className={style.main}>
      <div className={style.form_box}>
        <h3 className={style.login_text}>Log in</h3>
        <div className={style.line}></div>
        <form
          action=""
          className={style.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              Username :
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className={style.input}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              Password :
            </label>
            <input
              type={passwordToggle ? "text" : "password"}
              name="password"
              id="password"
              className={style.input}
              onChange={handleInputChange}
            />
            <button
              className={style.passwordToggleBtn}
              onClick={() => setPasswordToggle(!passwordToggle)}
            >
              {passwordToggle ? (
                <AiFillEye className={style.passwordShowHideIcon} />
              ) : (
                <BsFillEyeSlashFill className={style.passwordShowHideIcon} />
              )}
            </button>
          </div>
          <button className={style.login_btn} onClick={handleLogInBtn}>
            Log in
          </button>
          {/* <button className={style.signup_btn}>Sign Up</button> */}

          <Link to="/signup" className={style.signup_btn}>
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
