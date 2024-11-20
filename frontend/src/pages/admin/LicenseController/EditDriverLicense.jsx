import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverLicenseById, updateDriverLicense } from "../../../lib/Axiosintance";

function EditDriverLicense() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trạng thái giấy phép
  const [license, setLicense] = useState({
    license_number: "",
    license_holder: "",
    license_type: "",
    license_status: "active", // Giá trị mặc định
    issue_date: "",
    expiry_date: "",
    issued_by: "",
    license_image: null, // Dùng để upload ảnh
  });

  // Trạng thái loading và lỗi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy thông tin giấy phép khi tải trang
  useEffect(() => {
    fetchDriverLicense();
  }, []);

  const fetchDriverLicense = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDriverLicenseById(id);
      setLicense({
        ...data,
        issue_date: data.issue_date?.slice(0, 10) || "",
        expiry_date: data.expiry_date?.slice(0, 10) || "",
      });
    } catch (err) {
      setError("Lỗi khi lấy thông tin giấy phép. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLicense({ ...license, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Xây dựng lại dữ liệu để gửi đúng cấu trúc
    const updatedLicenseData = {
      license_number: license.license_number,
      license_holder: license.license_holder,
      license_type: license.license_type,
      license_status: license.license_status,
      issue_date: license.issue_date, // Đảm bảo không gửi null
      expiry_date: license.expiry_date, // Đảm bảo không gửi null
      issued_by: license.issued_by,
      license_image: license.license_image,
    };
    
    try {
      await updateDriverLicense(id, updatedLicenseData); // Gửi dữ liệu đã chuẩn hóa
      alert("Cập nhật giấy phép thành công!")
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
            value={license.license_number}
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
            value={license.license_holder}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Loại giấy phép</label>
          <input
            type="text"
            name="license_type"
            className="form-control"
            value={license.license_type}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select
            name="license_status"
            className="form-select"
            value={license.license_status}
            onChange={handleInputChange}
          >
            <option value="active">Kích hoạt</option>
            <option value="inactive">Không kích hoạt</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Ngày cấp</label>
          <input
            type="date"
            name="issue_date"
            className="form-control"
            value={license.issue_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ngày hết hạn</label>
          <input
            type="date"
            name="expiry_date"
            className="form-control"
            value={license.expiry_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nơi cấp</label>
          <input
            type="text"
            name="issued_by"
            className="form-control"
            value={license.issued_by}
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
