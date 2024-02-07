import { Col, Container, Row } from "react-bootstrap";
import { brandSliderData } from "@config/data";
import Slider from "react-slick";
import SiteButton from "../../../components/Button/button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  );
}




const ComparePrice = () => {
  const navigate = useNavigate()
  const brandSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,


    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="pad-top-4 pad-bottom-4 color-bg-apple-light home__brands__hold js-animate-in-view">
        <Container>
          <Row>
            <Col xs={12} className="z-1">
              <h3 className="h2 t-center home__brands__title fw-medium">
                Compare prices from...
              </h3>
              <div className="home__brands home__brands--alt js-horiz-scroller">
                <div className="js-horiz-scroller__mask">
                  <Slider {...brandSliderSettings} className="brandSlider">
                    {brandSliderData.map((card) => (
                      <div key={card.id}>
                        <div className="brand-slide">
                          <img
                            className="img-fluid"
                            src={card.testimonialimage}
                            alt={true.toString()}
                          />
                        </div>
                        {/* <TestimonialCard data={card} /> */}
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="js-horiz-scroller__nav"></div>
              </div>
              <div className="medium-width-6 h-center t-center mt-5">
                <SiteButton
                  type="button"
                  className="btn btn--quarternary btn--ghosted color-bg-white"
                  onClick={() => navigate("/")}
                >
                  See all couriers
                </SiteButton>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="particle-container">
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
          <div className="circle-container">
            <div className="circle"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComparePrice;
