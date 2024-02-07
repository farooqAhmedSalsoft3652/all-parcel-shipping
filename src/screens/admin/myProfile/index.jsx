import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from "@config/data";
import { DashboardLayout } from "@/layout/dashboardLayout";
import usePageTitle from "@hooks/usePageTitle";
import { decode } from "base-64";

const AdminProfile = () => {
  usePageTitle("My Profile");
  const [profileData, setprofileData] = useState({});

  useEffect(() => {
    let user = JSON.parse(decode(localStorage.getItem('user')));
    setprofileData(user);
  }, []);

  return (
    <>
      <DashboardLayout>
        <section className="profile">
          <Container fluid>
            <div className="dashCard">
              <Row>
                <Col md={11} xs={12}>
                  <Row className="py-5">
                    <Col md={11} xs={12} className="ps-5">
                      <h3>My Profile</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div className="sec_title d-block text-center">
                        <div className="mb-2">
                          <div className="attached">
                            <img
                              src={SERVER_URL + profileData.avatar}
                              className="img-fluid ml-0 profile_img"
                              alt={true.toString()}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={9} xs={12} className="m-auto">
                      <Row className="pt-sm-5 pt-3 text-center">
                        <Col sm={6} lg={3} xs={12}>
                          <div className="my-sm-4 ">
                            <label className="xl-grey-color p-xs profile_label py-2">
                              First Name
                            </label>
                            <p className="fw-bold mt-xs-3 label-text">
                              {profileData.first_name}
                            </p>
                          </div>
                        </Col>
                        <Col sm={6} lg={3} xs={12}>
                          <div className="my-sm-4 ">
                            <label className="xl-grey-color p-xs profile_label py-2">
                              Last Name
                            </label>
                            <p className="fw-bold mt-xs-3 label-text">
                              {profileData.last_name}
                            </p>
                          </div>
                        </Col>
                        <Col sm={6} lg={3} xs={12}>
                          <div className="my-sm-4 ">
                            <label className="xl-grey-color p-xs profile_label py-2">
                              Email Address
                            </label>
                            <p className="fw-bold mt-xs-3 label-text">
                              {profileData.email}
                            </p>
                          </div>
                        </Col>
                        <Col sm={6} lg={3} xs={12}>
                          <div className="my-sm-4 ">
                            <label className="xl-grey-color p-xs profile_label py-2">
                              Phone Number
                            </label>
                            <p className="fw-bold mt-xs-3 label-text">
                              {profileData.phone_number}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="my-3 text-center">
                    <Col xs={12}>
                      <div>
                        <Link
                          to="/admin/edit/profile"
                          className="m-2 site-btn text-decoration-none"
                        >
                          Edit Profile
                        </Link>
                        <Link
                          to="/admin/change-password"
                          className="site-btn site_border_btn text-decoration-none"
                        >
                          Change Password
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>
    </>
  );
};

export default AdminProfile;
