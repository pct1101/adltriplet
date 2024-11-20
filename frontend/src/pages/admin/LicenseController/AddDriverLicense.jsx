import React, { useState } from "react";
import { createDriverLicense } from "../../../lib/Axiosintance"; // Đường dẫn file API

const AddDriverLicense = () => {
  const [formData, setFormData] = useState({
    id_user: "", // Trường ID người dùng
    license_number: "",
    license_holder: "",
    license_type: "",
    license_status: "",
    issue_date: "",
    expiry_date: "",
    issued_by: "",
    license_image: null, // Ảnh giấy phép
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, license_image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Chuẩn bị dữ liệu gửi đi
    const data = new FormData();
    data.append("id_user", formData.id_user); // Gửi ID người dùng
    data.append("license_number", formData.license_number);
    data.append("license_holder", formData.license_holder);
    data.append("license_type", formData.license_type);
    data.append("license_status", formData.license_status);
    data.append("issue_date", formData.issue_date);
    data.append("expiry_date", formData.expiry_date);
    data.append("issued_by", formData.issued_by);
    data.append("license_image", formData.license_image);

    try {
      const response = await createDriverLicense(data); // Gọi API
      setSuccessMessage("Thêm giấy phép lái xe thành công!");
      setFormData({
        id_user: "",
        license_number: "",
        license_holder: "",
        license_type: "",
        license_status: "",
        issue_date: "",
        expiry_date: "",
        issued_by: "",
        license_image: null,
      });
    } catch (error) {
      console.error("Lỗi khi tạo giấy phép lái xe:", error);
      setErrorMessage("Thêm giấy phép không thành công. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Thêm Giấy Phép Lái Xe</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id_user" className="form-label">ID Người Dùng</label>
          <input
            type="text"
            className="form-control"
            id="id_user"
            name="id_user"
            value={formData.id_user}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="license_number" className="form-label">Số Giấy Phép</label>
          <input
            type="text"
            className="form-control"
            id="license_number"
            name="license_number"
            value={formData.license_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="license_holder" className="form-label">Tên Người Sở Hữu</label>
          <input
            type="text"
            className="form-control"
            id="license_holder"
            name="license_holder"
            value={formData.license_holder}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="license_type" className="form-label">Loại Giấy Phép</label>
          <select
            className="form-control"
            id="license_type"
            name="license_type"
            value={formData.license_type}
            onChange={handleInputChange}
          >
            <option value="">Chọn loại</option>
            <option value="B2">B2</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="license_status" className="form-label">Trạng Thái</label>
          <select
            className="form-control"
            id="license_status"
            name="license_status"
            value={formData.license_status}
            onChange={handleInputChange}
          >
            <option value="">Chọn trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="issue_date" className="form-label">Ngày Cấp</label>
          <input
            type="date"
            className="form-control"
            id="issue_date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiry_date" className="form-label">Ngày Hết Hạn</label>
          <input
            type="date"
            className="form-control"
            id="expiry_date"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issued_by" className="form-label">Cơ Quan Cấp</label>
          <input
            type="text"
            className="form-control"
            id="issued_by"
            name="issued_by"
            value={formData.issued_by}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="license_image" className="form-label">Ảnh Giấy Phép</label>
          <input
            type="file"
            className="form-control"
            id="license_image"
            name="license_image"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Thêm</button>
      </form>
    </div>
  );
};

export default AddDriverLicense;
