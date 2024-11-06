import React from "react";

function Services() {
  return (
    <div className="container">
      <div className="title mb-4">
        <h1 className="text-center">DỊCH VỤ ADL TRIPLE T</h1>
        <p className="text-center">
          <span>Nhận nhiều ưu đãi khuyến mãi từ ADL TRIPLE T</span>
        </p>
      </div>
      <div className="container servicers">
        <div className="servicers-left">
          <img src="/upload/dv.png" />
          <div className="content-servicers-left">
            <h3>
              Xe đã sẵn sàng. <br /> Bắt đầu hành trình ngay!
            </h3>
            <p>
              Tự tay cầm lái chiếc xe bạn yêu thích <br /> cho hành trình thêm
              hứng khởi.
            </p>
            <a className="btn btn-primary btn--l">Thuê xe tự lái</a>
          </div>
        </div>
        <div className="servicers-right">
          <img src="/upload/sv2.jpg" />
          <div className="content-servicers-right">
            <h3>Tài xế của bạn đã đến!</h3>
            <p>
              Chuyến đi thêm thú vị <br /> cùng các bác tài 5* trên Mioto.
            </p>
            <a className="btn btn-primary btn--l">Thuê xe có tài</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
