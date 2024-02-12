import "./index.css";
import { useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout/layout";
import { SERVER_URL } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";
import BackButton from "@components/backButton";
import { CustomInput, DropDown } from "@components/CustomInput";
import PhoneInput from "react-phone-number-input";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";

const MyProfile = () => {
  usePageTitle("Edit Profile");
  const [showModal, setShowModal] = useState(false);

  const [load, setLoad] = useState(true);

  const loadProfileData = async () => {
    let response = await axios.get('/profile')
      .then(res => {
        // console.log(res.data);
        setProfileData(res.data.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }

const handleUpdate = ((event)=>{
  event.preventDefault();
  setShowModal(true)
})

  useEffect(() => {
    setLoad(true);
    loadProfileData();
  }, []);

  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-white">
          <Container>
            <Row>
              <Col xs={6}>
                <div className="title">
                  <h2 className="text-primary mb-2 fw-medium"><BackButton className="text-primary" /> Edit Profile</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <div className="bg-light p-4 p-xl-5 detail-block">
                  <Form onSubmit={handleUpdate}>
                    <Row className="my-5">
                      {load ? (
                        <LoadingSpinner />
                      ) : (
                        <Col lg={11}>
                          <Row>
                            <Col xs={12} md={6} lg={6} className="mt-4 mt-md-4 mt-xxl-5">
                              <CustomInput
                                label="Name"
                                labelClass="mainLabel bold ms-0"
                                type="text"
                                id="firstname"
                                placeholder="Enter First Name"
                                inputClass="mainInput"
                                required
                                // value={
                                //   formData.first_name ?? profileData.first_name
                                // }
                                // onChange={(e) =>
                                //   setFormData({
                                //     ...formData,
                                //     first_name: e.target.value,
                                //   })
                                // }
                                // inputError={formErrors.first_name}
                              />
                            </Col>
                            <Col xs={12} md={6} lg={6} className="mt-4 mt-md-4 mt-xxl-5">
                            <label className="mainLabel bold ms-0">
                              Contact Number
                              <span className="text-danger">*</span>
                            </label>
                            <PhoneInput
                              placeholder="Enter Contact Number"
                              // value={value}
                              // onChange={setValue}
                              className="mainInput"
                              defaultCountry="US"
                              // focusInputOnCountrySelection="false"
                            />
                            </Col>
                            <Col xs={12} md={6} lg={4} className="mt-4 mt-md-4 mt-xxl-5">
                              <label className="mainLabel bold ms-0">
                              Email:
                                <span className="text-danger">*</span>
                              </label>
                              <p className="fw-regular">bellaedward@gmail.com</p>                          
                            </Col>
                          </Row>
                        </Col>
                      )}
                    </Row>
                    <Row className="py-5">
                        <Col xs={12}>
                          <SiteButton
                            className="site-btn width-220"
                            type="submit"
                            load={load}
                          >
                            Update
                          </SiteButton>
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
        show={showModal}
        close={()=>{setShowModal(false)}}
        heading="System Message"
        para="Profile Edited Successfully!"
        success={true}
        buttonText="Okay"
        onClickOk={()=>{setShowModal(false)}}
        // onClickOk={dataUpdated}
      />
    </>
  );
};

export default MyProfile;
