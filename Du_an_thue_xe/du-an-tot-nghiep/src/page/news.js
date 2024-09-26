import React from "react";
import "../css/news.css";

function News() {
  return (
    <div>
      <div className="container my-5">
  <h2 className="text-center mb-4">TIN TỨC HOT ADL TRIPBLE T</h2>
  <div className="row">
    <div className="col-md-4">
      <div className="news-box p-3 mb-4">
        <img src="https://n1-cstg.mioto.vn/g/2024/04/24/15/3I8R33E8.jpg" className="img-fluid mb-3" alt="news" />
        <h5>Thuê xe ô tô tự lái du lịch mùa hè</h5>
        <p className="news-date">25/01/2024</p>
        <p className="news-description">Tự do khám phá và trải nghiệm thú vị khi thuê xe ô tô tự lái vào mùa hè này.</p>
        <a href="#" className="btn btn-outline-primary">Đọc thêm</a>
      </div>
    </div>
    <div className="col-md-4">
      <div className="news-box p-3 mb-4">
        <img src="https://n1-cstg.mioto.vn/g/2024/07/13/17/H6GH3FSR.jpg" className="img-fluid mb-3" alt="news" />
        <h5>Chương trình khuyến mãi dịp lễ lớn</h5>
        <p className="news-date">12/12/2023</p>
        <p className="news-description">Nắm bắt cơ hội khuyến mãi hấp dẫn dành cho khách hàng vào dịp lễ lớn.</p>
        <a href="#" className="btn btn-outline-primary">Đọc thêm</a>
      </div>
    </div>
    <div className="col-md-4">
      <div className="news-box p-3 mb-4">
        <img src="https://n1-cstg.mioto.vn/g/2024/06/23/16/7EPF9XJ9.jpg" className="img-fluid mb-3" alt="news" />
        <h5>Mẹo thuê xe tiết kiệm chi phí</h5>
        <p className="news-date">05/11/2023</p>
        <p className="news-description">Cùng xem những mẹo thuê xe giúp bạn tiết kiệm tối đa chi phí cho chuyến đi của mình.</p>
        <a href="#" className="btn btn-outline-primary">Đọc thêm</a>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default News;
