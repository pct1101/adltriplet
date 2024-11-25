import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDriverLicenseById,
  updateDriverLicense,
} from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminDriverLicenseDetails() {
  const { licenseId } = useParams(); // Lấy licenseId từ URL
  const [driverLicense, setDriverLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Điều khiển chế độ chỉnh sửa
  const [formData, setFormData] = useState({
    license_number: "",
    license_holder: "",
    license_type: "",
    license_status: "",
    issue_date: "",
    expiry_date: "",
    issued_by: "",
    license_image: "",
  }); // Dữ liệu form
  const [errorMessage, setErrorMessage] = useState(""); // Dữ liệu thông báo lỗi

  const navigate = useNavigate();

  // Lấy thông tin chi tiết của giấy phép lái xe khi component được load
  useEffect(() => {
    fetchDriverLicenseDetails();
  }, [licenseId]); // Khi licenseId thay đổi

  const fetchDriverLicenseDetails = async () => {
    try {
      const response = await getDriverLicenseById(licenseId); // Gửi request lấy chi tiết giấy phép lái xe từ API
      console.log(response);
      setDriverLicense(response); // Lưu thông tin giấy phép lái xe vào state
      setFormData({
        license_number: response?.driver_license?.license_number || "",
        license_holder: response?.driver_license?.license_holder || "",
        license_type: response?.driver_license?.license_type || "",
        license_status: response?.driver_license?.license_status || "",
        issue_date: response?.driver_license?.issue_date || "",
        expiry_date: response?.driver_license?.expiry_date || "",
        issued_by: response?.driver_license?.issued_by || "",
        license_image: response?.driver_license?.license_image || "",
      });
      setLoading(false); // Đánh dấu kết thúc loading
    } catch (error) {
      console.error("Không thể lấy chi tiết giấy phép lái xe:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        license_image: file, // Cập nhật ảnh vào formData
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("license_number", formData.license_number);
    data.append("license_holder", formData.license_holder);
    data.append("license_type", formData.license_type);
    data.append("license_status", formData.license_status);
    data.append("issue_date", formData.issue_date);
    data.append("expiry_date", formData.expiry_date);
    data.append("issued_by", formData.issued_by);
    data.append("license_image", formData.license_image); // Ảnh tải lên dưới dạng tệp

    try {
      await updateDriverLicense(licenseId, data); // Gửi dữ liệu FormData
      alert("Cập nhật thành công!");
      setIsEditing(false);
      fetchDriverLicenseDetails();
    } catch (error) {
      setErrorMessage("Cập nhật không thành công, vui lòng thử lại!");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <Side_bar />
      <div
        className="main-wrapper section"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <h1
          className="title"
          style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}
        >
          Chi tiết Giấy phép Lái xe
        </h1>
        <div
          className="container-m"
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {driverLicense ? (
            <form onSubmit={handleSubmit}>
              <div
                className="row"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {/* Cột bên trái: Thông tin giấy phép */}
                <div className="col-md-6" style={{ marginBottom: "20px" }}>
                  <h3 style={{ color: "#2d2d2d", marginBottom: "10px" }}>
                    Thông tin Giấy phép Lái xe
                  </h3>
                  <label>Số giấy phép:</label>
                  <input
                    type="text"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <label>Chủ sở hữu giấy phép:</label>
                  <input
                    type="text"
                    name="license_holder"
                    value={formData.license_holder}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <label>Loại giấy phép:</label>
                  <input
                    type="text"
                    name="license_type"
                    value={formData.license_type}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <label>Trạng thái:</label>
                  <select
                    name="license_status"
                    value={formData.license_status}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                  <label>Ngày cấp:</label>
                  <input
                    type="date"
                    name="issue_date"
                    value={formData.issue_date}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <label>Ngày hết hạn:</label>
                  <input
                    type="date"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <label>Cơ quan cấp:</label>
                  <input
                    type="text"
                    name="issued_by"
                    value={formData.issued_by}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <label>Hình ảnh giấy phép:</label>
                  <img
                    src={`http://localhost:8000/${formData.license_image}`}
                    alt="License"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      if (isEditing) {
                        // Logic để thay đổi hình ảnh nếu cần
                        alert("Edit mode: Bạn có thể thay đổi hình ảnh.");
                      }
                    }}
                  />
                </div>
              </div>

              {/* Hiển thị thông báo lỗi nếu có */}
              {errorMessage && (
                <div
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div style={{ textAlign: "center" }}>
                {isEditing ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "5px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Lưu thay đổi
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "5px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div>Không tìm thấy dữ liệu giấy phép lái xe</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDriverLicenseDetails;
