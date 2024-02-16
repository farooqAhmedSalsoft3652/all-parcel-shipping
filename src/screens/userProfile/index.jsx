import "./index.css";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout/layout";
import { SERVER_URL } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";

import { Us } from "react-flags-select";
const MyProfile = () => {
  usePageTitle("My Profile");
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
              <Col xs={12}>
                <div className="title">
                  <h2 className="text-primary mb-2 fw-medium">My Profile</h2>
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
                            <h5 className="mb-1 mb-md-2">Name:</h5>
                            <p className="">Bella Edward</p>
                          </Col>
                          <Col xs={12} md={6} lg={4} className="mt-4 mt-md-4 mt-xxl-5">
                            <h5 className="mb-1 mb-md-2">Contact Number:</h5>
                            <p className=""><Us /> +123-456-7890</p>
                          </Col>
                          <Col xs={12} md={6} lg={4} className="mt-4 mt-md-4 mt-xxl-5">
                            <h5 className="mb-1 mb-md-2">Email:</h5>
                            <p className="">bellaedward@gmail.com</p>
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <Row className="my-5 text-center">
                    {!load && (
                      <Col xs={12} className="pt-5">
                        <div>
                          <Link
                            to="/change-password"
                            className="site-btn text-decoration-none width-220 mx-2"
                          >
                            Change Password
                          </Link>
                          <Link
                            to="/profile/edit-profile"
                            className="site-btn site_border_btn mt-3 mt-md-0 mx-2 text-decoration-none width-220"
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
