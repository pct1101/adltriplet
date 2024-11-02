import React, { useRef, useState } from "react";
import "../../../css/home.css";
import Card from "react-bootstrap/Card";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Placecar() {
  const [swiperRef, setSwiperRef] = useState(null);

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`)
  );
  const [slide, setSlide] = useState([
    "/upload/hcm1.jpg",
    "/upload/hn.jpg",
    "/upload/dn.jpg",
    "/upload/hue.jpg",
    "/upload/pq.jpg",
    "/upload/vt.jpg",
    "/upload/hue.jpg",
    "/upload/pq.jpg",
    "/upload/vt.jpg",
    "/upload/hue.jpg",
    "/upload/pq.jpg",
    "/upload/vt.jpg",
    "/upload/hue.jpg",
    "/upload/pq.jpg",
    "/upload/vt.jpg",
  ]);
  return (
    <div style={{ position: "relative" }} className="container">
      <div className="title mb-4">
        <h1 className="text-center">TOP ĐỊA ĐIỂM NỔI BẬT</h1>
      </div>
      <>
        <Swiper
          className="cartop"
          modules={[Virtual, Navigation, Pagination, Autoplay]}
          onSwiper={setSwiperRef}
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={15}
          navigation={{
            prevEl: ".custom-button-prev",
            nextEl: ".custom-button-next",
          }}
          virtual
          autoplay={{
            delay: 5500, // 2.5 giây mỗi lần chuyển slide
            disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
          }}
          loop={true} // Để kích hoạt loop, slider sẽ quay lại slide đầu khi đến slide cuối
        >
          {slide.map((slideBanner, index) => (
            <SwiperSlide key={slideBanner} virtualIndex={index}>
              <div className="cartop-item">
                <Card.Img variant="sales" src={slideBanner} />
                <p>
                  TP.Hồ Chí Minh <span>3200+ xe chờ</span>{" "}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
}

export default Placecar;
