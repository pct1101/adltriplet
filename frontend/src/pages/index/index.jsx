import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import Timkiemxe from "./body/timkiemxe";
import Saleoff from "./Slide_Banner/saleoff";
import News from "./header/news";
import "../../css/home.css";
import Slider from "./Slide_Banner/slider";
import Endow from "./Slide_Banner/endow";
import Productlist from "./body/productslist";

function Home() {
  return (
    <div>
      <Header />
      <Slider />
      <Timkiemxe />
      <Saleoff />
      <Productlist />
      <Endow />
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
