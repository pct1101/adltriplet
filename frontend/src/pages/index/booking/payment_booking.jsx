import React, { useEffect, useState } from "react";
import "../../../css/index/payment.css";

function Payment_booking({ closePopup }) {
  return (
    <div>
      {" "}
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="group-title d-flex">
            <h5>Xác Nhận Thông Tin Thanh toán</h5>
            <button className="btn btn-close" onClick={closePopup}></button>
          </div>
          <form className="payment-form" action="">
            <div class="row">
              <div class="col">
                <h3 class="title">Thông tin </h3>
                <div class="inputBox">
                  <span>Họ tên :</span>
                  <input type="text" />
                </div>
                <div class="inputBox">
                  <span>email :</span>
                  <input type="email" />
                </div>
                <div class="inputBox">
                  <span>Địa chỉ :</span>
                  <input type="text" />
                </div>
                <div class="inputBox">
                  <span>Thành phố :</span>
                  <input type="text" />
                </div>

                <div class="flex">
                  <div class="inputBox">
                    <span>Nhận xe :</span>
                    <input type="text" />
                  </div>
                  <div class="inputBox">
                    <span>Trả xe :</span>
                    <input type="text" />
                  </div>
                </div>
              </div>

              <div class="col">
                <h3 class="title">Thanh toán</h3>

                <div class="inputBox">
                  <span>Cổng thanh toán :</span>
                  <img src="../upload/card_img.png" alt="" />
                </div>
                <div class="inputBox">
                  <span>Tên thẻ :</span>
                  <input type="text" placeholder="Nguyễn Văn A" />
                </div>
                <div class="inputBox">
                  <span>Số thẻ :</span>
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

            <input type="submit" value="Thanh toán" class="submit-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment_booking;
