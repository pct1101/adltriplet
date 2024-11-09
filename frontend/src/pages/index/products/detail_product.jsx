import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import component
import Header from "../header/header";
import Footer from "../footer/footer";
import Differen_Car from "../Slide_Banner/differen_Car";
// import api car
import { getCarDetails, getCarImagesByCarId } from "../../../lib/Axiosintance";
// import css
import "../../../css/index/popup_product.css";
import "../../../css/index/home.css";

import Booking from "../booking/booking";

const Detail_product = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [carImages, setCarImages] = useState([]);

  // Gọi API để lấy thông tin chi tiết xe
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarDetails(id);
        console.log(response.data.car);
        setCar(response.data.car); // Cập nhật để lấy dữ liệu của thuộc tính car
        const imageResponse = await getCarImagesByCarId(
          response.data.car.car_id
        ); // Cập nhật để lấy car_id từ response.data.car
        setCarImages(imageResponse.data); // Lưu trữ hình ảnh con vào state
      } catch (error) {
        console.error("Error fetching car details", error);
      }
    };
    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }
  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K/ngày`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className=" product-detail">
          {" "}
          <div className="main-item">
            <div className="left">
              {/* Hiển thị ảnh chính của xe */}
              <img
                className="scale-img"
                alt="Main Image"
                src="../img/anh1-x1.jpg"
              />
            </div>
            <div className="right">
              {/* Hiển thị các ảnh con */}
              {carImages.map((image, index) => (
                <div className="right-item-car">
                  <img className="scale-img" src="../img/anh1-x1.jpg" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sub-item">
          <div className="group-left">
            <div className="title">
              <h1>{car?.car_name}</h1>
            </div>
            <div className="group-total">
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
                  Style={{}}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "4px" }}
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
                      <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="info">34 chuyến</span>
              <span className="dot">•</span>
              <span className="info">Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div className="group-tag">
              <span className="tag-item transmission">Số tự động</span>
            </div>
            <div className="content-detail">
              <div className="line-page"></div>
              <div className="info-car-decs">
                <h6>Đặc điểm</h6>
                <div className="outstanding-features">
                  <div className="outstanding-features__item">
                    <div className="wrap-svg">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <circle
                          cx="23.9997"
                          cy="23.9999"
                          r="1.91667"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <circle
                          cx="7.99967"
                          cy="7.99992"
                          r="1.91667"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z"
                          fill="#5FCF86"
                        ></path>
                        <path
                          d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div className="title">
                      <p className="sub">Truyền động</p>
                      <p className="main">Số tự động</p>
                    </div>
                  </div>
                  <div className="outstanding-features__item">
                    <div className="wrap-svg">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M14.667 7.35815V9.8901"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M17.334 7.35815V9.8901"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                      </svg>
                    </div>
                    <div className="title">
                      <p className="sub">Số ghế</p>
                      <p className="main">{car?.seats}</p>
                    </div>
                  </div>
                  <div className="outstanding-features__item">
                    <div className="wrap-svg">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M12.0001 5.33325L7.42285 9.46712"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div className="title">
                      <p className="sub">Nhiên liệu</p>
                      <p className="main">Xăng</p>
                    </div>
                  </div>
                  <div className="outstanding-features__item">
                    <div className="wrap-svg">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.41667 24V23.25H6.66667H4.75V18.0833H6.66667H7.41667V17.3333V15.4167H9.33333H9.64399L9.86366 15.197L12.3107 12.75H24.5833V23.25H22.6667H22.356L22.1363 23.4697L19.6893 25.9167H7.41667V24Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M24 21.3333H28"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M24 18.6665H28"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M15.417 7.33325C15.417 6.6429 15.9766 6.08325 16.667 6.08325H20.667C21.3573 6.08325 21.917 6.6429 21.917 7.33325V8.58325H15.417V7.33325Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M17.333 9.33325V11.9999M19.9997 9.33325V11.9999"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M4.66699 26.01L4.66699 15.3308"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M27.3291 23.3384L27.3291 16.6704"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div className="title">
                      <p className="sub">Tiêu hao</p>
                      <p className="main">8L/100km</p>
                    </div>
                  </div>
                </div>
                <div className="line-page"></div>
                <div className="info-car-desc">
                  <h6>Mô tả</h6>
                  <pre className="">{car?.car_description}</pre>
                </div>
                <div className="line-page"></div>
                <div className="info-car-desc">
                  <h6 className="df-align-center">Giấy tờ thuê xe</h6>
                  <div className="required-papers">
                    <div className="required-papers__item width-100">
                      <div className="type_item">
                        {" "}
                        <p className="font-12">Chọn 1 trong 2 hình thức</p>
                      </div>
                      <div className="type-content">
                        <img
                          loading="lazy"
                          src="https://n1-cstg.mioto.vn/v4/p/m/icons/papers/gplx_cccd.png"
                        />
                        <div className="type-name">
                          <p>GPLX (đối chiếu) &amp; CCCD (đối chiếu VNeID)</p>
                        </div>
                      </div>
                      <div className="type-content">
                        <img
                          loading="lazy"
                          src="https://n1-cstg.mioto.vn/v4/p/m/icons/papers/gplx_passport.png"
                        />
                        <div className="type-name">
                          <p>GPLX (đối chiếu) &amp; Passport (giữ lại)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-car-desc">
                  <h6 className="df-align-center">
                    Tài sản thế chấp
                    <span className="tooltip tooltip--m icon--m">
                      <span className="wrap-svg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M12 17H12.01"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </span>
                  </h6>
                  <div className="required-papers">
                    <p>
                      Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy
                    </p>
                  </div>
                </div>
                <div className="info-car-desc">
                  <div className="reviews">
                    {" "}
                    <div className="rate-review">
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
                      <p className="rate">5.0</p>
                      <span className="dot">•</span>
                      <p className="total-review">12 đánh giá</p>
                    </div>
                  </div>

                  <div className="list-reviews">
                    <div className="item-review">
                      <div className="profile">
                        <div className="desc">
                          <a href="#" className="avatar avatar--m">
                            <img src="/upload/avatar-4.png" alt="" />
                          </a>
                          <div className="info">
                            <a href="#" className="name-review">
                              <h6>Hồ Ngọc Thịnh</h6>
                            </a>
                            <div className="rate">
                              <div
                                className="star-ratings"
                                title="5 Stars"
                                style={{
                                  position: "relative",
                                  boxSizing: "border-box",
                                  display: "inline-block",
                                }}
                              >
                                <svg
                                  className="star-grad"
                                  style={{
                                    position: "absolute",
                                    zIndex: "0",
                                    width: "0px",
                                    height: " 0px",
                                    visibility: "hidden",
                                  }}
                                >
                                  <defs>
                                    <linearGradient
                                      id="starGrad720871329940590"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="0%"
                                    >
                                      <stop
                                        offset="0%"
                                        className="stop-color-first"
                                        style={{
                                          stopColor: "rgb(255, 198, 52)",
                                          stopOpacity: "1",
                                        }}
                                      ></stop>
                                      <stop
                                        offset="0%"
                                        className="stop-color-first"
                                        style={{
                                          stopColor: "rgb(255, 198, 52)",
                                          stopOpacity: "1",
                                        }}
                                      ></stop>
                                      <stop
                                        offset="0%"
                                        className="stop-color-final"
                                        style={{
                                          stopColor: "rgb(255, 198, 52)",
                                          stopOpacity: "1",
                                        }}
                                      ></stop>
                                      <stop
                                        offset="100%"
                                        className="stop-color-final"
                                        style={{
                                          stopColor: "rgb(255, 198, 52)",
                                          stopOpacity: "1",
                                        }}
                                      ></stop>
                                    </linearGradient>
                                  </defs>
                                </svg>

                                <div
                                  className="star-container"
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    paddingRight: "1px",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 51 48"
                                    className="widget-svg"
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    <path
                                      className="star"
                                      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                      style={{
                                        fill: "rgb(255, 198, 52)",
                                        transition: "fill 0.2s ease-in-out",
                                      }}
                                    ></path>
                                  </svg>
                                </div>
                                <div
                                  className="star-container"
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    paddingRight: "1px",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 51 48"
                                    className="widget-svg"
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    <path
                                      className="star"
                                      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                      style={{
                                        fill: "rgb(255, 198, 52)",
                                        transition: "fill 0.2s ease-in-out",
                                      }}
                                    ></path>
                                  </svg>
                                </div>
                                <div
                                  className="star-container"
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    paddingRight: "1px",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 51 48"
                                    className="widget-svg"
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    <path
                                      className="star"
                                      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                      style={{
                                        fill: "rgb(255, 198, 52)",
                                        transition: "fill 0.2s ease-in-out",
                                      }}
                                    ></path>
                                  </svg>
                                </div>
                                <div
                                  className="star-container"
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    paddingRight: "1px",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 51 48"
                                    className="widget-svg"
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    <path
                                      className="star"
                                      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                      style={{
                                        fill: "rgb(255, 198, 52)",
                                        transition: "fill 0.2s ease-in-out",
                                      }}
                                    ></path>
                                  </svg>
                                </div>
                                <div
                                  className="star-container"
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    paddingRight: "1px",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 51 48"
                                    className="widget-svg"
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    <path
                                      className="star"
                                      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                                      style={{
                                        fill: "rgb(255, 198, 52)",
                                        transition: "fill 0.2s ease-in-out",
                                      }}
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                              <p className="time">09/08/2024</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <pre className="main-review">
                        Chủ xe nhiệt tình,thoải mái. Giá xe mềm, xe chạy khá
                        okie😊
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group-right">
            <Booking></Booking>
          </div>
        </div>
      </div>
      <Differen_Car></Differen_Car>
      <Footer />
    </div>
  );
};

export default Detail_product;
