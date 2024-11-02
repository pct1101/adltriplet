import React, { useRef, useState } from "react";
import "../../../css/home.css";
import Card from "react-bootstrap/Card";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Saleoff() {
  const [swiperRef, setSwiperRef] = useState(null);

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`)
  );
  const [slide, setSlide] = useState([
    "/upload/banner 1.jpg",
    "/upload/banner 2.jpg",
    "/upload/banner 3.jpg",
    "/upload/banner 4.jpg",
    "/upload/banner 5.jpg",
    "/upload/banner 6.jpg",
    "/upload/banner 7.jpg",
    "/upload/banner 8.jpg",
    "/upload/banner 9.jpg",
    "/upload/banner 10.jpg",
  ]);
  return (
    <div>
      <div style={{ position: "relative" }} className="container">
        <div className="title mb-4">
          <h1 className="text-center">CHƯƠNG TRÌNH KHUYẾN MÃI</h1>
          <p className="text-center">
            <span>Nhận nhiều ưu đãi khuyến mãi từ ADL TRIPLE T</span>
          </p>
        </div>
        <>
          <Swiper
            modules={[Virtual, Navigation, Pagination, Autoplay]}
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={30}
            navigation={{
              prevEl: ".custom-button-prev",
              nextEl: ".custom-button-next",
            }}
            virtual
            autoplay={{
              delay: 3500, // 2.5 giây mỗi lần chuyển slide
              disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
            }}
            loop={true} // Để kích hoạt loop, slider sẽ quay lại slide đầu khi đến slide cuối
          >
            {slide.map((slideBanner, index) => (
              <SwiperSlide key={slideBanner} virtualIndex={index}>
                <div className="">
                  <Card.Img variant="sales" src={slideBanner} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </div>
  );
}

export default Saleoff;
