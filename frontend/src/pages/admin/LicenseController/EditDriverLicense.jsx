import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDriverLicenseById,
  updateDriverLicense,
} from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import Footer from "../component/footer";

const EditDriverLicense = () => {
  const [license_number, setLicense_number] = useState("");
  const [license_holder, setLicense_holder] = useState("");
  const [license_type, setLicense_type] = useState("");
  const [license_status, setLicense_status] = useState("");
  const [expiry_date, setExpiry_date] = useState("");
  const [issued_by, setIssued_by] = useState("");
  const [rejection_reason, setRejection_reason] = useState("");
  // const [license_image, setLicense_image] = useState("");
  // const [licenseImageFile, setLicenseImageFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    checkUserRole();
    if (id) {
      fetchLicense(id);
    }
  }, [id]);

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/");
    } else {
      setIsAdmin(true);
    }
  };

  const fetchLicense = async (licenseId) => {
    try {
      const response = await getDriverLicenseById(licenseId);
      const license = response.driver_license;
      setLicense_number(license.license_number);
      setLicense_holder(license.license_holder);
      setLicense_type(license.license_type);
      setLicense_status(license.license_status);
      setExpiry_date(license.expiry_date);
      setIssued_by(license.issued_by);
      setRejection_reason(license.rejection_reason || "");
      // setLicense_image(license.license_image);
    } catch (error) {
      console.error("Error fetching license data:", error.message);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setLicenseImageFile(file);
  //   setLicense_image(URL.createObjectURL(file));
  // };

  const handleUpdateLicense = async (e) => {
    e.preventDefault();

    if (
      !license_holder ||
      !license_number ||
      !license_type ||
      !license_status ||
      !expiry_date ||
      !issued_by ||
      (license_status === "invalid" && !rejection_reason)
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("license_holder", license_holder);
    formData.append("license_number", license_number);
    formData.append("license_type", license_type);
    formData.append("license_status", license_status);
    formData.append("expiry_date", expiry_date);
    formData.append("issued_by", issued_by);

    if (license_status === "invalid") {
      formData.append("rejection_reason", rejection_reason);
    }

    // if (licenseImageFile) {
    //   formData.append("license_image", licenseImageFile);
    // }

    try {
      await updateDriverLicense(id, formData);
      alert("Cập nhật giấy phép thành công!");
      navigate("/admin/license");
    } catch (error) {
      console.error(
        "Error updating license:",
        error.response?.data?.message || error.message
      );
      alert(
        `Cập nhật thất bại: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <h2 className="title">Cập Nhật Giấy Phép Lái Xe</h2>
        {isAdmin ? (
          <form onSubmit={handleUpdateLicense}>
            <div className="mb-3">
              <label className="form-label">Người đứng tên:</label>
              <input
                type="text"
                className="form-control"
                value={license_holder}
                onChange={(e) => setLicense_holder(e.target.value)}
                required
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số GPLX:</label>
              <input
                type="text"
                className="form-control"
                value={license_number}
                onChange={(e) => setLicense_number(e.target.value)}
                required
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Loại GPLX:</label>
              <select
                className="form-control"
                value={license_type}
                onChange={(e) => setLicense_type(e.target.value)}
                required
              >
                <option value="">Chọn loại</option>
                <option value="B2">B2</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="invalid">Không hợp lệ</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Trạng Thái:</label>
              <select
                className="form-control"
                value={license_status}
                onChange={(e) => setLicense_status(e.target.value)}
                required
              >
                <option value="">Trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không Hoạt động</option>
                <option value="invalid">Bị Từ Chối</option>
              </select>
            </div>
            {license_status === "invalid" && (
              <div className="mb-3">
                <label className="form-label">Lý Do Từ Chối:</label>
                <textarea
                  className="form-control"
                  value={rejection_reason}
                  onChange={(e) => setRejection_reason(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Ngày Hết Hạn:</label>
              <input
                type="date"
                className="form-control"
                value={expiry_date}
                onChange={(e) => setExpiry_date(e.target.value)}
                required
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cấp Bởi:</label>
              <input
                type="text"
                className="form-control"
                value={issued_by}
                onChange={(e) => setIssued_by(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label className="form-label">Hình Ảnh:</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
              {license_image && (
                <img
                  src={licenseImageFile ? license_image : `http://localhost:8000/imgs/${license_image}`}
                  alt="License Preview"
                  style={{ width: "100px", height: "auto" }}
                />
              )}
            </div> */}
            <button type="submit" className="btn btn-primary">
              Cập Nhật
            </button>
          </form>
        ) : (
          <p>Bạn không có quyền truy cập vào trang này.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditDriverLicense;

// const handleSpecialStatus = async (bookingId, specialStatus) => {
//   await handleStatusChange(bookingId, specialStatus);
//   alert(
//     specialStatus === "3"
//       ? "Trạng thái đã được chuyển thành 'Xác nhận thanh toán'!"
//       : "Booking đã bị hủy bởi admin!"
//   );
// };
