import React, { useState } from "react";
import { addDriverLicense } from "../../../lib/Axiosintance";
import "../../../css/user/user.css";

function Gplx() {
  const [license_number, setLicenseNumber] = useState("");
  const [license_holder, setLicenseName] = useState("");
  // const [licenseType, setLicenseType] = useState(""); // Thay đổi từ birthDate thành licenseType
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(""); // for error handling

  // Handle changes for license number, name and license type
  const handleLicenseNumberChange = (e) => setLicenseNumber(e.target.value);
  const handleLicenseNameChange = (e) => setLicenseName(e.target.value);
  // const handleLicenseTypeChange = (e) => setLicenseType(e.target.value); // Thêm hàm xử lý thay đổi licenseType

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      // Kiểm tra loại file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml']; 
      if (!allowedTypes.includes(file.type)) {
        setError("Ảnh giấy phép chỉ chấp nhận các định dạng: jpeg, png, jpg, gif, svg.");
        return;
      }
  
      // Kiểm tra dung lượng file (2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setError("Dung lượng ảnh giấy phép không được vượt quá 2MB.");
        return;
      }
  
      // Nếu tất cả điều kiện đều hợp lệ, tiếp tục xử lý file
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Lưu hình ảnh dưới dạng base64
        setError(""); // Xóa thông báo lỗi nếu file hợp lệ
      };
      reader.readAsDataURL(file); // Chuyển đổi file ảnh sang dạng base64
    }
  };

  // Handle form submission to add GPLX
  const handleSubmit = async () => {
    if (!license_number || !license_holder || !selectedImage) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return; // prevent submission if any field is missing
    }

    try {
      const formData = {
        license_number,
        license_holder,
        license_image: selectedImage, // Base64 image
      };

      // Call API to add driver license
      await addDriverLicense(formData);
      setError(""); // Clear error message if successful
      setIsEditing(false); // Switch to view mode
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <div className="content-item driver-license">
        <div className="title">
          <div className="title-item">
            <h6>Giấy phép lái xe</h6>
            <div className="title-item__info error">
              <div className="wrap-svg">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.21001 6.695C7.36001 6.845 7.35501 7.08 7.21001 7.225C7.13501 7.295 7.04001 7.335 6.94501 7.335C6.85001 7.335 6.74999 7.295 6.67999 7.22L6 6.535L5.325 7.22C5.25 7.295 5.15499 7.335 5.05499 7.335C4.95999 7.335 4.865 7.295 4.795 7.225C4.645 7.08 4.64499 6.845 4.78999 6.695L5.47501 6L4.78999 5.305C4.64499 5.155 4.645 4.92 4.795 4.775C4.94 4.63 5.18 4.63 5.325 4.78L6 5.465L6.67999 4.78C6.82499 4.63 7.06001 4.63 7.21001 4.775C7.35501 4.92 7.36001 5.155 7.21001 5.305L6.52499 6L7.21001 6.695Z"
                    fill="#F04438"
                  ></path>
                </svg>
              </div>
              Chưa xác thực
            </div>
          </div>
          <a className="btn btn--s" onClick={toggleEdit}>
            {isEditing ? "Cập nhật" : "Chỉnh sửa"}
          </a>
        </div>

        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        <div className="content">
          <div className="info-license position-relative">
            <div className="info-license__title">
              <p>Hình ảnh</p>
            </div>
            <label className="info-license__img has-edit">
              <div className="fix-img-content">
                {isEditing ? (
                  <img
                    loading="lazy"
                    className="img-license-edit"
                    src={selectedImage || "/upload/upload.png"}
                    alt="Edited Upload"
                  />
                ) : (
                  <img
                    loading="lazy"
                    className="img-license"
                    src="/upload/upload.png"
                    alt="upload"
                  />
                )}
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="fileInput"
                />
              )}
            </label>
          </div>

          <div className="info-license">
            <div className="info-license__title">
              <p>Thông tin chung</p>
            </div>
            <div className="custom-input">
              <div className="wrap-info">
                <div className="title-status">
                  <p>Số GPLX</p>
                </div>
              </div>
              <div className="wrap-input disabled">
                <div className="wrap-text">
                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder="Nhập số GPLX đã cấp"
                    value={license_number}
                    onChange={handleLicenseNumberChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="custom-input">
              <div className="wrap-info">
                <div className="title-status">
                  <p>Họ và tên</p>
                </div>
              </div>
              <div className="wrap-input disabled">
                <div className="wrap-text">
                  <input
                    type="text"
                    name="licenseName"
                    placeholder="Nhập đầy đủ họ tên"
                    value={license_holder}
                    onChange={handleLicenseNameChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            {/* <div className="custom-input">
              <div className="wrap-info">
                <div className="title-status">
                  <p>Loại giấy phép</p>
                </div>
              </div>
              <div className="wrap-input disabled">
                <div className="wrap-text">
                  <select
                    value={licenseType}
                    onChange={handleLicenseTypeChange}
                    disabled={!isEditing}
                  >
                    <option value="">Chọn loại giấy phép</option>
                    <option value="B2">B2</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                </div>
              </div>
            </div> */}
          </div>

          {/* Button to submit the form */}
          {isEditing && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Thêm Giấy phép lái xe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gplx;
