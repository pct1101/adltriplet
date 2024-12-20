import React from "react";
import "../../../css/index/footer.css";

function Footer() {
  return (
    <div>
      <div className="z-index">
        <footer className="bg-light text-center text-lg-start">
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="logo">
                  {" "}
                  <a className="navbar-brand" href="/">
                    <img
                      style={{ width: "", height: "" }}
                      src="/upload/logo.png"
                    />
                  </a>
                </div>
                <p>CÔNG TY TNHH ADL TRIPEL T</p>
                <p>Hotline 1: 1900 6771</p>
                <p>Hotline 2: 1900 6771</p>
                <p>
                  Đ/c: Tòa T, Công viên phần mềm Quang Trung Quận 12, Thành phố
                  Hồ Chí Minh, Việt Nam.
                </p>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mt-4">
                <h5 className="text-uppercase">Chính sách</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-dark">
                      Chính sách và quy định
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Quy chế hoạt động
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Bảo mật thông tin
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Giải quyết tranh chấp
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mt-4">
                <h5 className="text-uppercase">Tìm hiểu thêm</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-dark">
                      Hướng dẫn chung
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Hướng dẫn đặt xe
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Hướng dẫn thanh toán
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Trả lời câu hỏi
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-12 mb-4 mt-4">
                <h5 className="text-uppercase">Giới thiệu</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-dark">
                      Về ADL TRIPLE T
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      TRIPBLE T Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Tuyển dụng
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-12 mb-4 mt-4">
                <h5 className="text-uppercase">Liên hệ</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-dark">
                      Về ADL TRIPLE T
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      ADL TRIPLE T Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-dark">
                      Tuyển dụng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "#f1f1f1" }}
          >
            © 2024 ADL TRIPLE T - All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
