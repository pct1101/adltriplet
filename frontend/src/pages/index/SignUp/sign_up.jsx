import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { register } from "../../../lib/Axiosintance";
import "../../../css/index/form-login-signup.css";

const Dangky = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    api_token: "",
    agree: false, // Trạng thái checkbox
  });
  // note: checkbox
  const [agreeError, setAgreeError] = useState("");
  // note: set value validate form
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  // note: checkbox
  // note: set state to serve
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý khi submit form đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    let hasError = false;
    // note: validate
    //note: name
    if (!formData.name) {
      setNameError("*Vui lòng nhập tên!");
      hasError = true;
    } else if (/[0-9]/.test(formData.name)) {
      setNameError("*Tên không được chứa số!");
      hasError = true;
    } else if (/[@!#$%^&*(),.?":{}[|<>]/.test(formData.name)) {
      setNameError("*Tên không được chứa ký tự đặc biệt!");
      hasError = true;
    } else if (formData.name.length > 255) {
      setNameError("*Tên không được vượt quá 255 ký tự!");
      hasError = true;
    } else {
      setNameError(""); // Không có lỗi
    }

    //note: email
    if (!formData.email) {
      setEmailError("*Vui lòng nhập email!");
      hasError = true;
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formData.email)) {
        setEmailError("*Email không hợp lệ!");
        hasError = true;
      } else {
        setEmailError("");
      }
    }

    // note: phone
    if (!formData.phone) {
      setPhoneError("*Vui lòng nhập số điện thoại!");
      hasError = true;
    } else {
      const phoneRegex = /^0\d{9}$/; // Bắt đầu bằng 0, theo sau là 9 chữ số
      if (!phoneRegex.test(formData.phone)) {
        setPhoneError("* Số điện thoại phải có 10 số và bắt đầu bằng số 0.");
        hasError = true;
      } else {
        setPhoneError("");
      }
    }
    // note: password
    if (!formData.password) {
      setPasswordError("*Vui lòng nhập mật khẩu");
      hasError = true;
    } else {
      const passwordRegex =
        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,21}$)/;
      // (?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]) => Ít nhất 1 ký tự đặc biệt
      // (?=.{6,21}$) => Độ dài từ 6 đến 21 ký tự
      if (!passwordRegex.test(formData.password)) {
        setPasswordError(
          "*Mật khẩu phải có từ 6 đến 21 ký tự và bao gồm ít nhất 1 ký tự đặc biệt."
        );
        hasError = true;
      } else {
        setPasswordError("");
      }
    }
    // note: confirm_password
    if (!formData.password_confirmation) {
      setPasswordConfirmError("*Vui lòng xác nhận mật khẩu");
      hasError = true;
    } else if (formData.password_confirmation !== formData.password) {
      setPasswordConfirmError(
        "*Mật khẩu xác nhận không khớp với mật khẩu đã nhập"
      );
      hasError = true;
    } else {
      setPasswordConfirmError("");
    }
    // note: checkbox
    if (!formData.agree) {
      setAgreeError(
        "*Vui lòng đọc kỹ và đồng ý với chính sách & quy định để tiếp tục."
      );
      hasError = true;
      return; // Ngăn form gửi nếu chưa tích
    } else {
      setAgreeError(""); // Xóa lỗi nếu đã tích
    }

    if (hasError) {
      console.log("đang có lỗi xảy ra vui lòng kiểm tra lại");
      return;
    }

    try {
      const response = await register(formData);
      console.log("Full response:", response); // Xem phản hồi đầy đủ
      setSuccess("Đăng ký thành công!"); // Thông báo đăng ký thành công

      // Lưu token vào localStorage
      if (response.data.api_token) {
        localStorage.setItem("api_token", response.data.api_token);
      }
      setError("");
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      setError(
        error.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container login">
        <div className="background-login-signup"></div>
        <div className="group-login-signup">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="title-login text-center">
                  <h2>Đăng Ký</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handleRegister}>
                    <div className="mb">
                      <div className="">
                        {" "}
                        <label htmlFor="name" className="form-label">
                          Họ và tên
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="VD: Nguyễn văn A"
                      />
                      {nameError && (
                        <p className="error-message">{nameError}</p>
                      )}
                    </div>
                    <div className="mb">
                      <div className="d-flex gap-2">
                        {" "}
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Gmail@gmail.com"
                      />

                      {emailError && (
                        <p className="error-message">{emailError}</p>
                      )}
                    </div>
                    <div className="mb">
                      <div className="d-flex gap-2">
                        {" "}
                        <label htmlFor="phone" className="form-label">
                          Số điện thoại
                        </label>
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" +84 765 801 204"
                      />
                      {phoneError && (
                        <p className="error-message">{phoneError}</p>
                      )}
                    </div>
                    <div className="mb">
                      <label htmlFor="password" className="form-label">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="***********"
                      />
                      {passwordError && (
                        <p className="error-message">{passwordError}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password_confirmation"
                        className="form-label"
                      >
                        Xác nhận mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="***********"
                      />
                      {passwordConfirmError && (
                        <p className="error-message">{passwordConfirmError}</p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="group-box">
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="agree"
                          value="yes"
                          checked={formData.agree}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              agree: e.target.checked,
                            })
                          }
                        />
                        Tôi đã đọc và đồng ý với
                        <a href="/login" className="acess">
                          chính sách & quy định
                        </a>
                        của ADL TRIPBEL T
                      </p>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && (
                      <div className="alert alert-success">{success}</div>
                    )}
                    {agreeError && (
                      <span className="error-message">{agreeError}</span>
                    )}
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
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
                <div className="text-center">
                  <p>
                    Bạn đã có
                    <a href="/login" className="tk text-primary">
                      tài khoản
                    </a>
                    ?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dangky;
