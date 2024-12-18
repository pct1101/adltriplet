import React, { useState } from "react";
import "../../../css/index/home.css";
import { sendContactMail } from "../../../lib/Axiosintance";

function Register() {
  const [formData, setFormData] = useState({
    ht: "",
    sdt: "",
    em: "",
    nd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendContactMail(formData);
      alert(response.message); // Hiển thị thông báo thành công
    } catch (error) {
      alert("Gửi yêu cầu thất bại. Vui lòng thử lại!");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="section-intro"></div>
      <div className="container d-flex" style={{ borderRadius: "15px" }}>
        <div className="banner-register">
          <img src="/upload/bn.png" alt="Banner" />
        </div>
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="item-register">
            <h1 className="title-form">ĐĂNG KÝ NHẬN TIN</h1>
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  name="ht"
                  value={formData.ht}
                  onChange={handleChange}
                  className="form-control text form-control"
                  placeholder="Họ tên"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleChange}
                  className="form-control text form-control"
                  placeholder="+84 123456789"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="em"
                value={formData.em}
                onChange={handleChange}
                className="form-control validates-as-required validates-as-email form-control"
                placeholder="Nhập email"
              />
            </div>
            <div className="form-group">
              <textarea
                name="nd"
                value={formData.nd}
                onChange={handleChange}
                className="form-control textarea validates-as-required form-control"
                placeholder="Nội dung liên hệ"
              ></textarea>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-control-wrap file-4 custom-file-upload">
                  <input
                    style={{ margin: "0px", height: "37px" }}
                    type="file"
                    name="file-4"
                    size="40"
                    className="form-control file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.odt,.avi,.ogg,.m4a,.mov,.mp3,.mp4,.mpg,.wav,.wmv"
                    aria-invalid="false"
                  />
                </label>
              </div>
              <div className="col">
                <input
                  type="submit"
                  value="Gửi yêu cầu"
                  className="form-control btn btn-primary"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
