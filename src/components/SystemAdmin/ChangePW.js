import "./ChangePW.css";
import axios from "axios";

import { useState } from "react";
export const ChangePW = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("users/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      console.log({ response });
      setcurrentPassword("");
      setnewPassword("");
      setconfirmPassword("");

      alert("Successed");
    } catch (err) {
      alert("Missing Password");
    }
  };
  return (
    <div className="container rounded bg-white mt-0 mb-0">
      <div className="cardStyle">
        <form onSubmit={submit} method="post" name="signupForm" id="signupForm">
          <h4 className="formTitle">ĐỔI MẬT KHẨU</h4>
          <div className="inputDiv">
            Mật khẩu cũ
            <input
              type="password"
              id="yourpassword"
              name="yourpassword"
              onChange={(e) => setcurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputDiv">
            Mật khẩu mới
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setnewPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputDiv">
            Nhập lại mật khẩu
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              className="submitButton pure-button pure-button-primary"
            >
              <span>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
