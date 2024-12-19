import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../../css/index/home.css";
import { sendContactMail } from "../../../lib/Axiosintance";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [formData, setFormData] = useState({
    ht: "",
    sdt: "",
    em: "",
    nd: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

      setModalMessage(response.message); // Đặt thông báo thành công
      setShowModal(true); // Hiển thị modal
    } catch (error) {
      setModalMessage("Gửi yêu cầu thất bại. Vui lòng thử lại!"); // Đặt thông báo lỗi
      setShowModal(true); // Hiển thị modal
      console.error(error);
    }
  };

  return (
    <div id="contact">
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

      {/* Modal hiển thị thông báo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
