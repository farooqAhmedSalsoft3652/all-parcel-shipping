
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from "react";
import { faqData } from "@config/data";

const Faq = () => {

  usePageTitle("FAQ’s");
  
  const [faq, setfaqData] = useState([])
    useEffect(()=>{
        setfaqData(faqData)
    },[])
  return (
    <>
      <Layout>

      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">FAQ’s</h2>
                </Col>
              </Row>
          </Container>
        </section>
        <section className="align-bottom content-section bg-white">
          <Container>
              <Row>
                <Col xs={12} className="mb-5">
                  <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>FAQ’s</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-4 fw-medium">Following are answers to some of the frequently
asked questions</h2>
                </Col>
                <Col xs={12}>
                  <Accordion>
                      <Row>
                      {
                          faq.map((item, index)=>(
                              <Col xs={12} xl={11} className="mb-2" key={index}>
                                  <Accordion.Item eventKey={index}>
                                      <Accordion.Header>{item.faqTitle}</Accordion.Header>
                                      <Accordion.Body className="py-0 px-5">
                                        <p>{item.faqAnswer}</p>
                                      </Accordion.Body>
                                  </Accordion.Item>
                              </Col>
                          ))
                      }
                      </Row>
                  </Accordion>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default Faq;


