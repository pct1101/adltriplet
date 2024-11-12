import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/index/home.css";
import { getAllCars } from "../../../lib/Axiosintance";

const Productlist = () => {
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
    <div className="bgr-products">
      <div className="section-intro"></div>
      <div className="container">
        <div className="title mb-4 mt-4">
          <h1 className="text-center">XE DÀNH CHO BẠN</h1>
          <p className="text-center">
            <span>Nhận nhiều ưu đãi khuyến mãi từ ADL TRIPLE T</span>
          </p>
        </div>
        <div className="row">
          {cars
            .filter((car) => car.car_id >= 1) // Lọc các sản phẩm xe có id lớn hơn hoặc = 1
            .splice(0, 8)
            .map((car) => (
              <div className="col-md-3">
                <div className="card mb-4">
                  {/* Sử dụng Link để điều hướng khi click vào ảnh */}
                  <Link to={`/detai_product/${car.car_id}`}>
                    <img
                      src={`../img/${car.car_image}`}
                      className="card-img-top"
                      alt={car.car_name}
                    />
                  </Link>
                  <div className="card-tag">
                    <span className="tag-item transmission">Số tự động</span>
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
            ))}
        </div>
      </div>
    </div>
  );
};
export default Productlist;
