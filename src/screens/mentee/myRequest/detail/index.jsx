import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "@components/Layout/layout";
import BackButton from "@components/backButton";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import { status, SERVER_URL } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MyRequestDetail = () => {
  usePageTitle("Request Detail");
  const navigate = useNavigate();
  const { id } = useParams();
  const [requestDetail, setRequestDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showYesButton, setShowYesButton] = useState(true);
  const [showNoButton, setShowNoButton] = useState(true);
  const [load, setLoad] = useState(true);

  const loadRequestDetail = async () => {
    setLoad(true);
    let response = await axios.get(`/my-requests/detail?id=${id}`)
      .catch(err => {
        console.error(err.response.data);
        setLoad(false);
      });

      if(response.data.status){
          // console.log(response.data.data);
        setRequestDetail(response.data.data);
        setLoad(false);
      }else{
        setLoad(false);
        navigate('/my-request');
      }
  }

  useEffect(() => {
    loadRequestDetail();
  }, [id]);

  const modelAction = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  const handleContacted = () => {
    setRequestDetail((prevData) => ({
      ...prevData,
      status: "Contacted",
    }));
    setShowModal2(false);
  };

  const handleRejected = () => {
    setRequestDetail((prevData) => ({
      ...prevData,
      status: status.req_rejected,
    }));
    setShowModal4(false);
  };

  const handleAccepted = () => {
    setRequestDetail((prevData) => ({
      ...prevData,
      status: status.req_accepted,
    }));
    setShowModal6(false);
  };

  const hideRevealContact = async (status_value) => {
    let response = await axios.post(`/my-requests/update?id=${id}`, {status: status_value})
      .then(res => {
        // console.log(res.data);
        if(res.data.status){
          if(res.data.data.status === status.req_accepted){
            setShowModal5(false);
            setShowModal6(true);
          }
          else if(res.data.data.status === status.req_rejected){
            setShowModal3(false);
            setShowModal4(true);
          }
        }
      })
      .catch(err => {
        console.error(err.response.data);
      });
  }

  return (
    <>
      <Layout>
        <section className="mantor-detail section_padding two_pices_bg">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="form_layout pb-3 position-relative">
                  <Row>
                    <Col xs={12} md={10} className="m-auto">
                      <Row className="pt-5">
                        <Col md={12} lg={6}>
                          <h3>
                            <BackButton />
                            Request Details
                          </h3>
                        </Col>
                        {!load && (
                          <Col
                            md={12}
                            lg={6}
                            className="text-start text-md-end mt-3 mt-md-0 d-flex justify-content-end"
                          >
                            <div
                              className={`statusMain position ${
                                requestDetail.status === status.accepted ||
                                requestDetail.status === status.req_accepted
                                  ? "statusBadgeAccepted"
                                  : requestDetail.status === status.rejected ||
                                    requestDetail.status === status.req_rejected
                                  ? "statusBadgeRejected"
                                  : requestDetail.status === status.requested
                                  ? "statusBadgeRequested"
                                  : requestDetail.status === status.contacted
                                  ? "statusBadgeContacted"
                                  : "statusBadgePending"
                              }`}
                            >
                              <span className="fw-bold">Status:</span>
                              {requestDetail.status === status.accepted ? (
                                <span className="statusBadge ps-3">
                                  Accepted
                                </span>
                              ) : requestDetail.status ===
                                status.req_accepted ? (
                                <span className="statusBadge ps-3">
                                  Request - Accepted
                                </span>
                              ) : requestDetail.status === status.contacted ? (
                                <span className="statusBadge ps-3">
                                  Contacted
                                </span>
                              ) : requestDetail.status === status.rejected ? (
                                <span className="statusBadge ps-3">
                                  Rejected
                                </span>
                              ) : requestDetail.status ===
                                status.req_rejected ? (
                                <span className="statusBadge ps-3">
                                  Request - Rejected
                                </span>
                              ) : requestDetail.status === status.requested ? (
                                <span className="statusBadge ps-3">
                                  Requested
                                </span>
                              ) : (
                                <span className="statusBadge ps-3">
                                  Pending
                                </span>
                              )}
                            </div>
                          </Col>
                        )}
                      </Row>
                      <div className="ps-4 ms-1">
                        {load ? (
                          <LoadingSpinner />
                        ) : (
                          <Row>
                            <Col xs={12} md={10}>
                              <div className="my-4">
                                <label className="xl-grey-color p-xs">ID</label>
                                <p className="fw-bold mt-3 label-text">
                                  #{requestDetail.id}
                                </p>
                              </div>
                              <div className="my-4">
                                <label className="xl-grey-color p-xs">
                                  Request Date
                                </label>
                                <p className="fw-bold mt-3 label-text">
                                  {requestDetail.request_date}
                                </p>
                              </div>
                              <div className="my-4">
                                <label className="xl-grey-color p-xs">
                                  Goals
                                </label>
                                <p className="fw-bold mt-3 label-text">
                                  {requestDetail.goals}
                                </p>
                              </div>
                              <div className="my-4">
                                <label className="xl-grey-color p-xs">
                                  Expectation
                                </label>
                                <p className="fw-bold mt-3 label-text">
                                  {requestDetail.expectations}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
                {!load && (
                  <div className="form_layout pb-3 position-relative mt-5">
                    <Row className="py-5">
                      <Col xs={11} className="ms-auto pe-2">
                        <h3>Mentor Information</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Row>
                          <Col xs={12}>
                            <div className="sec_title d-block text-center">
                              <div className="mb-2">
                                <div className="attached">
                                  <img
                                    src={
                                      SERVER_URL + requestDetail.mentor_avatar
                                    }
                                    className="img-fluid ml-0 profile_img"
                                    alt={true.toString()}
                                  />
                                </div>
                              </div>
                              <p className="p-lg primary_color fw-bold mb-0">
                                {requestDetail.mentor_name}
                              </p>
                              {/* <p className="xl-grey-color p-xs profile_label mb-0">
                              {requestDetail.mentor_email}
                            </p>
                            <p className="xl-grey-color p-xs profile_label">
                              {requestDetail.mentor_phone}
                            </p> */}
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
                                      {requestDetail.interests?.length > 0 ? (
                                        requestDetail.interests.map(
                                          (item, index) =>
                                            index + 1 ===
                                            requestDetail.interests.length ? (
                                              <>{item.interests}</>
                                            ) : (
                                              <>{item.interests}, </>
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
                                      {requestDetail.mentor_about}
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
                                  {requestDetail.education?.map(
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
                                    )
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Work Experience
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {requestDetail.work_experiences?.map(
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
                                  {requestDetail.certifications?.map(
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
                            <div className="my-5">
                              {requestDetail.status === status.requested ? (
                                <>
                                  <SiteButton
                                    onClick={() => setShowModal5(true)}
                                    className="site-btn me-2"
                                  >
                                    Reveal Contact
                                  </SiteButton>
                                  <SiteButton
                                    onClick={() => setShowModal3(true)}
                                    className=" site-btn site_border_btn"
                                  >
                                    Hide Contact
                                  </SiteButton>
                                </>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="Are You Sure You Want To Mark The 
        Request As Contacted?"
        success={false}
        action={modelAction}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal2}
        close={() => setShowModal2(false)}
        onClickOk={handleContacted}
        success
        para="Request Has Marked As Contacted"
      />

      <CustomModal
        show={showModal3}
        close={() => setShowModal3(false)}
        para="Are you sure you want to hide the contact? once you hide the contact it will not be visible to the mentor."
        success={false}
        action={() => hideRevealContact(0)}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal4}
        // close={() => setShowModal4(false)}
        onClickOk={handleRejected}
        success
        para="Your contact has been hidden and it will not be visible to mentor"
      />

      <CustomModal
        show={showModal5}
        close={() => setShowModal5(false)}
        para="Are you sure you want to reveal contact detail?"
        success={false}
        action={() => hideRevealContact(1)}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal6}
        // close={() => setShowModal6(false)}
        onClickOk={handleAccepted}
        success
        para="Your contact has been revealed and will now be visible to the mentor."
      />
    </>
  );
};

export default MyRequestDetail;
