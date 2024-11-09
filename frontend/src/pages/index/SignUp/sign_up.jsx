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
  });
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
    try {
      const response = await register(formData);
      console.log("Full response:", response); // Xem phản hồi đầy đủ
      setSuccess("Đăng ký thành công!"); // Thông báo đăng ký thành công

      // Lưu token vào localStorage
      if (response.data.api_token) {
        localStorage.setItem("api_token", response.data.api_token);
      }

      setTimeout(() => {
        navigate("/"); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
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
                      <label htmlFor="name" className="form-label">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="VD: Nguyễn văn A"
                        required
                      />
                    </div>
                    <div className="mb">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Gmail@gmail.com"
                        required
                      />
                    </div>
                    <div className="mb">
                      <label htmlFor="phone" className="form-label">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" +84 765 801 204"
                        required
                      />
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
                        required
                      />
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
                        required
                      />
                    </div>
                    <div className="text-center">
                      <p className="group-box">
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="agree"
                          value="yes"
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
                      <div className="alert alert-danger">{success}</div>
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
