import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import {packagesCardData} from "@config/data";
import { useNavigate } from "react-router-dom";
import SiteButton from "@components/Button/button";
import { useEffect, useState, forwardRef } from "react";

const HomePackages = forwardRef(({ className }, ref) => {

  const navigate = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(packagesCardData);
  }, []);

  return (
    <>
      <section className={`pad-top-4 pad-bottom-4 color-bg-oompa-light home-packages ${className}`} ref={ref}>
        <Container>
          <Row>
            <Col xs={12}>
              <h3 className="h2 t-center font-size-5 color-text-berry">
                Lorem ipsum dolor sit amet
              </h3>
              <div className="home-steps push-bottom-4 js-animate-in-view">
                {data.slice(0, 4).map((data, index) => (
                  <div className="home-steps__item" key={index}>
                    <div className="home-steps__img">
                      <img
                        src={data.packageimage}
                        width="230"
                        height="230"
                        alt={true.toString()}
                      />
                    </div>
                    <div className="home-steps__content">
                      <p>{data.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid medium-width-6 h-center t-center">
                <SiteButton
                  type="button"
                  className="btn btn--quarternary btn--ghosted color-bg-white"
                  onClick={() => navigate("/ship-my-parcel")}
                >
                  Try our shipping calculator
                </SiteButton>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
});

export default HomePackages;
