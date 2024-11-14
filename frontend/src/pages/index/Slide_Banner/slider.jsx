import Carousel from "react-bootstrap/Carousel";
import "../../../css/index/slider.css";

function Slider() {
  return (
    <div className="banner-section" style={{ marginBottom: "-115px" }}>
      <div className="container-slider">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img src="/upload/slide 3.jpeg" alt="First slide" />
            <Carousel.Caption>
              <h3>Cùng Bạn Đến Mọi Hành Trình</h3>
              <hr />
              <p>
                Trải nghiệm sự khác biệt từ hơn 8000 xe gia đình đời mới khắp
                Việt Nam
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img src="/upload/slide 2.jpeg" alt="Second slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <hr />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/upload/slide 1.webp" alt="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <hr />
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="search-option">
        <div className="option ">
          <div className="option-item active ">
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8Z"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M16.5 19.1538H18.1283C18.9357 19.1538 19.6639 18.6684 19.9744 17.923L20.691 16.2031C20.8893 15.7272 20.8961 15.1931 20.7101 14.7123L18.9946 10.2783C18.6965 9.50789 17.9554 9 17.1293 9H6.87067C6.04458 9 5.30349 9.50789 5.00541 10.2783L3.28991 14.7122C3.10386 15.1931 3.11071 15.7272 3.30903 16.2032L4.0257 17.9231C4.33625 18.6684 5.06446 19.1538 5.87184 19.1538H7.5"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M7.5 18.7857L12 16.5M12 16.5L16.5 18.7857M12 16.5V22"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
                <circle
                  cx="12"
                  cy="17"
                  r="5"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                ></circle>
                <circle
                  cx="12"
                  cy="17"
                  r="1"
                  stroke="#C6C6C6"
                  stroke-width="2"
                ></circle>
              </svg>
            </div>
            <p>Xe tự lái</p>
          </div>
          <div className="option-item ">
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.25 17.1903C22.25 17.6784 21.7539 18.25 20.917 18.25H3.08296C2.24609 18.25 1.75 17.6784 1.75 17.1903V13.8101C1.75 13.3216 2.24625 12.75 3.08296 12.75H20.917C21.7537 12.75 22.25 13.3216 22.25 13.8101L22.25 17.1903Z"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                ></path>
                <path
                  d="M21 13L19.1258 4.56613C18.9224 3.65106 18.1108 3 17.1734 3H6.82657C5.88917 3 5.07754 3.65107 4.87419 4.56614L3 13"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                ></path>
                <path
                  d="M8.5 9.5C9.32843 9.5 10 8.82843 10 8C10 7.17157 9.32843 6.5 8.5 6.5C7.67157 6.5 7 7.17157 7 8C7 8.82843 7.67157 9.5 8.5 9.5Z"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6 12V11.3547C6 10.6041 6.64251 10 7.42995 10H9.57005C10.3623 10 11 10.6087 11 11.3547V12"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15.5 9.5C16.3284 9.5 17 8.82843 17 8C17 7.17157 16.3284 6.5 15.5 6.5C14.6716 6.5 14 7.17157 14 8C14 8.82843 14.6716 9.5 15.5 9.5Z"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M13 12V11.3547C13 10.6041 13.6425 10 14.4299 10H16.5701C17.3623 10 18 10.6087 18 11.3547V12"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4 19V19.6453C4 20.3959 4.64251 21 5.42995 21H7.57005C8.36232 21 9 20.3913 9 19.6453V19"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15 19V19.6453C15 20.3959 15.6425 21 16.4299 21H18.5701C19.3623 21 20 20.3913 20 19.6453V19"
                  stroke="#C6C6C6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <p>Xe có tài xế</p>
          </div>
          <div className="option-item  ">
            <div className="wrap-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.66699 1.6665V4.1665"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M13.333 1.6665V4.1665"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M2.91699 7.5752H17.0837"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18.3337 15.8333C18.3337 16.4583 18.1587 17.05 17.8503 17.55C17.2753 18.5167 16.217 19.1667 15.0003 19.1667C14.1587 19.1667 13.392 18.8583 12.8087 18.3333C12.5503 18.1167 12.3253 17.85 12.1503 17.55C11.842 17.05 11.667 16.4583 11.667 15.8333C11.667 13.9917 13.1587 12.5 15.0003 12.5C16.0003 12.5 16.892 12.9417 17.5003 13.6333C18.017 14.225 18.3337 14.9917 18.3337 15.8333Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M13.6992 15.8333L14.5242 16.6583L16.2992 15.0166"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M17.5 7.08317V13.6332C16.8917 12.9415 16 12.4998 15 12.4998C13.1583 12.4998 11.6667 13.9915 11.6667 15.8332C11.6667 16.4582 11.8417 17.0498 12.15 17.5498C12.325 17.8498 12.55 18.1165 12.8083 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.99609 11.4165H10.0036"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.91211 11.4165H6.91959"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.91211 13.9165H6.91959"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <p>Thuê xe dài hạn</p>
          </div>
        </div>
        <div className="search">
          <div className="search-form sd">
            <div className="search-form__item address">
              <div className="title d-flex">
                <div className="wrap-svg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2.75C8.31 2.75 5.3 5.76 5.3 9.45C5.3 14.03 11.3 20.77 11.55 21.05C11.79 21.32 12.21 21.32 12.45 21.05C12.71 20.77 18.7 14.03 18.7 9.45C18.7 5.76 15.69 2.75 12 2.75Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12.3849 11.7852C13.6776 11.5795 14.5587 10.3647 14.3529 9.07204C14.1472 7.77936 12.9325 6.89824 11.6398 7.104C10.3471 7.30976 9.46597 8.52449 9.67173 9.81717C9.87749 11.1099 11.0922 11.991 12.3849 11.7852Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <p>Địa điểm</p>
              </div>
              <div className="choose">
                <div className="choose-item has-arrow" for="1">
                  <div className="here-autocomplete">
                    <p className="address pointer ">Hồ Chí Minh</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line line-address-time"></div>
            <div className="search-form__item">
              <div className="title  d-flex">
                <div className="wrap-svg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.86 4.81V2.75"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M17.14 4.81V2.75"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M18.05 3.78003H5.95C4.18 3.78003 2.75 5.21003 2.75 6.98003V18.06C2.75 19.83 4.18 21.26 5.95 21.26H18.06C19.83 21.26 21.26 19.83 21.26 18.06V6.98003C21.25 5.21003 19.82 3.78003 18.05 3.78003Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M2.75 7.8999H21.25"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M18 15.49C18.5523 15.49 19 15.0423 19 14.49C19 13.9377 18.5523 13.49 18 13.49C17.4477 13.49 17 13.9377 17 14.49C17 15.0423 17.4477 15.49 18 15.49Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M14 15.49C14.5523 15.49 15 15.0423 15 14.49C15 13.9377 14.5523 13.49 14 13.49C13.4477 13.49 13 13.9377 13 14.49C13 15.0423 13.4477 15.49 14 15.49Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M10 15.49C10.5523 15.49 11 15.0423 11 14.49C11 13.9377 10.5523 13.49 10 13.49C9.44772 13.49 9 13.9377 9 14.49C9 15.0423 9.44772 15.49 10 15.49Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M6 15.49C6.55228 15.49 7 15.0423 7 14.49C7 13.9377 6.55228 13.49 6 13.49C5.44772 13.49 5 13.9377 5 14.49C5 15.0423 5.44772 15.49 6 15.49Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M14 18.97C14.5523 18.97 15 18.5223 15 17.97C15 17.4177 14.5523 16.97 14 16.97C13.4477 16.97 13 17.4177 13 17.97C13 18.5223 13.4477 18.97 14 18.97Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M10 18.97C10.5523 18.97 11 18.5223 11 17.97C11 17.4177 10.5523 16.97 10 16.97C9.44772 16.97 9 17.4177 9 17.97C9 18.5223 9.44772 18.97 10 18.97Z"
                      fill="#767676"
                    ></path>
                    <path
                      d="M6 18.97C6.55228 18.97 7 18.5223 7 17.97C7 17.4177 6.55228 16.97 6 16.97C5.44772 16.97 5 17.4177 5 17.97C5 18.5223 5.44772 18.97 6 18.97Z"
                      fill="#767676"
                    ></path>
                  </svg>
                </div>
                <p>Thời gian thuê</p>
              </div>
              <div className="choose">
                <label className="choose-item has-arrow">
                  <span className="value">
                    21:00, 28/10/2024 - 20:00, 29/10/2024
                  </span>
                </label>
              </div>
            </div>
            <a className="btn btn-primary" target="">
              Tìm Xe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
