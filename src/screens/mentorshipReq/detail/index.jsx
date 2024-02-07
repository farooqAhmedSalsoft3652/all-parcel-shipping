import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

import BackButton from "@components/backButton";
import { Layout } from "@components/Layout/layout";
import { status } from "@config/data";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MentorReqDetail = () => {
  usePageTitle("Mentorship Request Detail");

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
    let response = await axios.get(`/request-detail?id=${id}`)
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
      navigate('/mentorship-request');
    }
  }

  const handlePendingRequest = async (value) => {
    let data = await axios.post(`/update-request?id=${id}`, {status: value})
      .then(response => {
        console.log(response.data.message);
      })
      .catch(err => console.error(err.response.data));
  }
  
  useEffect(() => {
    loadRequestDetail();
  }, [id]);

  const modelAction = async () => {
    let data = await axios.post(`/mark-as-contacted?id=${id}`)
    .then(response => {
      console.log(response.data);
      setShowModal(false)
      setShowModal2(true)
    })
    .catch(err => console.error(err.response.data));
  }

  const handleContacted = () => {
    setRequestDetail((prevData) => ({
      ...prevData,
      status: "contacted",
    }));
    setShowModal2(false)
  }
  
  const rejectModel = () => {
    handlePendingRequest(0);
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleRejected = () => {
    setRequestDetail((prevData) => ({
      ...prevData,
      status: "rejected",
    }));
    setShowModal4(false)
  }

  const acceptModel = () => {
    handlePendingRequest(1);
    setShowModal5(false)
    setShowModal6(true)
  }

  const handleAccepted = () => {
    setRequestDetail((prevData) => ({
      ...prevData,
      status: "requested",
    }));
    setShowModal6(false)
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
                              <span className="statusBadge ps-3">Accepted</span>
                            ) : requestDetail.status === status.req_accepted ? (
                              <span className="statusBadge ps-3">Request - Accepted</span>
                            ) : requestDetail.status === status.contacted ? (
                              <span className="statusBadge ps-3">Contacted</span>
                            ) : requestDetail.status === status.rejected ? (
                              <span className="statusBadge ps-3">Rejected</span>
                            ) : requestDetail.status === status.req_rejected ? (
                              <span className="statusBadge ps-3">Request - Rejected</span>
                            ) : requestDetail.status === status.requested ? (
                              <span className="statusBadge ps-3">Requested</span>
                            ) : (
                              <span className="statusBadge ps-3">Pending</span>
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
                            {/* <div className="my-4">
                              <label className="xl-grey-color p-xs">ID</label>
                              <p className="fw-bold mt-3 label-text">
                                #{requestDetail.id}
                              </p>
                            </div> */}
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
                            <div>
                              <h5 className="primary_color">
                                Mentee Information
                              </h5>
                            </div>
                            <Row>
                              <Col lg={3} xs={6}>
                                <div className="my-4">
                                  <label className="xl-grey-color p-xs">
                                    Mentee Name
                                  </label>
                                  <p className="fw-bold mt-3 label-text">
                                    {requestDetail.mentee_name}
                                  </p>
                                </div>
                              </Col>
                              <Col lg={3} xs={6}>
                                <div className="my-4">
                                  <label className="xl-grey-color p-xs">
                                    Email Address
                                  </label>
                                  <p className="fw-bold mt-3 label-text">
                                    {requestDetail.email ?? "-"}
                                  </p>
                                </div>
                              </Col>
                              <Col lg={3} xs={6}>
                                <div className="my-4">
                                  <label className="xl-grey-color p-xs">
                                    Phone Number
                                  </label>
                                  <p className="fw-bold mt-3 label-text">
                                    {requestDetail.phone_number ?? "-"}
                                  </p>
                                </div>
                              </Col>
                              <Col lg={3} xs={6}>
                                <div className="my-4">
                                  <label className="xl-grey-color p-xs">
                                    Area of Interest
                                  </label>
                                  <p className="fw-bold mt-3 label-text">
                                    {(requestDetail.interests?.length > 0) ? 
                                      requestDetail.interests.map((item, index) => (
                                        (index + 1 === requestDetail.interests.length) ? 
                                          <>{item.interests}</> : 
                                          <>{item.interests}, </>
                                    )) : <>none</>}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">
                                About Mentee
                              </label>
                              <p className="fw-bold mt-3 label-text">
                                {requestDetail.about}
                              </p>
                            </div>
                            <div className="my-5">
                                  {requestDetail.status === status.req_accepted ? (
                                    <SiteButton className="site-btn" onClick={() => setShowModal(true)}>
                                      Mark As Contacted
                                    </SiteButton>
                                  ) : requestDetail.status === status.pending ? (
                                    <>
                                      <SiteButton onClick={() => setShowModal5(true)} className="site-btn me-2">
                                        Accept
                                      </SiteButton>
                                      <SiteButton onClick={() => setShowModal3(true)} className=" site-btn site_border_btn">
                                        Reject
                                      </SiteButton>
                                    </>
                                  ) : null}
                                </div>
                          </Col>
                        </Row>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="Are You Sure You Want To Mark The Request As Contacted?"
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
        para="Are You Sure You Want To Reject The Request?"
        success={false}
        action={rejectModel}   
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal4}
        close={() => setShowModal4(false)}
        onClickOk={handleRejected}
        success
        para="Request Has Been Rejected"
      />
      <CustomModal
        show={showModal5}
        close={() => setShowModal5(false)}
        para="Are You Sure You Want To Accept The Request. 
        Upon Accepting The Request You Will Request The Mentee To Unhide Their Contact Details"
        success={false}
        action={acceptModel}   
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal6}
        close={() => setShowModal6(false)}
        onClickOk={handleAccepted}
        success
        para="Contact Detail Has Been Requested Successfully"
      />
    </>
  );
};

export default MentorReqDetail;
