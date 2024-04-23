import React, { useEffect, useState } from "react";
import style from "./signup.module.css";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: null,
    username: "",
    password: "",
  });
  const [passwordToggle, setPasswordToggle] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    // console.log(e.target.name, e.target.value);
    if (e.target.name === "age") {
      let age = e.target.value;
      age = parseInt(age);
      // e.target.value = age;
      // console.log(typeof age);
      setData({ ...data, age: age });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  const handleSignupBtn = async () => {
    // console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:5000/person/signup",
        // JSON.stringify(data)
        data
      );

      // console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      if (err.response.data.error == "Internal Server Error") {
        alert(err.response.data.error);
      } else {
        alert(err.response.data.message);
      }
      // console.log(err.response.data.message);
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
        <h3 className={style.signup_text}>Sign Up</h3>
        <div className={style.line}></div>
        <form
          action=""
          className={style.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              Name :
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={style.input}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              Email :
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={style.input}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              Age :
            </label>
            <input
              type="text"
              name="age"
              id="age"
              className={style.input}
              onChange={handleInputChange}
            />
          </div>
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
          <button className={style.signup_btn} onClick={handleSignupBtn}>
            Sign Up
          </button>

          <Link to="/login" className={style.login_btn}>
            Log in
          </Link>
          {/* <Link to="/">Home</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
