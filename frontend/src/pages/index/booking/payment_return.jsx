import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function PaymentReturn() {
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
          <a href="/">Trở về</a>{" "}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
