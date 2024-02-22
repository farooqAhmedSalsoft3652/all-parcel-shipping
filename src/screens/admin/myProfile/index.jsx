import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from "@config/data";
import { DashboardLayout } from "@/layout/dashboardLayout";
import usePageTitle from "@hooks/usePageTitle";
import { decode } from "base-64";
import {userAvatar} from "../../../assets/images";

import "./style.css"

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
              <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
                <div class="mainTitle mb-0 mb-5">
                  <div className="d-flex align-items-center gap-2 ">
                    <h2 class="text-black fw-medium">My Profile</h2>  
                  </div>
                </div>                
                <div className="detail-block">
                  <Row>
                    <Col xs={12}>
                      <div className="sec_title d-block">
                        <div className="mb-2">
                          <div className="attached">
                            <img
                              src={userAvatar}
                              // src={SERVER_URL + profileData.avatar}
                              className="img-fluid ml-0 profile_img"
                              alt={true.toString()}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} className="my-sm-4">
                      <h5 className="xl-grey-color p-xs profile_label py-2 fw-medium">Name:</h5>
                      <p className="mt-xs-3 label-text">
                        {profileData.first_name}
                      </p>
                    </Col>
                    <Col xs={12} className="my-sm-4">
                      <h5 className="xl-grey-color p-xs profile_label py-2 fw-medium">Email:</h5>
                      <p className="mt-xs-3 label-text">
                        {profileData.email}
                      </p>
                    </Col>
                    <Col xs={12} className="my-5">
                      <div>
                        <Link
                          to="/admin/change-password"
                          className="site-btn text-decoration-none me-2"
                        >
                          Change Password
                        </Link>
                        <Link
                          to="/admin/edit/profile"
                          className="site-btn site_border_btn edit-btn text-decoration-none ms-2"
                        >
                          Edit Profile
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </DashboardLayout>
    </>
  );
};

export default AdminProfile;
