
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";


import Breadcrumb from 'react-bootstrap/Breadcrumb';

const TermsConditions = () => {

  usePageTitle("Terms & Conditions");
  return (
    <>
      <Layout>

      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">Terms & Conditions</h2>
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
                    <Breadcrumb.Item active>Terms & Conditions</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-4 fw-medium">Terms & Conditions</h2>
                  <h3 className="pt-4 mb-1 fw-bold">Who we are and how to contact us</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  <h3 className="pt-4 mb-1 fw-bold">By using our site you accept these terms</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  <h3 className="pt-4 mb-1 fw-bold">There are other terms that may apply to you</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  <h3 className="pt-4 mb-1 fw-bold">We may make changes to these terms</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  <h3 className="pt-4 mb-1 fw-bold">We may suspend or withdraw our site</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default TermsConditions;


