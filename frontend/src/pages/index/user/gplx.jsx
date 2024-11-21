import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "../../../css/user/user.css";
function Gplx() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // idea: tạo giá trị các hàm
  const handleLicenseNumberChange = (e) => setLicenseNumber(e.target.value);
  const handleLicenseNameChange = (e) => setLicenseName(e.target.value);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  //  idea:Hàm xử lý khi người dùng chọn ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Đặt base64 vào state
      };
      reader.readAsDataURL(file); // Chuyển đổi file sang base64
    }
  };
  return (
    <div>
      {" "}
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
            {" "}
            {isEditing ? "Cập nhật" : "Chỉnh sửa"}{" "}
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
                <div className="desc text-success"></div>
              </div>
              <div className="wrap-input disabled">
                <div className="wrap-text">
                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder="Nhập số GPLX đã cấp"
                    value={licenseNumber}
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
                <div className="desc text-success"></div>
              </div>
              <div className="wrap-input disabled">
                <div className="wrap-text">
                  <input
                    type="text"
                    name="licenseName"
                    placeholder="Nhập đầy đủ họ tên"
                    value={licenseName}
                    onChange={handleLicenseNameChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="custom-input">
              <div className="wrap-info">
                <div className="title-status">
                  <p>Ngày sinh</p>
                </div>
                <div className="desc text-success"></div>
              </div>
              <div className="wrap-input disabled" style={{ padding: "0px" }}>
                <div className="wrap-text">
                  <span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          value={birthDate}
                          onChange={(newDate) => setBirthDate(newDate)}
                          disabled={!isEditing}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              border: "none",
                              "& fieldset": {
                                border: "none",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#242420", // Thay đổi màu sắc của label
                              fontSize: "1rem",
                              fontWeight: "500", // Đặt độ đậm cho label
                            },
                          }}
                        />{" "}
                      </DemoContainer>
                    </LocalizationProvider>
                  </span>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Gplx;
