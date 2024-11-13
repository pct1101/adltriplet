import ModalPopup from "../event/popup";
import React, { useEffect, useState } from "react";
import "../../../css/index/payment.css";

function Payment_booking() {
  const [openModal, setOpenModal] = useState(false); // Quản lý trạng thái hiển thị modal
  const [modalMessage, setModalMessage] = useState(""); // Lưu trữ thông điệp modal
  const [modalType, setModalType] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      {" "}
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="group-title d-flex">
            <h5>Thanh toán</h5>
            <button
              className="btn btn-close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <form action="">
            <div class="row">
              <div class="col">
                <h3 class="title">billing address</h3>
                <div class="inputBox">
                  <span>full name :</span>
                  <input type="text" placeholder="john deo" />
                </div>
                <div class="inputBox">
                  <span>email :</span>
                  <input type="email" placeholder="example@example.com" />
                </div>
                <div class="inputBox">
                  <span>address :</span>
                  <input type="text" placeholder="room - street - locality" />
                </div>
                <div class="inputBox">
                  <span>city :</span>
                  <input type="text" placeholder="mumbai" />
                </div>

                <div class="flex">
                  <div class="inputBox">
                    <span>state :</span>
                    <input type="text" placeholder="india" />
                  </div>
                  <div class="inputBox">
                    <span>zip code :</span>
                    <input type="text" placeholder="123 456" />
                  </div>
                </div>
              </div>

              <div class="col">
                <h3 class="title">payment</h3>

                <div class="inputBox">
                  <span>cards accepted :</span>
                  <img src="../upload/card_img.png" alt="" />
                </div>
                <div class="inputBox">
                  <span>name on card :</span>
                  <input type="text" placeholder="mr. john deo" />
                </div>
                <div class="inputBox">
                  <span>credit card number :</span>
                  <input type="number" placeholder="1111-2222-3333-4444" />
                </div>
                <div class="inputBox">
                  <span>exp month :</span>
                  <input type="text" placeholder="january" />
                </div>

                <div class="flex">
                  <div class="inputBox">
                    <span>exp year :</span>
                    <input type="number" placeholder="2022" />
                  </div>
                  <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234" />
                  </div>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="proceed to checkout"
              class="submit-btn"
            />
          </form>
        </div>
      </div>
      <ModalPopup
        open={openModal}
        handleClose={handleCloseModal}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
}

export default Payment_booking;
