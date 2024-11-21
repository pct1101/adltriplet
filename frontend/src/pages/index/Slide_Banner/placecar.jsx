import React, { useEffect, useState } from "react";
import "../../../css/index/home.css";
import Card from "react-bootstrap/Card";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getAllCars } from "../../../lib/Axiosintance";

function Placecar() {
  const [swiperRef, setSwiperRef] = useState(null);

  const [cars, setCars] = useState([]);
  console.log(cars);

  useEffect(() => {
    // Gọi API để lấy danh sách xe
    getAllCars()
      .then((response) => {
        setCars(response.data); // Cập nhật state với dữ liệu nhận được
      })
      .catch((error) => {
        console.error("Error fetching car list:", error);
      });
  }, []);

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`)
  );

  return (
    <div style={{ position: "relative" }} className="container">
      <div className="title mb-4">
        <h1 className="text-center">TOP XE NỔI BẬT</h1>
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
          {cars.map((slideBanner, index) => (
            <SwiperSlide key={slideBanner} virtualIndex={index}>
              <div className="cartop-item">
                <Card.Img
                  variant="sales"
                  src={`http://localhost:8000/imgs/${slideBanner.car_image}`}
                />
                <p>
                  {slideBanner.car_name} <span> {slideBanner.seats} chỗ </span>{" "}
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
