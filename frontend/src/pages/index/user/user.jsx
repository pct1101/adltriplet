import React from "react";
import Footer from "../footer/footer";
import Headers from "../header/header";
import "../../../css/user.css";
function user() {
  return (
    <div>
      <Headers></Headers>
      <div className="container user">
        <div className="background-login-signup"></div>
        <div className="group-user">
          <div className="right-user">
            <div className="sidebar flex-column flex-shrink-0 p-3 bg-light mb-3">
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
              >
                <svg className="bi me-2" width="40" height="32">
                  <use href="#bootstrap" />
                </svg>
                <span className="fs-4">Xin chào bạn !!!</span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <a href="#" className="nav-link active1" aria-current="page">
                    <svg className="bi me-2" width="16" height="16">
                      <use href="#home" />{" "}
                    </svg>
                    Tài khoản của tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link link-dark">
                    <svg className="bi me-2" width="16" height="16">
                      <use href="#test 1" />{" "}
                    </svg>
                    Xe Yêu thích
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link link-dark">
                    <svg className="bi me-2" width="16" height="16">
                      <use href="#test2" />{" "}
                    </svg>
                    đơn hàng của tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link link-dark">
                    <svg className="bi me-2" width="16" height="16">
                      <use href="#test3" />{" "}
                    </svg>
                    Đổi mật khẩu
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link link-dark">
                    <svg className="bi me-2" width="16" height="16">
                      <use href="#test 4" />{" "}
                    </svg>
                    Customers
                  </a>
                </li>
              </ul>
              <hr />
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <strong>mdo</strong>
                </a>
                <ul
                  className="dropdown-menu text-small shadow"
                  aria-labelledby="dropdownUser2"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="left-user">
            <div className="content-item user-profile">
              <div className="title">
                <div className="title-edit">
                  <h5>Thông tin tài khoản</h5>
                  <div className="wrap-svg">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M10.2344 4.08789L11.9144 5.76788"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="avatar-box">
                  <div className="avatar avatar--xl has-edit">
                    <img
                      className="scale-img"
                      src="https://n1-astg.mioto.vn/g/2024/10/04/17/aA9ESIVq66pc84S2PGAPgA.jpg"
                    />
                  </div>
                </div>
                <div className="info-user">
                  <h6>Nguyễn Hoàng AN</h6>
                  <p className="note">Tham gia: 04/11/2024</p>
                  <div className="info-desc">
                    <div className="info-desc__item">
                      <div className="title-item">
                        Số điện thoại
                        <div className="note success">
                          <div className="wrap-svg">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.795 5.295L6.035 7.055C5.96 7.13 5.865 7.165 5.77 7.165C5.675 7.165 5.575 7.13 5.505 7.055L4.625 6.175C4.475 6.03 4.475 5.79 4.625 5.645C4.77 5.5 5.01 5.5 5.155 5.645L5.77 6.26L7.265 4.765C7.41 4.62 7.645 4.62 7.795 4.765C7.94 4.91 7.94 5.15 7.795 5.295Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          Đã xác thực
                        </div>
                      </div>
                      <div className="name">
                        Thêm số điện thoại
                        <div className="wrap-svg">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M10.2344 4.08789L11.9144 5.76788"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="info-desc__item">
                      <div className="title-item">
                        Email
                        <div className="note success">
                          <div className="wrap-svg">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.795 5.295L6.035 7.055C5.96 7.13 5.865 7.165 5.77 7.165C5.675 7.165 5.575 7.13 5.505 7.055L4.625 6.175C4.475 6.03 4.475 5.79 4.625 5.645C4.77 5.5 5.01 5.5 5.155 5.645L5.77 6.26L7.265 4.765C7.41 4.62 7.645 4.62 7.795 4.765C7.94 4.91 7.94 5.15 7.795 5.295Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          Đã xác thực
                        </div>
                      </div>
                      <div className="name">
                        hongocthinh1912004@gmail.com
                        <div className="wrap-svg">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M10.2344 4.08789L11.9144 5.76788"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="info-desc__item">
                      <div className="title-item">Facebook</div>
                      <div className="name">
                        Thêm liên kết
                        <div className="wrap-svg">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.36 6.18005L15.62 3.92006C16.85 2.69006 18.85 2.69006 20.08 3.92006C21.31 5.15006 21.31 7.15007 20.08 8.38007L14.66 13.8001C13.43 15.0301 11.43 15.0301 10.2 13.8001"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M10.64 17.8201L8.38 20.0801C7.15 21.3101 5.15 21.3101 3.92 20.0801C2.69 18.8501 2.69 16.8501 3.92 15.6201L9.34 10.2001C10.57 8.97009 12.57 8.97009 13.8 10.2001"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="info-desc__item">
                      <div className="title-item">Google</div>
                      <div className="name">
                        Thịnh Hồ
                        <div className="name">
                          <div className="wrap-svg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M14.1203 14.1199L18.3603 9.87994C19.5303 8.70994 19.5303 6.80995 18.3603 5.63995C17.1903 4.46995 15.2903 4.46995 14.1203 5.63995L10.0303 9.72995"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M8.0002 11.76L5.6402 14.12C4.4702 15.29 4.4702 17.19 5.6402 18.36C6.8102 19.53 8.7102 19.53 9.8802 18.36L12.2502 15.99"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M7 7L17 17"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-item driver-license">
              <div className="title">
                <div className="title-item">
                  <h6>Giấy phép lái xe</h6>
                  <div className="title-item__info error">
                    <div className="wrap-svg">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.21001 6.695C7.36001 6.845 7.35501 7.08 7.21001 7.225C7.13501 7.295 7.04001 7.335 6.94501 7.335C6.85001 7.335 6.74999 7.295 6.67999 7.22L6 6.535L5.325 7.22C5.25 7.295 5.15499 7.335 5.05499 7.335C4.95999 7.335 4.865 7.295 4.795 7.225C4.645 7.08 4.64499 6.845 4.78999 6.695L5.47501 6L4.78999 5.305C4.64499 5.155 4.645 4.92 4.795 4.775C4.94 4.63 5.18 4.63 5.325 4.78L6 5.465L6.67999 4.78C6.82499 4.63 7.06001 4.63 7.21001 4.775C7.35501 4.92 7.36001 5.155 7.21001 5.305L6.52499 6L7.21001 6.695Z"
                          fill="#F04438"
                        ></path>
                      </svg>
                    </div>
                    Chưa xác thực
                  </div>
                </div>
                <a className="btn btn--s">
                  Chỉnh sửa
                  <div className="wrap-svg">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M10.2344 4.08789L11.9144 5.76788"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
              <div className="note-license">
                <p>
                  <b>Lưu ý: </b> để tránh phát sinh vấn đề trong quá trình thuê
                  xe, <u>người đặt xe</u> trên Mioto (đã xác thực GPLX){" "}
                  <b>ĐỒNG THỜI </b>phải là <u>người nhận xe.</u>
                </p>
              </div>
              <div className="content">
                <div className="info-license position-relative">
                  <div className="info-license__title">
                    <p>Hình ảnh</p>
                  </div>
                  <label className="info-license__img  ">
                    <div className="fix-img-content">
                      <img
                        loading="lazy"
                        className="img-license"
                        src="/upload/upload.png"
                      />
                    </div>
                  </label>
                </div>
                <div className="info-license">
                  <div className="info-license__title">
                    <p>Thông tin chung</p>
                  </div>
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Số GPLX</p>
                      </div>
                      <div className="desc text-success"></div>
                    </div>
                    <div className="wrap-input disabled">
                      <div className="wrap-text">
                        <input
                          type="text"
                          name="licenseNumber"
                          placeholder="Nhập số GPLX đã cấp"
                          value=""
                          disabled=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Họ và tên</p>
                      </div>
                      <div className="desc text-success"></div>
                    </div>
                    <div className="wrap-input disabled">
                      <div className="wrap-text">
                        <input
                          type="text"
                          name="licenseName"
                          placeholder="Nhập đầy đủ họ tên"
                          value=""
                          disabled=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="custom-input">
                    <div className="wrap-info">
                      <div className="title-status">
                        <p>Ngày sinh</p>
                      </div>
                      <div className="desc text-success"></div>
                    </div>
                    <div className="wrap-input disabled">
                      <div className="wrap-text">
                        <span>01-01-1970</span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default user;
