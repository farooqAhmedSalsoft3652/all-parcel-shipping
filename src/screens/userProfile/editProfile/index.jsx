import "./index.css";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout/layout";
import { SERVER_URL } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";
import BackButton from "@components/backButton";
import { CustomInput, DropDown } from "@components/CustomInput";
import PhoneInput from "react-phone-number-input";

const MyProfile = () => {
  usePageTitle("Edit Profile");
  const [profileData, setProfileData] = useState({});
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
                  <Row className="my-5">
                    {load ? (
                      <LoadingSpinner />
                    ) : (
                      <Col xs={12}>
                        <Row>
                          <Col xs={12} md={6} lg={4} className="mt-4 mt-md-4 mt-xxl-5">
                            <CustomInput
                              label="Name"
                              labelClass="mainLabel bold"
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
                          <Col xs={12} md={6} lg={4} className="mt-4 mt-md-4 mt-xxl-5">
                          <PhoneInput
                            placeholder="Enter Contact Number"
                            // value={value}
                            onChange={setValue}
                            className="mainInput"
                            defaultCountry="US"
                            // focusInputOnCountrySelection="false"
                          />
                          </Col>
                          <Col xs={12} md={6} lg={4} className="mt-4 mt-md-4 mt-xxl-5">
                          <CustomInput
                              label="Name"
                              labelClass="mainLabel bold"
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
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <Row className="my-5 text-center">
                    {!load && (
                      <Col xs={12}>
                        <div>
                          <Link
                            to="/change-password"
                            className=" site-btn site_border_btn text-decoration-none width-220"
                          >
                            Change Password
                          </Link>
                          <Link
                            to="/profile/edit-profile"
                            className="site-btn ms-3 text-decoration-none width-220"
                          >
                            Edit Profile
                          </Link>
                        </div>
                      </Col>
                    )}
                  </Row> 
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </>
  );
};

export default MyProfile;
