
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "../../components/Button/button";
import { CustomInput, DropDown } from "@components/CustomInput";
// import { Form } from "react-router-dom";
import BackButton from "@components/backButton";
import CustomModal from "@components/customModal";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const selState = [
  { value: "", label: "Select State" },
  { value: "", label: "Alabama" },
  { value: "", label: "Alaska" },
];
export const selCountry = [
  { value: "country", label: "Select Country" },
  { value: "", label: "Usa" },
  { value: "", label: "Uk" },
];

const ShippingDetailsDropOff = () => {
  const [showShipping, seetShowShipping] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    seetShowShipping(true)
    //navigate("/prices-comparison");
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
                    <BackButton className="text-primary" /> Shipping Details
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
                              Dropoff Details
                            </h3>
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <DropDown
                              label="Country"
                              labelClass="mainLabel bold"
                              options={selCountry}
                              required
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Name"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter Name"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Address Line 1"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter Address Line 1"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Address Line 2"
                              type="text"
                              id="full_name"
                              placeholder="Enter Address Line 2"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="City"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter City"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <DropDown
                              label="State"
                              labelClass="mainLabel bold"
                              options={selState}
                              required
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Zip"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter Zip Code"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                            />
                          </Col>

                          <Col md={12} className="mb-3 mb-md-5">
                            <CustomInput
                              label="Special Instructions"
                              type="textarea"
                              id="full_name"
                              rows="10"
                              placeholder="Write Here"
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
                              Continue
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
        show={showShipping}
        close={() => seetShowShipping(false)}
        heading="System Message"
        para="Your Shipment Request has been Submitted!"
        onClickOk={() => navigate("/shipping-payment-information")}
        buttonText="Continue"
        success
      />
    </>
  );
};

export default ShippingDetailsDropOff;


