import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { aboutImage, monkeyBoxWhite, video } from "@/assets/images";

const AboutUs = () => {

  usePageTitle("About Us");
  return (
    <>
      <Layout>

      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">About Us</h2>
                </Col>
              </Row>
          </Container>
        </section>
        <section className="content-section about-page-content bg-white">
          <Container>
              <Row>
                <Col xs={12} className="mt-0 mt-lg-0 mb-4 mb-lg-0">
                  <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12} lg={6} className="align-self-center">
                  <h2 className="text-primary mb-3 mb-lg-5 fw-medium">All Parcel Shipping</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
                <Col xs={12} lg={6}>
                  <img src={aboutImage} alt="aboutImage" className="img-fluid" />
                </Col>
              </Row>
          </Container>
        </section>
        <section className="bg-paleblue2 content-section py-5 our-story">
          <Container>
              <Row>
                <Col xl={9} className="position-relative">
                  <div className="bg-white our-story-card">  
                    <h2 className="text-primary mb-4 fw-medium">Our Story</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recentl with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lore Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </div>
                  <div className="our-story-card-img">
                    <img src={monkeyBoxWhite} alt="Our Story Monkey" className="img-fluid" />
                  </div>
                </Col>
                
              </Row>
          </Container>
        </section>

        <section className="align-bottom content-section bg-white about-sec2">
          <Container className="monkey-hands-video js-animate-in-view container">
            <Row>
              <Col md={6} className="align-self-center">
                <h2 className="h1 color-text-primary mb-5">Lorem ipsum dolor sit amet</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam amet aliquid quas veniam atque temporibus magnam</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam amet aliquid quas veniam atque temporibus magnam</p>
              </Col>
              <Col md={6} className="col">
                <img src={video} alt="true" className="img-fluid" />
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default AboutUs;


