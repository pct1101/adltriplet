import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

function Forget_password() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // sk none/block
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div>
      <Header></Header>
      <div className="container user">
        <div className="background-login-signup"></div>
        <div className="group-user">
          {" "}
          <div className="forget-user">
            <div className="content-account">
              <div className="title">
                <div className="title-edit">
                  <h5>Quên mật khẩu</h5>
                  <p>Vui lòng nhập mật khẩu mới để thay đổi mật khẩu</p>
                </div>
              </div>
              <div className="content-item change-pw">
                <div className="title">
                  <h5>Thay đổi mật khẩu</h5>
                </div>
                <div className="content">
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Nhập email của bạn</p>
                      </div>
                      <div className="desc "></div>
                    </div>
                    <div className="wrap-input ">
                      <div className="wrap-text">
                        <input type="text" name="ip_pw" placeholder="" />
                      </div>
                    </div>
                  </div>
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Mật khẩu mới</p>
                      </div>
                      <div className="desc "></div>
                    </div>
                    <div className="wrap-input ">
                      <div className="wrap-text">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="ip_pw"
                          placeholder=""
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="wrap-svg" onClick={toggleNewPassword}>
                        {showNewPassword ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M11.9999 15.0802C13.7009 15.0802 15.0799 13.7012 15.0799 12.0002C15.0799 10.2991 13.7009 8.92017 11.9999 8.92017C10.2989 8.92017 8.91992 10.2991 8.91992 12.0002C8.91992 13.7012 10.2989 15.0802 11.9999 15.0802Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http:www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.52 18.6297C13.71 18.8397 12.87 18.9397 12 18.9397C8.73 18.9397 5.8 17.4097 3.8 14.9897C2.4 13.2997 2.4 10.6897 3.8 9.00969C3.96 8.80969 4.14 8.61969 4.32 8.42969"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Lặp lại mật khẩu mới</p>
                      </div>
                      <div className="desc "></div>
                    </div>
                    <div
                      className="wrap-input "
                      onClick={toggleConfirmPassword}
                    >
                      <div className="wrap-text">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="ip_pw"
                          placeholder=""
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="wrap-svg">
                        {showConfirmPassword ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M11.9999 15.0802C13.7009 15.0802 15.0799 13.7012 15.0799 12.0002C15.0799 10.2991 13.7009 8.92017 11.9999 8.92017C10.2989 8.92017 8.91992 10.2991 8.91992 12.0002C8.91992 13.7012 10.2989 15.0802 11.9999 15.0802Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http:www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.52 18.6297C13.71 18.8397 12.87 18.9397 12 18.9397C8.73 18.9397 5.8 17.4097 3.8 14.9897C2.4 13.2997 2.4 10.6897 3.8 9.00969C3.96 8.80969 4.14 8.61969 4.32 8.42969"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="apply-button">
                    <a className="btn btn--m btn-primary" disabled="">
                      Xác nhận
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Forget_password;
