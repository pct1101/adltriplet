import React, { useState } from "react";
import { addDriverLicense } from "../../../../lib/Axiosintance";

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
  // note:
  const [successMessage, setSuccessMessage] = useState("");
  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError("");
    setSuccessMessage("");
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra loại file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Ảnh giấy phép chỉ chấp nhận các định dạng: jpeg, png, jpg, gif, svg."
        );
        return;
      }
      // Kiểm tra dung lượng file (2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setError("Dung lượng ảnh giấy phép không được vượt quá 2MB.");
        return;
      }
      // Lưu hình ảnh vào state
      setSelectedImage(file);
      setError(""); // Xóa thông báo lỗi nếu file hợp lệ
    }
  };

  // Handle form submission to add GPLX
  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");
    if (!license_number || !license_holder || !selectedImage) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return; // prevent submission if any field is missing
    }
    try {
      const formData = new FormData();
      formData.append("license_number", license_number);
      formData.append("license_holder", license_holder);
      formData.append("license_image", selectedImage); // Chuyển ảnh tệp vào FormData

      setIsEditing(false);

      const response = await addDriverLicense(formData);
      if (response) {
        setSuccessMessage("Thêm thành công");
        window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        const errorMessage = errors.license_number
          ? errors.license_number[0]
          : "Đã xảy ra lỗi, vui lòng thử lại.";
        setError(errorMessage);
      } else {
        setError("Đã xảy ra lỗi, vui lòng thử lại.");
      }
      console.log(
        "Lỗi trong khi gửi yêu cầu:",
        err.response ? err.response.data : err.message
      );
    }
  };
  return (
    <div>
      <div className="content-item driver-license">
        <div className="title">
          <div className="title-item">
            <h6>Giấy phép lái xe</h6>
          </div>
          <a className="btn btn--s" onClick={toggleEdit}>
            {isEditing ? "Cập nhật" : "Chỉnh sửa"}
          </a>
        </div>
        <div className="note-license">
          <p>
            <b>Lưu ý: </b> để tránh phát sinh vấn đề trong quá trình thuê xe,{" "}
            <u>người đặt xe</u> trên Mioto (đã xác thực GPLX) <b>ĐỒNG THỜI </b>
            phải là <u>người nhận xe.</u>
          </p>
        </div>

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
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : "/upload/upload.png"
                    }
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
            {error && <div className="error-message">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Thêm Giấy phép lái xe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gplx;
