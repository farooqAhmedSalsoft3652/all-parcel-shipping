import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL, menteeProfileDataa } from "@config/data";
import { Layout } from "@components/Layout/layout";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MenteeProfile = () => {
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
        <section className="mantor-detail section_padding two_pices_bg">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="form_layout pb-3 position-relative">
                  <Row className="py-5">
                    <Col xs={11} className="ms-auto pe-2">
                      <h3>My Profile</h3>
                    </Col>
                  </Row>
                  <Row>
                    {load ? (
                      <LoadingSpinner />
                    ) : (
                    <Col xs={12}>
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
                        <Col sm={8} xs={10} className="m-auto">
                            <Row className="pt-sm-5 pt-3">
                              <Col lg={4} xs={12} >
                                <div className="my-sm-4 ">
                                  <label className="xl-grey-color p-xs profile_label">
                                  User Name
                                  </label>
                                  <p className="fw-bold mt-xs-3 label-text">
                                    {`${profileData.first_name} ${profileData.last_name}`}
                                  </p>
                                </div>
                              </Col>
                              <Col lg={4} xs={12} >
                                <div className="my-sm-4 ">
                                  <label className="xl-grey-color p-xs profile_label">
                                    Email Address
                                  </label>
                                  <p className="fw-bold mt-xs-3 label-text">
                                    {profileData.email}
                                  </p>
                                </div>
                              </Col>
                              <Col lg={4} xs={12}>
                                <div className="my-sm-4 ">
                                  <label className="xl-grey-color p-xs profile_label">
                                  Contact Us
                                  </label>
                                  <p className="fw-bold mt-xs-3 label-text">
                                    {profileData.phone_number}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12}>
                                <div className="my-sm-4 ">
                                  <label className="xl-grey-color p-xs profile_label">
                                    Area Of Interest
                                  </label>
                                  <p className="fw-bold mt-xs-3 label-text">
                                  {(profileData.interests?.length > 0) ? profileData.interests.map((item, index) => (
                                    (index + 1 === profileData.interests.length) ? <>{item.interests}</> : <>{item.interests}, </>
                                  )) : <>none</>}
                                  </p>
                                </div>
                                <div className="my-sm-4 ">
                                  <label className="xl-grey-color p-xs profile_label">
                                    About Yourself
                                  </label>
                                  <p className="fw-bold mt-xs-3 label-text">
                                    {profileData.about_yourself}
                                  </p>
                                </div>
                              </Col>
                            </Row>
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
                          to="/user/edit-profile"
                          className="site-btn text-decoration-none"
                        >
                          Edit Profile
                        </Link>
                        <Link
                          to="/change-password"
                          className="ms-3 site-btn site_border_btn text-decoration-none"
                        >
                          Change Password
                        </Link>
                      </div>
                    </Col>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default MenteeProfile;
