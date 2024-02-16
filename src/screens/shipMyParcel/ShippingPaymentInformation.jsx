
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "../../components/Button/button";
import { CustomInput, DropDown } from "@components/CustomInput";
// import { Form } from "react-router-dom";
import BackButton from "@components/backButton";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CustomModal from "@components/customModal";
import { useState } from "react";


const ShippingPaymentInformation = () => {
  const navigate = useNavigate();
    const [receivePayment, setReceivePayment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReceivePayment(true);
    console.log("Form submitted!");
  };

  usePageTitle("Ship My Parcel Step 2");
  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-white">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="title">
                  <h2 className="text-primary mb-2 fw-medium">
                    <BackButton className="text-primary" /> Payment Information
                  </h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <div className="bg-light p-4 p-xl-5 card-form">
                  <Form onSubmit={handleSubmit} id="">
                    <Row>
                      <Col xxl={11} className="mt-3">
                        <Row>
                          <Col xs={12}>
                            <h3 className="mb-3 mb-md-4 fw-bold">
                            Amount to Pay: $ 1000
                            </h3>
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Card Holder Name"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter Card Holder Name"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Card Number"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter Card Number"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="CVV Number"
                              type="text"
                              id="full_name"
                              required
                              placeholder="CVV Number"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Expiry Date"
                              type="date"
                              id="full_name"
                              required
                              placeholder="Expiry Date"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col
                            xs={12}
                            className="mt-2 text-center text-md-start"
                          >
                            <SiteButton
                              type="submit"
                              className="btn-primary width-220"
                            >
                              Proceed to Pay
                            </SiteButton>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>

      <CustomModal
        show={receivePayment}
        close={() => setReceivePayment(false)}
        heading="System Message"
        para="Payment Received!"
        onClickOk={() => setReceivePayment(false)}
        buttonText="Okay"
        success
      />
    </>
  );
};

export default ShippingPaymentInformation;


