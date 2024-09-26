import React from "react";
import Header from "./header";
import Footer from "./footer";
import Timkiemxe from "./timkiemxe";
import Sanphamlist from "./sanphamlist";
import Saleoff from "./saleoff";
import News from "./news";
import "../css/home.css";
function Home() {
  return (
    <div>
      <Header />
      <div className="banner-container1">
          <div className="banner-content text-center">
            <h1>Cùng Bạn Đến Mọi Hành Trình</h1>
            <hr />
            <p>
              Trải nghiệm sự khác biệt từ hơn 8000 xe gia đình đời mới khắp Việt Nam
            </p>
        </div>
      </div>
      <Timkiemxe />
      <Sanphamlist />
      <Saleoff />
      <div className="banner-container2">
          <div className="banner-content text-center">
            <h1>BẠN ĐÃ SẲN SÀNG ĐỂ BẮT ĐẦU CUỘC HÀNH TRÌNH !</h1>
            <hr />
            <p>
            Tự tay cầm lái chiếc xe bạn yêu thích cho hành trình thêm hứng khởi
            </p>
            <a href="#" className="btn btn-success">
                  Thuê xe ngay
            </a>
        </div>
      </div>
      <News />
      <Footer />
    </div>
  );
}

export default Home;
