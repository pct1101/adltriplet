import React, { useEffect, useState } from "react";
import "../../../css/home.css";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getAllCars } from "../../../lib/Axiosintance";
import { Link } from "react-router-dom";

function Differen_Car() {
  const [swiperRef, setSwiperRef] = useState(null);

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 10 }).map((_, index) => `cars ${index + 1}`)
  );

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

  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K/ngày`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
  };

  // Ví dụ sử dụng
  const rentalPrice = 1126000;
  console.log(formatPrice(rentalPrice)); // Output: "1,126K/ngày"
  return (
    <div>
      <div className="related-car space sec">
        {" "}
        <div style={{ position: "relative" }} className="container">
          <div className="title mb-4">
            <h2 className="text-left">Xe tương tự</h2>
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
              {cars
                .filter((car) => car.car_id >= 1) // Lọc các sản phẩm xe có id lớn hơn hoặc = 1
                .splice(0, 15)
                .map((car, index) => (
                  <SwiperSlide key={cars} virtualIndex={index}>
                    <div className="row">
                      <div className="col">
                        <div className="card mb-4">
                          {/* Sử dụng Link để điều hướng khi click vào ảnh */}
                          <Link to={`/detai_product/${car.car_id}`}>
                            <img
                              src={`/img/${car.car_image}`}
                              // src={car.car_image}
                              className="card-img-top"
                              alt={car.car_name}
                            />
                          </Link>
                          <div className="card-tag">
                            <span className="tag-item transmission">
                              Số tự động
                            </span>
                            <span className="tag-item non-mortgage">
                              Giao xe tận nơi
                            </span>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{car.car_name}</h5>

                            <p className="card-text">
                              <i
                                style={{ paddingRight: "5px" }}
                                className="fa-solid fa-location-dot"
                              ></i>
                              Quận 12, Thành phố Hồ Chí Minh
                            </p>

                            <hr />
                            <p className="card-text d-flex">
                              5.0 ⭐, 20 chuyến{" "}
                              <div className="card-price ms-auto">
                                {formatPrice(car.rental_price)}
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        </div>
      </div>
    </div>
  );
}

export default Differen_Car;
