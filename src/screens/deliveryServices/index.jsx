
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DeliveryServices = () => {

  const navigate = useNavigate()
  usePageTitle("Privacy Policy");
  return (
    <>
      <Layout>
      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">Shipping Services</h2>
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
                    <Breadcrumb.Item active>Delivery Services</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-3 fw-medium">Delivery Services</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
                <Col xs={12} className="mt-5">
                <h2 className="text-primary mb-4 fw-medium">Choose from the following parcel delivery services: </h2>
                <ul className="order-list p-0 m-0">
                  <li>
                  <Link>Economy shipping</Link>
                  </li>
                  <li>
                  <Link>ePacket shipping</Link>
                  </li>
                  <li>
                  <Link>Expedited shipping</Link>
                  </li>
                  <li>
                  <Link>Flat rate shipping</Link>
                  </li>
                  <li>
                  <Link>Overnight shipping</Link>
                  </li>
                  <li>
                  <Link>Package drop off</Link>
                  </li>
                  <li>
                  <Link>Package pick up</Link>
                  </li>
                  <li>
                  <Link>Shipping Heavy Items and Large Packages</Link>
                  </li>
                  <li>
                  <Link>Shipping Large Boxes</Link>
                  </li>
                  <li>
                  <Link>Shipping large boxes</Link>
                  </li>
                  <li>
                  <Link>Small package shipping</Link>
                  </li>
                  <li>
                  <Link>Standard shipping</Link>
                  </li>
                  <li>
                  <Link>US ground shipping</Link>
                  </li>
                </ul>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default DeliveryServices;


