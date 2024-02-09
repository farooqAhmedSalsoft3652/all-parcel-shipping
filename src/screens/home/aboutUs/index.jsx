import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "@components/Button/button";
import { video } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { aboutData } from "@config/data";

const AboutUs = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(()=>{
    setData(aboutData);
  }, [])
  return (
<>
    <section className="pad-top-6">
      <Container className="monkey-hands-video js-animate-in-view">
          <Row className="row">
              <Col sx={12}>
                {data.map((data, index)=>(
                  <div className="grid" key={index}>
                      <div className="grid-item x-large-width-6 t-center pad-bottom-4">
                          <h2 className="h1 color-text-primary">{data.title}</h2>
                          {data.text}
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam amet aliquid quas veniam atque temporibus magnam</p>
                          <SiteButton type="button" className="btn btn--quarternary btn--ghosted" onClick={()=> navigate('/')}>Learn more about us</SiteButton>
                      </div>
                      <div className="monkey-hands-video__img">
                          <img src={video} alt={true.toString()} className="img-fluid" />
                      </div>
                  </div>
                ))}
              </Col>
          </Row>
      </Container>
  </section>

{/* 
    <section className="our_team section_padding position-relative two_pices_bg">
      <Container>
        <Row className="align-items-center">
          <Col xs={12}>
            <div className="text-center">
              <h1 className="text-black">About Us</h1>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="Our_img_box">
              <img className="img-fluid" src={Team} alt="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="Our_team_box">
              <h2 className="text-black text-capitalize">Who We Are</h2>
              <p className="d-grey-color">
                Welcome to ACOLAI.com, a platform for people to connect with each other and share their experiences and help individuals find the right mentor in their industry, hobby, or life.
                <br />
                type and scrambled it to make a type specimen book.
              </p>
              <ul className="m-0 p-0">
                <li className="my-3 list-unstyled">
                  We believe that mentorship is key to unlocking potential and achieving personal growth, which is why we created a mentor-mentee marketplace that provides a safe space where mentees can have real conversations with great mentors and ask for guidance on important life decisions and expand their growth opportunities.‍
                </li>
                <li className="my-3 list-unstyled">
                  Our founders, Ed and Bradley, have decades of experience in coaching and mentoring individuals. Ed has been thinking about creating a mentorship marketplace for his entire career, and Bradley is a self-taught individual who found success when he found a mentor in Ed. Together, they are two driven individuals with a passion for helping others achieve their goals. They both bring unique perspectives and experiences to the table, making them a dynamic duo. They believe that mentorship is key to unlocking potential and achieving personal growth, and their shared vision and passion for helping others led them to create ACOLAI*.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section> */}
    </>
  );
};

export default AboutUs;
