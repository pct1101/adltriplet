import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCars } from "../../../lib/Axiosintance";
import "../../../css/index/home.css";
import { API_URL_IMG } from "../../../lib/Axiosintance";
import ReactPaginate from "react-paginate";

const Productlist = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 8;

  useEffect(() => {
    // Gọi API để lấy danh sách xe
    getAllCars()
      .then((response) => {
        setCars(response.data.cars);
      })
      .catch((error) => {
        console.error("Error fetching car list:", error);
      });
  }, []);

  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
  };

  // note: Lấy danh sách xe cho trang hiện tại
  const displayedCars = cars.slice(
    currentPage * carsPerPage,
    (currentPage + 1) * carsPerPage
  );

  // note: Xử lý khi người dùng chuyển trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
        <div className="container">
          <div className="col4-mg20">
            {displayedCars.map((car) => (
              <div className="item item-car" key={car.car_id}>
                <div className="item-box">
                  <div className="img-car">
                    <div className="fix-img">
                      {" "}
                      <Link to={`/detai_product/${car.car_id}`}>
                        <img
                          src={`${API_URL_IMG}${car.car_image}`}
                          className="scale-img"
                          alt={car.car_name}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="decs-car">
                    <div className="desc-tag">
                      <span className="tag-item transmission">
                        {car.transmission_type}
                      </span>
                      <span className="tag-item non-mortgage">
                        Giao xe tận nơi
                      </span>
                    </div>
                    <div className="desc-name">
                      <p> {car.car_name} </p>
                    </div>
                    <div className="desc-address-price"></div>
                    <div className="line-page"></div>
                    <div className="desc-info-price">
                      <div className="info">
                        <div className="wrap-svg">
                          <svg
                            className="star-rating"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z"
                              fill="#FFC634"
                            ></path>
                          </svg>
                        </div>
                        <span className="info">5.0</span>
                        <span className="dot">•</span>
                        <div className="wrap-svg">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: " 4px" }}
                          >
                            <g clip-path="url(#clip0_1087_41996)">
                              <path
                                d="M10.0625 1.21875C10.0625 1.06369 10.1887 0.9375 10.3438 0.9375H11.9688C12.1238 0.9375 12.25 1.06369 12.25 1.21875V2.89422H13.1875V1.21875C13.1875 0.546719 12.6408 0 11.9688 0H10.3438C9.67172 0 9.125 0.546719 9.125 1.21875V2.89422H10.0625V1.21875Z"
                                fill="#5FCF86"
                              ></path>
                              <path
                                d="M5.69806 15.0623C5.49325 14.7441 5.375 14.3673 5.375 13.9686V6.94092H1.09375C0.490656 6.94092 0 7.43157 0 8.03467V13.9686C0 14.5186 0.408156 14.9749 0.9375 15.051V15.5309C0.9375 15.7898 1.14737 15.9997 1.40625 15.9997C1.66513 15.9997 1.875 15.7898 1.875 15.5309V15.0623H5.69806V15.0623ZM1.875 8.65967C1.875 8.40079 2.08487 8.19092 2.34375 8.19092C2.60263 8.19092 2.8125 8.40079 2.8125 8.65967V13.3436C2.8125 13.6024 2.60263 13.8123 2.34375 13.8123C2.08487 13.8123 1.875 13.6024 1.875 13.3436V8.65967Z"
                                fill="#5FCF86"
                              ></path>
                              <path
                                d="M4.375 5.26562C4.375 5.11056 4.50119 4.98438 4.65625 4.98438H5.375V4.92547C5.375 4.61094 5.44687 4.31291 5.57506 4.04688H4.65625C3.98422 4.04688 3.4375 4.59359 3.4375 5.26562V6.00359H4.375V5.26562Z"
                                fill="#5FCF86"
                              ></path>
                              <path
                                d="M14.9062 3.83154H7.40625C6.80316 3.83154 6.3125 4.3222 6.3125 4.92529V13.9686C6.3125 14.5186 6.72066 14.9749 7.25 15.051V15.5309C7.25 15.7898 7.45987 15.9997 7.71875 15.9997C7.97763 15.9997 8.1875 15.7898 8.1875 15.5309V15.0623H14.125V15.5309C14.125 15.7898 14.3349 15.9997 14.5938 15.9997C14.8526 15.9997 15.0625 15.7898 15.0625 15.5309V15.051C15.5918 14.9749 16 14.5186 16 13.9686V4.92529C16 4.32217 15.5093 3.83154 14.9062 3.83154ZM9.125 13.3436C9.125 13.6024 8.91513 13.8123 8.65625 13.8123C8.39737 13.8123 8.1875 13.6024 8.1875 13.3436V5.55029C8.1875 5.29142 8.39737 5.08154 8.65625 5.08154C8.91513 5.08154 9.125 5.29142 9.125 5.55029V13.3436ZM13.6562 13.8123C13.3974 13.8123 13.1875 13.6024 13.1875 13.3436V5.55029C13.1875 5.29142 13.3974 5.08154 13.6562 5.08154C13.9151 5.08154 14.125 5.29142 14.125 5.55029V13.3436C14.125 13.6024 13.9151 13.8123 13.6562 13.8123Z"
                                fill="#5FCF86"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_1087_41996">
                                <rect
                                  width="16"
                                  height="16"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <span className="info">100+ chuyến</span>
                      </div>
                      <div className="wrap-price">
                        <div className="price">
                          <span className="price-origin"></span>
                          <span className="price-special ">
                            <span>{formatPrice(car.rental_price)}</span>
                          </span>
                          /ngày
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(cars.length / carsPerPage)} // Tổng số trang
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />{" "}
    </div>
  );
};
export default Productlist;
