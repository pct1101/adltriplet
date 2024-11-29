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
import { API_URL_IMG } from "../../../lib/Axiosintance";
function Placecar() {
  const [swiperRef, setSwiperRef] = useState(null);

  const [cars, setCars] = useState([]);

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
          breakpoints={{
            1024: {
              // Khi màn hình >= 1024px
              slidesPerView: 3, // Hiển thị 3 slide
            },
            768: {
              // Khi màn hình >= 768px
              slidesPerView: 2, // Hiển thị 3 slide
            },
            480: {
              // Khi màn hình >= 480px
              slidesPerView: 1, // Hiển thị 2 slide
            },
            0: {
              slidesPerView: 1, // Hiển thị 1 slide
            },
          }}
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
                  src={`${API_URL_IMG}${slideBanner.car_image}`}
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
