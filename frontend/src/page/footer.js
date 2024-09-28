import React from 'react'
import "../css/footer.css";

function Footer() {
  return (
    <div>
        <footer className="bg-light text-center text-lg-start">
  <div className="container p-4">
    <div className="row">
      <div className="col-lg-4 col-md-6 mb-4">
        <h5 className="text-uppercase">ADL TRIPBLE T</h5>
        <p>Trải nghiệm sự khác biệt từ hơn 8000 xe gia đình đời mới khắp Việt Nam.</p>
      </div>
      <div className="col-lg-4 col-md-6 mb-4">
        <h5 className="text-uppercase">Chính sách</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-dark">Chính sách và quy định</a></li>
          <li><a href="#" className="text-dark">Hướng dẫn chung</a></li>
          <li><a href="#" className="text-dark">Về ADL TRIPBLE T</a></li>
        </ul>
      </div>
      <div className="col-lg-4 col-md-12 mb-4">
        <h5 className="text-uppercase">Liên hệ</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-dark">Tuyển dụng</a></li>
          <li><a href="#" className="text-dark">Hướng dẫn đặt xe</a></li>
          <li><a href="#" className="text-dark">Hướng dẫn thanh toán</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="text-center p-3" style={{ backgroundColor: '#f1f1f1' }}>
    © 2024 ADL TRIPBLE T - All rights reserved.
  </div>
</footer>
    </div>
  )
}

export default Footer
