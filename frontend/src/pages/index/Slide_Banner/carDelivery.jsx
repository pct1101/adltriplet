import React, { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../css/home.css";

function CarDelivery() {
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
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
    "/upload/banner 10.jpg",
  ]);
  return (
    <div>
      <div className="container airport d-flex mt-4">
        <h1 className="airport-head">
          Giao xe tại
          <br />
          sân bay
        </h1>
        <>
          <Swiper
            className="airports"
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
              delay: 10000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {slide.map((slideBanner, index) => (
              <SwiperSlide
                className="airports-slide"
                key={slideBanner}
                virtualIndex={index}
              >
                <div className="airports-item">
                  <div className="fix-img">
                    <img variant="" src={slideBanner} />
                  </div>
                  <p>Vịnh Hạ Lone</p>
                  <span>1000+ xe chờ</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
        <div className="custom-button-prev"></div>
        <div className="custom-button-next"></div>
      </div>
    </div>
  );
}

export default CarDelivery;
