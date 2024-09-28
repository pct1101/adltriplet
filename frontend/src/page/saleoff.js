import React from "react";
import "../css/saleoff.css";

function Saleoff() {
  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center mb-4">CHƯƠNG TRÌNH KHUYẾN MÃI</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="promo-box text-center p-4 mb-4">
              <h5>Khuyến mãi hè 2024</h5>
              <p>Giảm giá 20% cho các dòng xe cao cấp</p>
              <a href="#" className="btn btn-primary">
                Xem chi tiết
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="promo-box text-center p-4 mb-4">
              <h5>Khuyến mãi cuối năm</h5>
              <p>Giảm giá 15% cho các dòng xe du lịch</p>
              <a href="#" className="btn btn-primary">
                Xem chi tiết
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="promo-box text-center p-4 mb-4">
              <h5>Ưu đãi dành cho khách hàng mới</h5>
              <p>Giảm giá 10% cho lần thuê xe đầu tiên</p>
              <a href="#" className="btn btn-primary">
                Xem chi tiết
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">ƯU ĐIỂM CỦA ADL TRIPBLE T</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="advantage-box text-center p-4 mb-4">
              <h5>Dòng xe đa dạng</h5>
              <p>
                Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn: Mini, Sedan, CUV, SUV,
                MPV, Bán tải.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="advantage-box text-center p-4 mb-4">
              <h5>Thủ tục đơn giản</h5>
              <p>Chỉ cần vài bước đơn giản để hoàn tất thủ tục thuê xe.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="advantage-box text-center p-4 mb-4">
              <h5>An toàn lái xe</h5>
              <p>
                Các dòng xe được kiểm tra kỹ lưỡng để đảm bảo an toàn cho khách
                hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Saleoff;
