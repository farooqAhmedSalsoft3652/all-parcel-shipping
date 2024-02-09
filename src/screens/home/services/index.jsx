import "./index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "@components/Button/button";
import { servicesCardData } from "@config/data";

const Services = () => {

  const navigate = useNavigate()
  const [data1, setData] = useState([]);

  useEffect(()=>{
    setData(servicesCardData);
  }, [])
  // console.log(data1)

  return (
    <>
      <section className="pad-top-4 pad-bottom-6 color-bg-berry-darker oh js-animate-in-view">
        <Container>
          <Row>
            <Col xs={12}>
              <h3 className="h2 t-center font-size-5 color-text-white">
                Lorem ipsum dolor sit amet consectetur
              </h3>
              <div className="grid">
                {data1.map((item, index) => (
                  <div className="grid-item large-width-6 js-animate-in-view" key={index}>
                     <div className="info-block">
                       <div className="info-block__img">
                         <img
                           width="250"
                           height="250"
                           src={item.serviceimage}
                           alt={true.toString()}
                         />
                       </div>
                       <div className="info-block__content">
                         <div className="info-block__title">
                           {item.title}
                         </div>
                         <div className="info-block__text">
                           {item.text}
                         </div>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
              <div className="medium-width-6 t-center h-center">
                <SiteButton
                  onClick={() => navigate("/contact-us")}
                  className="btn btn--secondary"
                >
                  See more delivery services
                </SiteButton>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;


 