import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/home.css";
import axios from "axios";


const API_URL = 'http://localhost:8000/api';

// Hàm gọi API để lấy danh sách xe
export const getAllCars = () => {
  return axios.get(`${API_URL}/sp`);
};

const Productlist = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách xe
    getAllCars()
      .then(response => {
        setCars(response.data); // Cập nhật state với dữ liệu nhận được
      })
      .catch(error => {
        console.error('Error fetching car list:', error);
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
      <div className="container">
        <div className="title mb-4 mt-4">
          <h1 className="text-center">XE DÀNH CHO BẠN</h1>
          <p className="text-center">
            <span>Nhận nhiều ưu đãi khuyến mãi từ ADL TRIPLE T</span>
          </p>
        </div>
        <div className="row">
          {cars.map(car => (
            <div className="col-md-3">
              <div className="card mb-4">
                {/* Sử dụng Link để điều hướng khi click vào ảnh */}
                <Link to={`/chitietsanpham/${car.car_id}`}>
                  <img
                    src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                    className="card-img-top"
                    alt="Car"
                  />
                </Link>
                <div className="card-tag">
                  <span className="tag-item transmission">Số tự động</span>
                  <span className="tag-item non-mortgage">Giao xe tận nơi</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{car.car_name}</h5>
                  <p className="card-text">
                    {car.seats} chỗ, 5.0 ⭐, 20 chuyến, {formatPrice(car.rental_price)}
                  </p>
                  <hr />
                  <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>{" "}
          <div className="col-md-3">
            <div className="card mb-4">
              <img
                src="https://mercedesnhatrangvn.com/wp-content/uploads/2022/07/Mercedes-Maybach-S-680-4matic.jpg"
                className="card-img-top"
                alt="Car"
              />
              <div className="card-tag">
                <span className="tag-item transmission">Số tự động</span>
                <span className="tag-item non-mortgage">Giao xe tận nơi</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">MAYBACH-MERCEDES S 680</h5>
                <p className="card-text">
                  5 chỗ, 5.0 ⭐, 20 chuyến, 1,126K/ngày
                </p>
                <hr />
                <p className="card-text">Quận 12, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div> */}
          {/* Thêm các card tương tự cho các xe khác */}
        </div>
      </div>
    </div>
  );
}
export default Productlist;
