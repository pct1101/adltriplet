import React from "react";
import "../../../css/index/home.css";

function Register() {
  return (
    <div>
      <div className="section-intro"></div>
      <div className="container d-flex" style={{ borderRadius: "15px" }}>
        <div className="banner-register">
          <img src="/upload/bn.png" />
        </div>
        <div className="form-register">
          <div className="item-register">
            <h1 className="title-form">ĐĂNG KÝ NHẬN TIN</h1>
            <div className="row form-group">
              <div className="col ">
                <span className="form-control-wrap text-54">
                  <input
                    type="text"
                    name="text-54"
                    value=""
                    size="40"
                    className="form-control text form-control"
                    aria-invalid="false"
                    placeholder="Họ tên"
                  />
                </span>
              </div>
              <div className="col">
                <span className="form-control-wrap text-54">
                  <input
                    type="text"
                    name="text-54"
                    value=""
                    size="40"
                    className="form-control text form-control"
                    aria-invalid="false"
                    placeholder="+84 123456789"
                  />
                </span>
              </div>
            </div>
            <div className="form-group">
              <span className="form-control-wrap email-638">
                <input
                  type="email"
                  name="email-638"
                  value=""
                  size="40"
                  className="form-control validates-as-required validates-as-email form-control"
                  aria-required="true"
                  aria-invalid="false"
                  placeholder="Nhập email"
                />
              </span>
            </div>
            <div className="form-group">
              <span className="form-control-wrap textarea-798">
                <textarea
                  name="textarea-798"
                  cols="40"
                  rows="10"
                  className="form-control textarea validates-as-required form-control"
                  aria-required="true"
                  aria-invalid="false"
                  placeholder="Nội dung liên hệ"
                ></textarea>
              </span>
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
                  className="form-control btn btn-primary "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
