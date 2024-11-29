import React from "react";
import "../../../css/index/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
function News() {
  return (
    <div className="section-intro">
      <div className="wrapper-content ">
        <div className="container-news">
          <div className="intro-left">
            <div className="section-heading">
              <h2 className="title">Tin tức &amp; Sự kiện</h2>
              <h3>Về ADL TRIPLE T</h3>
            </div>
            <div className="newstop">
              <div className="left-news">
                <div className="item">
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="news-detail mc-gap-10"
                    href="#"
                    title="Thuê xe ô tô tự lái du lịch mùa hè: Tự do khám phá và trãi nghiệm thú vị"
                  >
                    <div className="images scale-img">
                      <img
                        className="w-100"
                        onerror="this.src='thumbs/377x284x2/assets/images/noimage.png';"
                        src="/upload/tt.png"
                        alt=""
                        style={{ borderRadius: "15px" }}
                      />
                    </div>
                    <div className="info-news">
                      <h3 className="name text-split transition">
                        Thuê xe ô tô tự lái du lịch mùa hè: Tự do khám phá và
                        trãi nghiệm thú vị
                      </h3>
                      <div className="news-date">11/09/2023 </div>
                      <p className="desc text-split transition">
                        Thuê xe ô tô tự lái du lịch mùa hè: Tự do khám phá và
                        trãi nghiệm thú vịThuê xe ô tô tự lái du lịch mùa hè: Tự
                        do khám phá và trãi nghiệm thú vị
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="right-news">
                {" "}
                <Swiper
                  slidesPerView={3}
                  spaceBetween={15}
                  direction={"vertical"}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                  style={{ height: "468px" }}
                >
                  <SwiperSlide>
                    <div className="item">
                      <div className="news-item">
                        <a
                          className="news-item-inner"
                          href="#"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="news-img">
                            <div className="news-img-inner scale-img">
                              <img
                                className=" w-100"
                                src="/upload/slide 1.webp"
                                alt=""
                                style={{ borderRadius: "15px" }}
                              />
                            </div>
                          </div>
                          <div className="news-info">
                            <div className="news-info-inner">
                              <h3 className="news-name text-split">
                                Đáp ứng nhu cầu ẩm thực hiện đại
                              </h3>
                              <p className="news-date">11/09/2023</p>
                              <div className="news-desc text-split">
                                Trong thế kỷ 21 hiện nay, với cuộc sống bận rộn
                                và áp lực công việc ngày càng gia tăng, việc
                                chuẩn bị và nấu ăn hàng ngày trở nên khó khăn
                                đối với nhiều người.{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>{" "}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item">
                      <div className="news-item">
                        <a
                          className="news-item-inner"
                          href="#"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="news-img">
                            <div className="news-img-inner scale-img">
                              <img
                                className=" w-100"
                                src="/upload/slide 1.webp"
                                alt=""
                                style={{ borderRadius: "15px" }}
                              />
                            </div>
                          </div>
                          <div className="news-info">
                            <div className="news-info-inner">
                              <h3 className="news-name text-split">
                                Đáp ứng nhu cầu ẩm thực hiện đại
                              </h3>
                              <p className="news-date">11/09/2023</p>
                              <div className="news-desc text-split">
                                Trong thế kỷ 21 hiện nay, với cuộc sống bận rộn
                                và áp lực công việc ngày càng gia tăng, việc
                                chuẩn bị và nấu ăn hàng ngày trở nên khó khăn
                                đối với nhiều người.{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>{" "}
                    </div>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <div className="item">
                      <div className="news-item">
                        <a
                          className="news-item-inner"
                          href="#"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="news-img">
                            <div className="news-img-inner scale-img">
                              <img
                                className=" w-100"
                                src="/upload/slide 1.webp"
                                alt=""
                                style={{ borderRadius: "15px" }}
                              />
                            </div>
                          </div>
                          <div className="news-info">
                            <div className="news-info-inner">
                              <h3 className="news-name text-split">
                                Đáp ứng nhu cầu ẩm thực hiện đại
                              </h3>
                              <p className="news-date">11/09/2023</p>
                              <div className="news-desc text-split">
                                Trong thế kỷ 21 hiện nay, với cuộc sống bận rộn
                                và áp lực công việc ngày càng gia tăng, việc
                                chuẩn bị và nấu ăn hàng ngày trở nên khó khăn
                                đối với nhiều người.{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>{" "}
                    </div>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <div className="item">
                      <div className="news-item">
                        <a
                          className="news-item-inner"
                          href="#"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="news-img">
                            <div className="news-img-inner scale-img">
                              <img
                                className=" w-100"
                                src="/upload/slide 1.webp"
                                alt=""
                                style={{ borderRadius: "15px" }}
                              />
                            </div>
                          </div>
                          <div className="news-info">
                            <div className="news-info-inner">
                              <h3 className="news-name text-split">
                                Đáp ứng nhu cầu ẩm thực hiện đại
                              </h3>
                              <p className="news-date">11/09/2023</p>
                              <div className="news-desc text-split">
                                Trong thế kỷ 21 hiện nay, với cuộc sống bận rộn
                                và áp lực công việc ngày càng gia tăng, việc
                                chuẩn bị và nấu ăn hàng ngày trở nên khó khăn
                                đối với nhiều người.{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>{" "}
                    </div>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <div className="item">
                      <div className="news-item">
                        <a
                          className="news-item-inner"
                          href="#"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="news-img">
                            <div className="news-img-inner scale-img">
                              <img
                                className=" w-100"
                                src="/upload/slide 1.webp"
                                alt=""
                                style={{ borderRadius: "15px" }}
                              />
                            </div>
                          </div>
                          <div className="news-info">
                            <div className="news-info-inner">
                              <h3 className="news-name text-split">
                                Đáp ứng nhu cầu ẩm thực hiện đại
                              </h3>
                              <p className="news-date">11/09/2023</p>
                              <div className="news-desc text-split">
                                Trong thế kỷ 21 hiện nay, với cuộc sống bận rộn
                                và áp lực công việc ngày càng gia tăng, việc
                                chuẩn bị và nấu ăn hàng ngày trở nên khó khăn
                                đối với nhiều người.{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>{" "}
                    </div>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <div className="item">
                      <div className="news-item">
                        <a
                          className="news-item-inner"
                          href="#"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="news-img">
                            <div className="news-img-inner scale-img">
                              <img
                                className=" w-100"
                                src="/upload/slide 1.webp"
                                alt=""
                                style={{ borderRadius: "15px" }}
                              />
                            </div>
                          </div>
                          <div className="news-info">
                            <div className="news-info-inner">
                              <h3 className="news-name text-split">
                                Đáp ứng nhu cầu ẩm thực hiện đại
                              </h3>
                              <p className="news-date">11/09/2023</p>
                              <div className="news-desc text-split">
                                Trong thế kỷ 21 hiện nay, với cuộc sống bận rộn
                                và áp lực công việc ngày càng gia tăng, việc
                                chuẩn bị và nấu ăn hàng ngày trở nên khó khăn
                                đối với nhiều người.{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>{" "}
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="intro-right">
            <div className="section-heading">
              <h2 className="title">VIDEO THỰC TẾ</h2>
              <h3>Về ADL TRIPLE T</h3>
            </div>
            <iframe
              style={{ borderRadius: "0 100px 0 100px" }}
              width="100%"
              height="440px"
              src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
