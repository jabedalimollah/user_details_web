import React, { useEffect, useState } from "react";
import style from "./update.module.css";
import { AiOutlineClose } from "react-icons/ai";
import PasswordReset from "./PasswordReset";
import axios from "axios";
const UpdatePage = ({ editToggleBtn, person }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    username: "",
    password: "",
  });
  const [passwordToggle, setPasswordToggle] = useState(false);
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
  const handleUpdateBtn = async () => {
    console.log(data);
    let response = await axios.put(
      `http://localhost:5000/person/update/${person._id}`,
      data
    );
    response = await response.data;
    console.log(response);
  };
  const handleCloseTobbleBtn = () => {
    setPasswordToggle(false);
  };

  useEffect(() => {
    setData({
      name: person.name,
      email: person.email,
      age: person.age,
      username: person.username,
      password: person.password,
    });
  }, []);
  return (
    <>
      {passwordToggle ? (
        <PasswordReset
          handleCloseTobbleBtn={handleCloseTobbleBtn}
          person={person}
        />
      ) : (
        <div className={style.main}>
          <div className={style.form_box}>
            <button className={style.close_btn} onClick={() => editToggleBtn()}>
              <AiOutlineClose className={style.close_icon} />
            </button>
            <h3 className={style.signup_text}>Update Data</h3>
            <div className={style.line}></div>
            <form
              action=""
              className={style.form}
              // onSubmit={(e) => e.preventDefault()}
            >
              <div className={style.input_group}>
                <label htmlFor="" className={style.label}>
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
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
                  value={data.email}
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
                  value={data.age}
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
                  value={data.username}
                  className={style.input}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className={style.forget_password}
                onClick={() => setPasswordToggle(true)}
              >
                forget password ?
              </button>
              <button className={style.signup_btn} onClick={handleUpdateBtn}>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePage;
