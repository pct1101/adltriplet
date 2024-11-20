import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import Saleoff from "./Slide_Banner/saleoff";
import News from "./component/news";
import "../../css/index/index.css";
import Slider from "./Slide_Banner/slider";
import Productlist from "./products/productslist";
import CarDelivery from "./Slide_Banner/carDelivery";
import Placecar from "./Slide_Banner/placecar";
import Services from "./component/services";
import Register from "./component/register";
import Banner_top from "./Slide_Banner/banner_top";
import Endow from "./component/endow";

function Home() {
  return (
    <div>
      <Header />
      <Slider />
      <Saleoff />
      <Productlist />
      <CarDelivery />
      <Placecar />
      <Banner_top></Banner_top>
      <Endow></Endow>

      <Register />
      <News />
      <Footer />
    </div>
  );
}

export default Home;
