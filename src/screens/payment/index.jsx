import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "@components/Layout/layout";
import SiteButton from "@components/Button/button";
import BackButton from "@components/backButton";
import {CustomInput} from "@components/CustomInput";
import CustomModal from "@components/customModal";
import { useNavigate } from "react-router-dom";
import usePageTitle from "@hooks/usePageTitle";
import useAuth from "@hooks/useAuth";


const Payment = () => {
  
  usePageTitle("Payment");
  
  const { role } = useAuth();

   const Navigate = useNavigate()     
   
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    cvvNumber: "",
    validityDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();   
  };
    const postdata =()=>{
        console.log("Submitted Data:", formData);
    }
    const paymentFunc = () =>{
        postdata()
        if(role.role == "mentor"){
          Navigate("/ads-logs")   
        }else{
          Navigate("/my-Request")   
        }
          
      }

  return (
    <>
      <Layout>
        <div className="packeges_section section_padding position-relative two_pices_bg">
          <Container>
            <div className="packges-layout">
              <Row>
                <Col xs={12}>
                  <Row className="my-3">
                    <Col md={12}>
                      <h3>
                        <BackButton />
                        Payment Detail
                      </h3>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs={10}>
                      <form onSubmit={handleSubmit}>
                        <Row className="my-5">
                          <Col lg={6}>
                            <CustomInput
                              label="Cardholder Name"
                              required
                              id="cardholderName"
                              type="text"
                              placeholder="Enter Cardholder Name"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={formData.cardholderName}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col lg={6}>
                            <CustomInput
                              label="Card Number"
                              required
                              id="cardNumber"
                              type="text"
                              placeholder="Enter Card Number"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={formData.cardNumber}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col lg={6}>
                            <CustomInput
                              label="CVV Number"
                              required
                              id="cvvNumber"
                              type="text"
                              placeholder="Enter CVV Number"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={formData.cvvNumber}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col lg={6}>
                            <CustomInput
                              label="Validity Date"
                              required
                              id="validityDate"
                              type="date"
                              placeholder="Enter Validity Date"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={formData.validityDate}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="text-center mt-5">
                          <Col xl={12}>
                            <SiteButton
                              className="site-btn"
                              onClick={() => setShowModal(true)}
                              type="submit"
                            >
                              Pay Now
                            </SiteButton>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Layout>
      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="Your Request Has Been Sent To The Mentor Successfully"
        success={true}
        onClickOk={paymentFunc}
      />
    </>
  );
};

export default Payment;
