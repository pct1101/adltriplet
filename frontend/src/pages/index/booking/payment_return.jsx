import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalPopup from "../event/popup";

export default function PaymentReturn() {
  const [openModal, setOpenModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDatePicker(false);
  };
  const handleOpenModal = () => {
    setShowDatePicker(true);
  };
  return (
    <div>
      <Header></Header>
      <div className="background-login-signup"></div>
      <div className="container login">
        {" "}
        <div className="tb-success">
          {" "}
          <h1>THANH TOÁN THÀNH CÔNG</h1>{" "}
          <img src="../upload/sucsess.png" alt="Success Image" />{" "}
          <p>Cảm ơn vì đã sử dụng dịch vụ của chúng tôi</p>{" "}
          <a href="/user_car">Xem xe ngay</a>{" "}
          <a onClick={handleOpenModal} href="#">
            Hướng dẫn nhận xe
          </a>{" "}
        </div>
      </div>
      {showDatePicker && (
        <div className="popup-overlay" onClick={() => setShowDatePicker(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="group-title d-flex">
              <h5> Hướng dẫn nhận xe</h5>
              <button
                className="btn btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="line-page"> </div>
            <div className="modal-body-text">
              <div className="block-content">
                {" "}
                <h5>1. Thông Báo Xác Nhận</h5>
                <ul>
                  <li>
                    Sau khi thanh toán, bạn sẽ nhận được email/SMS với các thông
                    tin sau:
                    <ul>
                      <li>Thời gian nhận xe.</li>
                      <li>
                        Địa điểm nhận xe:{" "}
                        <span class="highlight">
                          Văn phòng, bãi xe, hoặc trung tâm giao dịch.
                        </span>
                      </li>
                      <li>Chi tiết xe: Loại xe, biển số, trạng thái.</li>
                      <li>Hotline hỗ trợ.</li>
                    </ul>
                  </li>
                </ul>
                <h5>2. Chuẩn Bị Giấy Tờ</h5>
                <ul>
                  <li>CMND/CCCD hoặc hộ chiếu bản gốc.</li>
                  <li>Bằng lái xe hợp lệ.</li>
                  <li>Biên nhận thanh toán hoặc mã đặt xe.</li>
                </ul>
                <h5>3. Đến Địa Điểm Nhận Xe</h5>
                <ul>
                  <li>Tới đúng thời gian và địa điểm đã được thông báo.</li>
                  <li>
                    Liên hệ nhân viên hỗ trợ tại quầy hoặc điểm giao dịch.
                  </li>
                </ul>
                <h5>4. Kiểm Tra Và Ký Biên Bản</h5>
                <ul>
                  <li>
                    Kiểm tra tình trạng xe:
                    <ul>
                      <li>Bề ngoài và nội thất xe.</li>
                      <li>Nhiên liệu và các thiết bị đi kèm.</li>
                    </ul>
                  </li>
                  <li>Ký biên bản bàn giao hoặc hợp đồng nhận xe.</li>
                </ul>
                <h5>5. Nhận Chìa Khóa Và Khởi Hành</h5>
                <ul>
                  <li>Nhận chìa khóa xe từ nhân viên.</li>
                  <li>Khởi hành và sử dụng dịch vụ.</li>
                </ul>
                <div className="note">
                  <strong>Lưu ý:</strong> Hãy kiểm tra kỹ tình trạng xe và báo
                  ngay nếu có vấn đề.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
      <ModalPopup open={openModal} handleClose={handleCloseModal} />
    </div>
  );
}
