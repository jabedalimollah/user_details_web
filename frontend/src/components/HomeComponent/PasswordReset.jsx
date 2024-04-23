import React, { useEffect, useState } from "react";
import style from "./passwordReset.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
const PasswordReset = ({ handleCloseTobbleBtn, person }) => {
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleChangePasswordBtn = async () => {
    // console.log(password);
    if (password.newPassword === password.confirmPassword) {
      let response = await axios.put(
        `http://localhost:5000/person/update/${person._id}`,
        {
          password: password.newPassword,
        }
      );
      response = await response.data;
      // console.log(response);
      handleCloseTobbleBtn();
    }
  };
  useEffect(() => {}, []);
  return (
    <div className={style.main}>
      <div className={style.box}>
        <button
          className={style.close_btn}
          //   onClick={() => editToggleBtn()}
          onClick={() => handleCloseTobbleBtn()}
        >
          <AiOutlineClose className={style.close_icon} />
        </button>
        <h3 className={style.forget_password_title}>Forget Password</h3>
        <div className={style.line}></div>
        <form
          action=""
          className={style.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              New Password :
            </label>
            <input
              type={newPasswordToggle ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              className={style.input}
              onChange={handleInputChange}
            />
            <button
              className={style.passwordToggleBtn}
              onClick={() => setNewPasswordToggle(!newPasswordToggle)}
            >
              {newPasswordToggle ? (
                <AiFillEye className={style.passwordShowHideIcon} />
              ) : (
                <BsFillEyeSlashFill className={style.passwordShowHideIcon} />
              )}
            </button>
          </div>
          <div className={style.input_group}>
            <label htmlFor="" className={style.label}>
              Confirm Password :
            </label>
            <input
              type={confirmPasswordToggle ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className={style.input}
              onChange={handleInputChange}
            />
            <button
              className={style.passwordToggleBtn}
              onClick={() => setConfirmPasswordToggle(!confirmPasswordToggle)}
            >
              {confirmPasswordToggle ? (
                <AiFillEye className={style.passwordShowHideIcon} />
              ) : (
                <BsFillEyeSlashFill className={style.passwordShowHideIcon} />
              )}
            </button>
          </div>
          <button
            className={style.change_password_btn}
            onClick={handleChangePasswordBtn}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
