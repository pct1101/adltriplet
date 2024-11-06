import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";
import "../../../css/form-login-signup.css";
import { login } from "../../../lib/Axiosintance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Full response:", response); // Kiểm tra toàn bộ phản hồi

      // Lấy api_token và user từ phản hồi
      const { token, user } = response.data; // Giả sử token là chuỗi bạn sẽ dùng để xác thực, còn user là đối tượng chứa thông tin người dùng
      const apiToken = user.api_token; // Lấy api_token từ đối tượng user

      localStorage.setItem("authToken", apiToken); // Lưu api_token vào localStorage
      localStorage.setItem("userRole", user.role); // Lưu vai trò vào localStorage

      // Kiểm tra vai trò người dùng để điều hướng
      if (user.role === "admin") {
        navigate("/admin"); // Điều hướng đến trang admin nếu là admin
      } else {
        navigate("/"); // Điều hướng về trang chủ nếu là người dùng thông thường
      }
    } catch (error) {
      console.error("Error during login:", error); // Kiểm tra lỗi
      setError("Đăng nhập thất bại, vui lòng kiểm tra thông tin.");
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
                        id="loginPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="forgot-password">
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
                    Đăng ký ngay để nhận ngay
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
      </div>
      <Footer />
    </div>
  );
};

export default Login;
