
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "../../components/Button/button";
import {CustomInput} from "@components/CustomInput";
// import { Form } from "react-router-dom";
import BackButton from "@components/backButton";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";



const ShipMyParcelStep2 = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/prices-comparison");
    console.log("Form submitted!");
  };
  
  usePageTitle("Ship My Parcel Step 2");
  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-blue">
          <Container>
            <Row>
              <Col xs={6}>
                <div className="title">
                  <h2 className="text-white mb-2 fw-medium">
                    <BackButton className="text-white" /> Ship My Parcel
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
                              Select Delivery Type
                            </h3>
                          </Col>
                          <Col md={6} className="mb-3 mb-md-0">
                            <div className="mb-4">
                              <Form.Check
                                inline
                                label="Normal"
                                name="group1"
                                type="radio"
                                id={`inline-radio-1`}
                              />
                              <Form.Check
                                inline
                                label="Urgent"
                                name="group1"
                                type="radio"
                                id={`inline-radio-2`}
                              />
                            </div>
                            <div class="text-danger fw-medium pt-2">
                              Note: Prices May Vary According To The Option You
                              Choose
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4 mt-xl-5">
                          <Col xs={12}>
                            <h3 className="mb-3 mb-md-4 fw-bold">
                              Select Exact Location
                            </h3>
                          </Col>
                          <Col md={6} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Location of Pickup"
                              type="text"
                              id="full_name"
                              required
                              placeholder="LLocation of Pickup"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              location={true}
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Location of Dropoff"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Location of Dropoff"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              location={true}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-4 mt-xl-5 mb-4">
                          <Col xs={12}>
                            <h3 className="mb-3 mb-md-4 fw-bold">
                              Contact Information
                            </h3>
                          </Col>
                          <Col md={6} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Your Contact No"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Your Contact No"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              inputUnit="Kg"
                            />
                          </Col>
                          <Col md={6} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Contact No. of Receiver"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Contact No. of Receiver"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              inputUnit="Kg"
                            />
                          </Col>
                          <Col
                            xs={12}
                            className="mt-5 text-center text-md-start"
                          >
                            <SiteButton
                              type="submit"
                              className="btn-primary width-300"
                            >
                              Compare Price
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
    </>
  );
};

export default ShipMyParcelStep2;


