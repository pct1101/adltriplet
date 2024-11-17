import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../lib/Axiosintance"; // Import API thêm user
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminAddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  //   const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState(null); // Thêm trường hình ảnh
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState(1); // Trạng thái người dùng (1: active, 0: inactive)
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // Trường xác nhận mật khẩu
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = () => {
    const userRole = localStorage.getItem("userRole");
    const apiToken = localStorage.getItem("authToken");

    console.log("User Role from localStorage:", userRole);
    console.log("API Token from localStorage:", apiToken);

    if (!userRole || userRole !== "admin") {
      setIsAdmin(false);
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/"); // Điều hướng về trang chủ nếu không có quyền
    } else {
      setIsAdmin(true);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Kiểm tra sự trùng khớp của mật khẩu và xác nhận mật khẩu
    if (password !== passwordConfirmation) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    // Chuyển đổi file hình ảnh thành URL nếu cần (hoặc base64)
    let imageUrl = null;
    if (image) {
      // Nếu bạn muốn gửi hình ảnh dưới dạng base64 hoặc URL, hãy xử lý tại đây.
      const reader = new FileReader();
      reader.readAsDataURL(image); // Chuyển file hình ảnh thành base64
      reader.onloadend = async () => {
        imageUrl = reader.result;
        await submitForm(imageUrl);
      };
    } else {
      // Nếu không có ảnh, tiếp tục gửi form
      await submitForm(imageUrl);
    }
  };

  const submitForm = async (imageUrl) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("gender", gender);
    // formData.append("birth_date", birthDate);
    formData.append("role", role);
    formData.append("status", status);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation); // Thêm trường xác nhận mật khẩu
    if (imageUrl) formData.append("image", imageUrl); // Sử dụng URL ảnh hoặc base64

    try {
      await addUser(formData); // Gọi API để thêm người dùng
      alert("Đã thêm người dùng mới thành công!"); // Thông báo thành công
      navigate("/admin/Userlist"); // Điều hướng đến trang danh sách người dùng sau khi thêm thành công
    } catch (error) {
      console.error("Error while adding user:", error.message);
    }
  };

  return (
    <div>
      {" "}
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
        <h2 className="title">Thêm Người Dùng Mới</h2>
        {isAdmin ? (
          <div className="container-m">
            {" "}
            <form onSubmit={handleAddUser}>
              <div className="mb-3">
                <label className="form-label">Tên Người Dùng:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Số Điện Thoại:</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Địa Chỉ:</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giới Tính:</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
              {/* <div className="mb-3">
        <label className="form-label">Ngày Sinh:</label>
        <input
          type="date"
          className="form-control"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
      </div> */}
              <div className="mb-3">
                <label className="form-label">Hình Ảnh:</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mật Khẩu:</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        passwordVisible ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>{" "}
                    {/* Icon mắt */}
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Xác Nhận Mật Khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vai Trò:</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Trạng Thái:</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                >
                  <option value="1">Hoạt động</option>
                  <option value="0">Không hoạt động</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm Người Dùng
              </button>
            </form>
          </div>
        ) : (
          <p>Bạn không có quyền truy cập trang này.</p>
        )}
      </div>
    </div>
  );
}

export default AdminAddUser;
