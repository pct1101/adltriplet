import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import "../../../css/user/user.css";
import { format } from "date-fns";
import { getUserProfile } from "../../../lib/Axiosintance";
import Side_bar from "./side_bar";
import Gplx from "./gplx";
import Loading from "../event/loading";

function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        setError("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Nếu đang tải, hiển thị loading
  if (loading) {
    return <div>{isLoading && <Loading />} </div>;
  }

  // Nếu có lỗi, hiển thị lỗi
  if (error) {
    return <div>{error}</div>;
  }

  const formatDate = (date) => {
    // Kiểm tra nếu birth_date hợp lệ
    if (date) {
      try {
        return format(new Date(date), "dd/MM/yyyy"); // Định dạng lại ngày
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Ngày không hợp lệ";
      }
    }
    return "Chưa có thông tin"; // Trường hợp không có ngày sinh
  };
  return (
    <div>
      <Header></Header>
      <div className="container user">
        <div className="background-login-signup"></div>
        <div className="group-user">
          <div className="right-user">
            <Side_bar></Side_bar>
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
                      src={`http://localhost:8000/imgs_user/${userData.image}`}
                    />
                  </div>
                </div>
                <div className="info-user">
                  <h6> {userData?.name}</h6>
                  <p className="note">
                    Tham gia:{" "}
                    {new Date(userData?.created_at).toLocaleDateString("en-GB")}
                  </p>
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
                        {userData?.phone}
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
                        {userData?.email}
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
            <Gplx></Gplx>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default User;
