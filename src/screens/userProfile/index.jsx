import "./index.css";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout/layout";
import { SERVER_URL } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MyProfile = () => {
  usePageTitle("My Profile");
  const [profileData, setProfileData] = useState({});
  const [load, setLoad] = useState(true);

  const loadProfileData = async () => {
    // let response = await axios.get('/profile')
    //   .then(res => {
    //     // console.log(res.data);
    //     setProfileData(res.data.data);
    //     setLoad(false);
    //   })
    //   .catch(err => {
    //     console.error(err.response.data.message);
    //     setLoad(false);
    //   });
  }

  useEffect(() => {
    // setLoad(true);
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
                              <p className="p-lg primary_color fw-bold mb-0">
                                {`${profileData.first_name} ${profileData.last_name}`}
                              </p>
                              <p className="xl-grey-color p-xs profile_label mb-0">
                                {profileData.email}
                              </p>
                              <p className="xl-grey-color p-xs profile_label">
                                {profileData.phone_number}
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={10} className="m-auto">
                            <div className="ps-4 ms-1">
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Personal Details
                                  </p>
                                </div>
                                <Col xs={10} className="p-0 ">
                                  <div className="my-4">
                                    <label className="xl-grey-color p-xs profile_label">
                                      Area Of Interest
                                    </label>
                                    <p className="fw-bold mt-3 label-text">
                                      {profileData.interests?.length > 0 ? (
                                        profileData.interests.map(
                                          (item, index) =>
                                            index + 1 ===
                                            profileData.interests.length ? (
                                              <span key={index}>
                                                {item.interests}
                                              </span>
                                            ) : (
                                              <span key={index}>
                                                {item.interests},{" "}
                                              </span>
                                            )
                                        )
                                      ) : (
                                        <>none</>
                                      )}
                                    </p>
                                  </div>
                                  <div className="my-4">
                                    <label className="xl-grey-color p-xs profile_label">
                                      About Yourself
                                    </label>
                                    <p className="fw-bold mt-3 label-text">
                                      {profileData.about_yourself}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Educational Detail
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {profileData.education?.map((item, index) => (
                                    <Row key={index}>
                                      <Col lg={4} xs={6}>
                                        <div className="my-4">
                                          <label className="xl-grey-color p-xs profile_label">
                                            Institute Name
                                          </label>
                                          <p className="fw-bold mt-3 label-text">
                                            {item.institute_name}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col lg={4} xs={6}>
                                        <div className="my-4">
                                          <label className="xl-grey-color p-xs profile_label">
                                            Degree Title
                                          </label>
                                          <p className="fw-bold mt-3 label-text">
                                            {item.degree_title}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col lg={4} xs={6}>
                                        <div className="my-4">
                                          <label className="xl-grey-color p-xs profile_label">
                                            Year
                                          </label>
                                          <p className="fw-bold mt-3 label-text">
                                            {item.from.short_date} -{" "}
                                            {item.to.short_date}
                                          </p>
                                        </div>
                                      </Col>
                                    </Row>
                                  ))}
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Work Experience
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {profileData.work_experiences?.map(
                                    (item, index) => (
                                      <Row key={index}>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Organization Name
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.organization_name}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Designation
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.designation}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Year
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.from.short_date} -{" "}
                                              {item.to.short_date}
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Certification Detail
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {profileData.certifications?.map(
                                    (item, index) => (
                                      <Row key={index}>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Institute Name
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.institute_name}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Certificate Title
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.certificate_title}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Certificate Picture
                                            </label>
                                            <div className="my-3">
                                              <img
                                                src={
                                                  SERVER_URL +
                                                  item.certificate_picture
                                                }
                                                className="img-fluid img-thumbnail"
                                                alt="certificate"
                                                width={100}
                                              />
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </Col>
                              </Row>
                            </div>
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
                            to="/profile/edit-profile"
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

export default MyProfile;
