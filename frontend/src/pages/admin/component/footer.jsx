import React from "react";
import "../../../css/admin/css/bootstrap.min.css";
import "../../../css/admin/css/main.css";
import "../../../css/admin/css/fullcalendar.css";
import "../../../css/admin/css/lineicons.css";
import "../../../css/admin/css/materialdesignicons.min.css";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 order-last order-md-first">
              <div className="copyright text-center text-md-start">
                <p className="text-sm">
                  CREATE BY ADL TRIPLE T
                  <a
                    href="https://plainadmin.com"
                    rel="nofollow"
                    target="_blank"
                  ></a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="terms d-flex justify-content-center justify-content-md-end">
                <a href="#0" className="text-sm">
                  Điều khoản và điều kiện
                </a>
                <a href="#0" className="text-sm ml-15">
                  Chính sách riêng tư
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
