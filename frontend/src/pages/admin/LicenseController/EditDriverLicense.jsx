import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverLicenseById, updateDriverLicense } from "../../../lib/Axiosintance";

function EditDriverLicense() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trạng thái giấy phép
  const [formData, setFormData] = useState({
    license_number: "",
    license_holder: "",
    license_type: "",
    license_status: "active", // Giá trị mặc định
    issue_date: "",
    expiry_date: "",
    issued_by: "",
    license_image: null, // Dùng để upload ảnh
    rejection_reason: "", // Thêm biến rejection_reason
  });

  // Trạng thái loading và lỗi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy thông tin giấy phép khi tải trang
  useEffect(() => {
    fetchDriverLicense();
  }, []); // Chạy khi component mount

  const fetchDriverLicense = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDriverLicenseById(id);
      setFormData({
        ...data,
        issue_date: data.issue_date?.slice(0, 10) || "", // Format lại ngày
        expiry_date: data.expiry_date?.slice(0, 10) || "", // Format lại ngày
        rejection_reason: data.rejection_reason || "", // Lý do không hợp lệ
      });
    } catch (err) {
      setError("Lỗi khi lấy thông tin giấy phép. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevLicense) => ({ ...prevLicense, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updatedLicenseData = {
      license_number: formData.license_number,
      license_holder: formData.license_holder,
      license_type: formData.license_type,
      license_status: formData.license_status,
      issue_date: formData.issue_date, 
      expiry_date: formData.expiry_date, 
      issued_by: formData.issued_by,
      license_image: formData.license_image,
      rejection_reason: formData.license_status === "invalid" ? formData.rejection_reason : null,
    };

    try {
      await updateDriverLicense(id, updatedLicenseData);
      alert("Cập nhật giấy phép thành công!");
      navigate("/admin/license");
    } catch (err) {
      setError("Lỗi khi cập nhật giấy phép. Vui lòng thử lại.");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Chỉnh sửa Giấy phép lái xe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Số giấy phép</label>
          <input
            type="text"
            name="license_number"
            className="form-control"
            value={formData.license_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tên chủ sở hữu</label>
          <input
            type="text"
            name="license_holder"
            className="form-control"
            value={formData.license_holder}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Loại giấy phép</label>
          <select
            name="license_type"
            className="form-select"
            value={formData.license_type}
            onChange={handleInputChange}
          >
            <option value="B2">B2</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select
            name="license_status"
            className="form-select"
            value={formData.license_status}
            onChange={handleInputChange}
            required
          >
            <option value="active">Xác nhận</option>
            <option value="inactive">Chưa xác nhận</option>
            <option value="invalid">Không hợp lệ</option>
          </select>
        </div>
        {formData.license_status === "invalid" && (
          <div className="mb-3">
            <label className="form-label">Lý do không hợp lệ</label>
            <textarea
              name="rejection_reason"
              className="form-control"
              value={formData.rejection_reason}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Ngày cấp</label>
          <input
            type="date"
            name="issue_date"
            className="form-control"
            value={formData.issue_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ngày hết hạn</label>
          <input
            type="date"
            name="expiry_date"
            className="form-control"
            value={formData.expiry_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nơi cấp</label>
          <input
            type="text"
            name="issued_by"
            className="form-control"
            value={formData.issued_by}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditDriverLicense;
