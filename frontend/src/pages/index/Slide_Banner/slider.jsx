import Carousel from "react-bootstrap/Carousel";
import "../../../css/slider.css";

function Slider() {
  return (
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
  );
}

export default Slider;
