import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";
import "../../../css/index/form-login-signup.css";
import { login, resetPassword } from "../../../lib/Axiosintance";
import { useAuth } from "../../Private/Auth";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // note: set value validate form
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // note: showForget password
  const [showForgerPassword, setShowForgerPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    //note: email
    if (!email) {
      setEmailError("*Vui lòng nhập email!");
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        setEmailError("*Email không hợp lệ!");
      } else {
        setEmailError("");
      }
    }
    // note: password
    if (!password) {
      setPasswordError("*Vui lòng nhập mật khẩu");
    } else {
      setPasswordError("");
    }

    try {
      const response = await login(email, password);
      console.log("Full response:", response); // Kiểm tra toàn bộ phản hồi

      // Lấy api_token và user từ phản hồi
      const { token, user } = response.data; // Giả sử token là chuỗi bạn sẽ dùng để xác thực, còn user là đối tượng chứa thông tin người dùng
      const apiToken = user.api_token; // Lấy api_token từ đối tượng user

      // Kiểm tra nếu có token và user
      if (token && user) {
        // Lưu token và role vào localStorayge
        localStorage.setItem("authToken", apiToken);
        localStorage.setItem("userRole", user.role);

        // Điều hướng dựa trên role
        navigate(user.role === "admin" ? "/admin" : "/");

        // Lưu thông tin người dùng vào context (nếu có)
        setUser(user);
      } else {
        // Nếu không có token hoặc user trong phản hồi, hiển thị thông báo lỗi
        setError("Không có token trả về từ server.");
      }
      // Kiểm tra vai trò người dùng để điều hướng
    } catch (error) {
      console.error("Error during login:", error.response.data); // Kiểm tra lỗi
      setError("Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác.");
    }
  };

  //  note: forget password
  const handleForgetPassword = async (e, token) => {
    setShowForgerPassword(!showForgerPassword);
    e.preventDefault();

    try {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("token", token);
      urlParams.set("email", email);
      const response = await resetPassword(email);
      console.log("Password reset response:", response);
      const successMessage = response.message;
      setSuccessMessage(successMessage);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowForgerPassword(false);
  };

  return (
    <div>
      <Header />
      <div className="container login">
        <div className="background-login-signup"></div>
        <div className="group-login-signup">
          <div className="row justify-content-center">
            <div className="form-login">
              <div className="title-login text-center">
                <h2>Đăng Nhập</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className=" mb">
                    <label htmlFor="email" className="form-label">
                      Tài khoản gmail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email"
                    />
                    {emailError && (
                      <p className="error-message">{emailError}</p>
                    )}
                  </div>

                  <div className="mb">
                    <label htmlFor="password" className="form-label">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                    />
                    {passwordError && (
                      <p className="error-message">{passwordError}</p>
                    )}
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  <div
                    className="forgot-password"
                    onClick={handleForgetPassword}
                  >
                    <a href="#"> Quên mật khẩu?</a>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        height: "45px",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                      }}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>

              <div className="text-center">
                <p>
                  Đăng ký ngay để
                  <a href="/signup" className="tk text-primary">
                    nhận ngay
                  </a>
                  10% ưu đãi từ ADL TRIPEL T
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showForgerPassword && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="group-title d-flex">
              <h5>Quên mật khẩu</h5>
              <button
                className="btn btn-close"
                onClick={() => setShowForgerPassword(false)}
              ></button>
            </div>
            <div className="line-page"> </div>
            <div className="modal-body">
              <div className="modal-input-body">
                <div className="line-form">
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Nhập email của bạn</p>
                      </div>
                      <div className="desc "></div>
                    </div>
                    <div className="wrap-input ">
                      <div className="wrap-text">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wrap-btn">
                  <a
                    className="btn btn-primary btn--m"
                    onClick={handleForgetPassword}
                  >
                    Tiếp tục
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
