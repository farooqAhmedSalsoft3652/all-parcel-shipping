import React, { useEffect, useState, forwardRef  } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "@components/Button/button";
import { video } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { aboutData } from "@config/data";

const AboutUs = forwardRef(({ className }, ref) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(()=>{
    setData(aboutData);
  }, [])

  console.log(className);

  return (
<>
    <section className={`py-5 ${className}`} ref={ref}>
      <Container className="monkey-hands-video js-animate-in-view pt-5">
          {data.map((data, index)=>(
            <Row className="row" key={index}>
              <Col md={6}>
                <h2 className="h1 color-text-primary mb-3 mb-lg-5">{data.title}</h2>
                {data.text}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam amet aliquid quas veniam atque temporibus magnam</p>
                <SiteButton type="button" className="btn btn--quarternary btn--ghosted" onClick={()=> navigate('/about-us')}>Learn more about us</SiteButton>         
              </Col>
              <Col md={6}>
              <div className="monkey-hands-video__img">
                          <img src={video} alt={true.toString()} className="img-fluid" />
                      </div>
              </Col>
          </Row>
          ))}
      </Container>
  </section>

    </>
  );
});

export default AboutUs;
