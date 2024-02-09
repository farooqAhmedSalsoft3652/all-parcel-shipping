
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
const CouriersDetails = () => {

  const navigate = useNavigate()
  usePageTitle("Couriers Details");
  return (
    <>
      <Layout>

      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">Couriers</h2>
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
                    <Breadcrumb.Item active>Couriers</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-3 fw-medium">US freight forwarders</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default CouriersDetails;


