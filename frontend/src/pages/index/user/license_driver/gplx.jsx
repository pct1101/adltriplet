import React, { useEffect, useState } from "react";
import {
  addDriverLicense,
  editDriverLicense,
  getDriverLicense,
} from "../../../../lib/Axiosintance";
const BASE_URL = "https://api.thuexetulai.online/";

function Gplx() {
  const [license_number, setLicenseNumber] = useState("");
  const [license_holder, setLicenseName] = useState("");
  const [gplx, setgplx] = useState([]);

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
      formData.append("license_image", selectedImage);
      setIsEditing(false);

      const response = await addDriverLicense(formData);
      console.log(response);
      window.location.reload();
      if (response) {
        setSuccessMessage("Thêm thành công, vui lòng chờ xác nhận");
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

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Chuẩn bị dữ liệu
      const formData = new FormData();
      formData.append("license_number", license_number);
      formData.append("license_holder", license_holder);
      formData.append("license_image", selectedImage);

      // Gửi request tới API chỉnh sửa
      const response = await editDriverLicense(
        gplx[0].driver_license_id,
        formData
      );
      console.log("tui là editgplx", response);
      setSuccessMessage("Sửa giấy phép lái xe thành công!");
      window.location.reload();
    } catch (error) {
      setError("Có lỗi xảy ra khi sửa giấy phép lái xe.");
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDriverLicense();
        setgplx(response.driver_licenses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-item driver-license">
        <div className="title">
          <div className="title-item">
            <h6>Giấy phép lái xe</h6>
            {gplx[0]?.license_status === "inactive" ||
            !gplx[0]?.license_status ? (
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
            ) : gplx[0]?.license_status === "invalid" ? (
              <div className="title-item__info invalid">
                <div className="wrap-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    width="12"
                    height="12"
                  >
                    <circle cx="12" cy="12" r="10" fill="#f44336" />
                    <path
                      fill="white"
                      d="M15.5 8.5l-1-1L12 10.5 9.5 8 8.5 9l2.5 2.5L8.5 14l1 1L12 12.5l2.5 2.5 1-1-2.5-2.5L15.5 8.5z"
                    />
                  </svg>
                </div>
                Không chính xác
              </div>
            ) : (
              <div div className="title-item__info success">
                <div className="wrap-svg">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.795 5.295L6.035 7.055C5.96 7.13 5.865 7.165 5.77 7.165C5.675 7.165 5.575 7.13 5.505 7.055L4.625 6.175C4.475 6.03 4.475 5.79 4.625 5.645C4.77 5.5 5.01 5.5 5.155 5.645L5.77 6.26L7.265 4.765C7.41 4.62 7.645 4.62 7.795 4.765C7.94 4.91 7.94 5.15 7.795 5.295Z"
                      fill="#12B76A"
                    ></path>
                  </svg>
                </div>
                Đã xác thực
              </div>
            )}
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
                    src={
                      gplx[0]?.license_image
                        ? `${BASE_URL}${gplx[0].license_image}`
                        : "/upload/upload.png"
                    }
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
                    placeholder={
                      gplx[0]?.license_number || "Nhập số GPLX đã cấp"
                    }
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
                    placeholder={gplx[0]?.license_holder || "Nhập họ và tên"}
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
            {gplx.length === 0 ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsEditing(false); // Đảm bảo không phải chế độ chỉnh sửa
                  handleSubmit();
                }}
              >
                Thêm giấy phép lái xe
              </button>
            ) : isEditing ? (
              <button className="btn btn-primary" onClick={handleEdit}>
                Cập nhật giấy phép lái xe
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gplx;
