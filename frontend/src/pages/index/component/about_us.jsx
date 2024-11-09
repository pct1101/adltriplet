import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "../../../css/index/home.css";
import Banner_top from "../Slide_Banner/banner_top";
import Endow from "./endow";

function Blog() {
  return (
    <div>
      <Header></Header>
      <div className="about-margin">
        <div className="container about-us">
          <div className="title about-us">
            <h1 className="text-center">SƠ LƯỢC VỀ ADL TRIPBEL T</h1>
            <p className="text-center">
              <span>Hành trình phát triễn & và câu chuyện thành lập</span>
            </p>
          </div>
          <div className="content-about">
            <div className="row">
              <div className="col">
                <h2>
                  ADL TRIPLE T -Trải nghiệm tốt nhất trên những cung đường{" "}
                </h2>
              </div>
              <div className="col">
                <p>
                  Chào mừng bạn đến với ADL TripleT - Nơi hiện thực hóa những
                  chuyến đi an toàn và thoải mái, tạo nên những trải nghiệm di
                  chuyển đẳng cấp. Chúng tôi tự hào là địa chỉ đáng tin cậy cho
                  những ai đang tìm kiếm dịch vụ cho thuê xe chuyên nghiệp và
                  tiện lợi, đáp ứng nhu cầu di chuyển cá nhân, gia đình hay
                  doanh nghiệp.
                </p>
              </div>
            </div>
            <div className="container">
              <img className="about-img scale-img" src="/upload/about.png" />
            </div>
            <div className="row" style={{ position: "relative", top: "15px" }}>
              <div className="col">
                <p>
                  Ngoài ra, ADL TripleT còn tự hào về việc cung cấp các gói dịch
                  vụ thuê xe dài hạn cho doanh nghiệp, du lịch hoặc sự kiện.
                  Chúng tôi luôn ưu tiên chất lượng và sự tiện lợi để đảm bảo
                  rằng mọi khách hàng đều có thể tận hưởng sự phục vụ tốt nhất
                  ngay từ khi bắt đầu chuyến đi.
                </p>
              </div>
              <div className="col">
                <h2 style={{ textAlign: "right" }}>
                  ADL TRIPLE T -Dịch vụ tốt nhất <br /> dành cho khách hàng{" "}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className="content-margin"
          style={{ position: "relative", top: "105px" }}
        >
          <Endow></Endow>
          <Banner_top></Banner_top>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default Blog;
