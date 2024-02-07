import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { MentorshipReqData } from "@config/data";
import { DashboardLayout } from "@/layout/dashboardLayout";
import usePageTitle from "@hooks/usePageTitle";
import BackButton from "@components/backButton";
import axios from "axios";
import LoadingSpinner from "@components/loader";

const AdminMentorReqDetail = () => {
  usePageTitle("Mentorship Request Detail");
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [load, setLoad] = useState(true);

  const loadMentorshipRequestDetail = async () => {
    setLoad(true);
    let data = await axios.get(`/mentorship-management/${id}`)
      .then(response => {
        setDetailData(response.data.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    loadMentorshipRequestDetail();
  }, [id]);

  return (
    <>
      <DashboardLayout>
        <section className="mantor-detail">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <div className="dashCard pb-3 position-relative">
                  <Row>
                    <Col xs={12} md={11} className="m-auto">
                      <Row className="pt-5">
                        <Col md={12} lg={6}>
                          <h3>
                            <BackButton />
                            Request Detail
                          </h3>
                        </Col>
                        <Col
                          md={12}
                          lg={6}
                          className="text-start text-md-end mt-3 mt-md-0 d-flex justify-content-end"
                        >
                          {!load && (
                          <div
                            className={`statusMain position ${
                              detailData.request_status === "accepted" ||
                              detailData.request_status === "request accepted"
                                ? "statusBadgeAccepted"
                                : detailData.request_status === "rejected" ||
                                  detailData.request_status === "request rejected"
                                ? "statusBadgeRejected"
                                : detailData.request_status === "requested"
                                ? "statusBadgeRequested"
                                : detailData.request_status === "contacted"
                                ? "statusBadgeContacted"
                                : "statusBadgePending"
                            }`}
                          >
                            <span className="fw-bold">Status:</span>
                            {detailData.request_status === "accepted" ? (
                              <span className="statusBadge ps-3">Accepted</span>
                            ) : detailData.request_status === "request accepted" ? (
                              <span className="statusBadge ps-3">Request - Accepted</span>
                            ) : detailData.request_status === "contacted" ? (
                              <span className="statusBadge ps-3">Contacted</span>
                            ) : detailData.request_status === "rejected" ? (
                              <span className="statusBadge ps-3">Rejected</span>
                            ) : detailData.request_status === "request - rejected" ? (
                              <span className="statusBadge ps-3">Request - Rejected</span>
                            ) : detailData.request_status === "requested" ? (
                              <span className="statusBadge ps-3">Requested</span>
                            ) : (
                              <span className="statusBadge ps-3">Pending</span>
                            )}
                          </div>
                          )}
                        </Col>
                      </Row>
                      <div className="ps-4 ms-1">
                        <Row className="pt-3">
                          {load ? (
                            <LoadingSpinner />
                          ) : (
                          <Col xs={12} md={10}>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">ID</label>
                              <p className="fw-bold mt-3 label-text">
                                #{detailData.id}
                              </p>
                            </div>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">
                                Request Date
                              </label>
                              <p className="fw-bold mt-3 label-text">
                                {detailData.request_date}
                              </p>
                            </div>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">
                                Mentee Name
                              </label>
                              <p className="fw-bold mt-3 label-text">
                                {detailData.mentee_name}
                                <span className="ps-3">
                                  <Link className="primary_color" to={`/admin/mentee-management/details/${detailData.mentee_id}`}>
                                    View Profile
                                  </Link>
                                </span>                              
                              </p>
                            </div>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">
                                Mentor Name
                              </label>
                              <p className="fw-bold mt-3 label-text">
                                {detailData.mentor_name}
                                <span className="ps-3">
                                  <Link className="primary_color" to={`/admin/mentor-management/details/${detailData.mentor_id}`}>
                                    View Profile
                                  </Link>
                                </span>
                              </p>
                            </div>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">
                                Goals
                              </label>
                              <p className="fw-bold mt-3 label-text">
                                {detailData.goals}
                              </p>
                            </div>
                            <div className="my-4">
                              <label className="xl-grey-color p-xs">
                                Expectation
                              </label>
                              <p className="fw-bold mt-3 label-text">
                                {detailData.expectations}
                              </p>
                            </div>
                          </Col>
                          )}
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </DashboardLayout>
    </>
  );
};

export default AdminMentorReqDetail;
