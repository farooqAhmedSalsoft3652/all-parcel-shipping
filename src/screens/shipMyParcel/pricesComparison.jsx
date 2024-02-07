
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "../../components/Button/button";
import {CustomInput} from "@components/CustomInput";
// import { Form } from "react-router-dom";
import BackButton from "@components/backButton";
import { dhlCard, fedexCard } from "@/assets/images";
import CustomModal from "@components/customModal";
import { useState } from "react";
import {useNavigate } from "react-router-dom";


const PricesComparison = () => {
  
  const navigate = useNavigate();
  const [showBook, setShowBook] = useState(false);

  const modalBook = (e) => {
    setShowBook(true);
  };

  usePageTitle("Prices Comparison");
  
  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-white">
          <Container>
            <Row>
              <Col xs={6}>
                <div className="title">
                  <h2 className="text-primary mb-2 fw-medium">
                    <BackButton className="text-primary" /> Prices Comparison
                  </h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <Row className="g-5">
                  <Col md={6}>
                    <div className="card-compare d-flex">
                      <div className="flex-shrink-0 card-img">
                        <img src={dhlCard} alt="" />
                      </div>
                      <div className="flex-grow-1 card-detail p-5 text-center align-self-center">
                        <h3 className="fw-medium text-capitalize mb-4">
                          <span className="d-block">DHL</span>Shipping
                        </h3>
                        <ul>
                          <li>2+ Day Delivery</li>
                          <li>2+ Day Delivery</li>
                        </ul>
                        <div className="price">
                          <h3>
                            $100{" "}
                            <span className="include-price">
                              Inclusive of Tax
                            </span>
                          </h3>
                        </div>
                        <SiteButton
                          type="submit"
                          className="btn-primary mt-2"
                          onClick={modalBook}
                        >
                          Book
                        </SiteButton>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="card-compare d-flex">
                      <div className="flex-shrink-0 card-img">
                        <img src={fedexCard} alt="" />
                      </div>
                      <div className="flex-grow-1 card-detail p-5 text-center align-self-center">
                        <h3 className="fw-medium text-capitalize mb-4">
                          <span className="d-block">FedEx</span>Shipping
                        </h3>
                        <ul>
                          <li>2+ Day Delivery</li>
                          <li>2+ Day Delivery</li>
                        </ul>
                        <div className="price">
                          <h3>
                            $100{" "}
                            <span className="include-price">
                              Inclusive of Tax
                            </span>
                          </h3>
                        </div>

                        <SiteButton type="submit" className="btn-primary mt-2">
                          Book
                        </SiteButton>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>

      <CustomModal
        show={showBook}
        close={() => setShowBook(false)}
        para="Proceed Towards Shipment Details?"
        heading="System Message"
        action={() => navigate("/shipping-details-pickup")}
        showYesNoButtons={true}
      />
    </>
  );
};

export default PricesComparison;


