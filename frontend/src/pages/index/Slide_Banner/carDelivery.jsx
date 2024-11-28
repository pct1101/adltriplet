import React, { useEffect, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../css/index/home.css";
import { getBrandCar } from "../../../lib/Axiosintance";
import { API_URL_LOGO } from "../../../lib/Axiosintance";

function CarDelivery() {
  const [swiperRef, setSwiperRef] = useState(null);

  const [brand, setbrand] = useState([]);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await getBrandCar();
        console.log(response.data.data);
        setbrand(response.data.data);
      } catch (error) {
        console.log("failed to load data brand", error);
      }
    };
    fetchBrand();
  }, []);

  return (
    <div>
      <div className="container airport d-flex mt-4">
        <h1 className="airport-head">
          Dòng xe tại
          <br />
          ADL TRIPLE T
        </h1>
        <>
          <Swiper
            className="airports"
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
              delay: 10000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {brand.map((slideBanner, index) => (
              <SwiperSlide key={slideBanner} virtualIndex={index}>
                <div className="airports-item">
                  <div className="fix-img2">
                    <img
                      variant=""
                      src={`${API_URL_LOGO}${slideBanner.brand_logo}`}
                    />
                  </div>
                  <p>{slideBanner.brand_name} </p>
                  <span>1000+ xe chờ</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
        <div className="custom-button-prev"></div>
        <div className="custom-button-next"></div>
      </div>
    </div>
  );
}

export default CarDelivery;
