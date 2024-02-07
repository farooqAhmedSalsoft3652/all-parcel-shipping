import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { Mentortable, SERVER_URL } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import BackButton from "@components/backButton";
import CustomModal from "@components/customModal";
import SiteButton from "@components/Button/button";
import axios from "axios";

const AdminMentorProfile = () => {
  usePageTitle("Mentor Profile");
  const { id } = useParams();
  const naviagte = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);
  const [showYesButton, setShowYesButton] = useState(true);
  const [showNoButton, setShowNoButton] = useState(true);
  const [load, setLoad] = useState(true);

  const loadMentorProfile = async () => {
    setLoad(true);
    let data = await axios.get(`/mentor-management/${id}`)
      .then(response => {
        // console.log(response.data.data);
        setProfileData(response.data.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      })
  }

  useEffect(() => {
    loadMentorProfile();
  }, [id]);

  const handleUpdateReject = () => {
    setShowModal6(false);
    setShowModal7(true);
  };

  const handleUpdateReject2 = async () => {
    formData.update_approved = 2;
    let data = await axios.post(`/mentor-management/request/${id}/update`, formData)
      .then(response => {
        setShowModal7(false);
        setShowModal3(true);
        setFormData({});
      }).catch(err => console.error(err.response.data.message));
  }

  const handleUpdateApprove = async () => {
    formData.update_approved = 1;
    let data = await axios.post(`/mentor-management/request/${id}/update`, formData)
      .then(response => {
        setShowModal8(false);
        setShowModal5(true);
        setFormData({});
      }).catch(err => console.error(err.response.data.message));
  }

  const handleReject = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  const handleReject2 = async () => {
    formData.approved = 2;
    let data = await axios.post(`/mentor-management/request/${id}/update`, formData)
      .then(response => {
        setShowModal2(false);
        setShowModal3(true);
        setFormData({});
      }).catch(err => console.error(err.response.data.message));
  };

  const handleReject3 = () => {
    setShowModal3(false);
    naviagte('/admin/mentor-management/account-request');
  };

  const handleApprove = async () => {
    formData.approved = 1;
    let data = await axios.post(`/mentor-management/request/${id}/update`, formData)
      .then(response => {
        setShowModal4(false);
        setShowModal5(true);
        setFormData({});
      }).catch(err => console.error(err.response.data.message));
  }; 0

  const handleApprove2 = () => {
    setShowModal5(false);
    naviagte('/admin/mentor-management');
  };

  return (
    <>
      <DashboardLayout>
        <section className="mantor-profile">
          <Container fluid>
            <div className="dashCard position-relative">
              <Row>
                <Col xs={12} lg={11} className="m-auto">
                  <Row className="py-5">
                    <Col md={12} lg={6} className="ms-auto pe-2">
                      <h3>
                        <BackButton />
                        Mentor Profile
                      </h3>
                    </Col>
                    <Col
                      md={12}
                      lg={6}
                      className="text-start text-md-end mt-3 mt-md-0 d-flex justify-content-end"
                    >
                      <div
                        className={`statusMain position ${
                          profileData.approved === 0 ||
                          profileData.update_approved === 0
                            ? "statusBadgePending"
                            : profileData.approved === 2 ||
                              profileData.update_approved === 2
                            ? "statusBadgeRejected"
                            : ""
                        }`}
                      >
                        <span className="fw-bold">Status:</span>
                        {profileData.approved === 0 ||
                        profileData.update_approved === 0 ? (
                          <span className="statusBadge ps-3">Pending</span>
                        ) : profileData.approved === 2 ||
                          profileData.update_approved === 2 ? (
                          <span className="statusBadge ps-3">Rejected</span>
                        ) : (
                          ""
                        )}
                      </div>
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
                                  src={SERVER_URL + profileData.avatar}
                                  className="img-fluid ml-0 profile_img"
                                  alt={true.toString()}
                                />
                              </div>
                            </div>
                            <p className="p-lg primary_color fw-bold mb-0">
                              {profileData.full_name}
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
                        <Col xs={12}>
                          <div className="ps-4 ms-1">
                            <Row>
                              <div className="detail_title">
                                <p className="p-lg primary_color fw-bold mb-0">
                                  Personal Details
                                </p>
                              </div>
                              <Col xs={10} className="p-0 ">
                                <Row>
                                  <Col md={4}>
                                    <div className="my-md-4 my-2">
                                      <label className="xl-grey-color p-xs profile_label">
                                        Area Of Interest
                                      </label>
                                      <p className="fw-bold mt-3 label-text">
                                        {profileData.interests?.length > 0 ? (
                                          profileData.interests.map(
                                            (item, index) =>
                                              index + 1 ===
                                              profileData.interests.length ? (
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
                                  </Col>
                                </Row>
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
                  </Row>
                  <Row className="my-3">
                    <Col xs={12}>
                      <>
                        {profileData.approved === 2 ? (
                          <>
                            <div className="detail_title ">
                              <p className="p-lg primary_color fw-bold mb-0">
                                Reason
                              </p>
                            </div>
                            <Row>
                              <Col md={10} xs={12}>
                                <div className="reason">
                                  <div className="my-4 d-flex gap-2 align-items-center">
                                    <label className="xl-grey-color p-xs profile_label">
                                      Rejection Reason
                                    </label>
                                  </div>
                                  <p className="fw-bold mt-3 label-text">
                                    {profileData.reject_reason}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </>
                        ) : profileData.approved === 0 ? (
                          <div className="text-center">
                            <SiteButton
                              onClick={() => setShowModal4(true)}
                              className="site-btn me-2"
                            >
                              Approve
                            </SiteButton>
                            <SiteButton
                              onClick={() => setShowModal(true)}
                              className=" site-btn site_border_btn"
                            >
                              Reject
                            </SiteButton>
                          </div>
                        ) : null}
                      </>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={12}>
                      <>
                        {profileData.update_approved === 2 ? (
                          <>
                            <div className="detail_title ">
                              <p className="p-lg primary_color fw-bold mb-0">
                                Reason
                              </p>
                            </div>
                            <Row>
                              <Col md={10} xs={12}>
                                <div className="reason">
                                  <div className="my-4 d-flex gap-2 align-items-center">
                                    <label className="xl-grey-color p-xs profile_label">
                                      Rejection Reason
                                    </label>
                                  </div>
                                  <p className="fw-bold mt-3 label-text">
                                    {profileData.reject_reason}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </>
                        ) : profileData.update_approved === 0 ? (
                          <div className="text-center">
                            <SiteButton
                              onClick={() => setShowModal8(true)}
                              className="site-btn me-2"
                            >
                              Approve
                            </SiteButton>
                            <SiteButton
                              onClick={() => setShowModal6(true)}
                              className=" site-btn site_border_btn"
                            >
                              Reject
                            </SiteButton>
                          </div>
                        ) : null}
                      </>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="Are You Sure You Want To Reject Account Request?"
        success={false}
        action={handleReject}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal2}
        close={() => setShowModal2(false)}
        Reasonheading="Rejection Reason"
        success={false}
        showRejectionReason={true}
        setFormData={setFormData}
        handleReason={handleReject2}
      />
      <CustomModal
        show={showModal3}
        close={() => setShowModal3(false)}
        onClickOk={handleReject3}
        success
        para="Account Request Has Been Rejected Successfully."
      />
      <CustomModal
        show={showModal4}
        close={() => setShowModal4(false)}
        para="Are You Sure You Want To Accept Account Request?"
        success={false}
        action={handleApprove}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal5}
        close={() => setShowModal5(false)}
        onClickOk={handleApprove2}
        success
        para="Account Request Has Been Accepted Successfully."
      />
      {/* Update Account Request */}
      <CustomModal
        show={showModal6}
        close={() => setShowModal6(false)}
        para="Are You Sure You Want To Reject Account Request?"
        success={false}
        action={handleUpdateReject}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal7}
        close={() => setShowModal7(false)}
        Reasonheading="Rejection Reason"
        success={false}
        showRejectionReason={true}
        setFormData={setFormData}
        handleReason={handleUpdateReject2}
      />
      <CustomModal
        show={showModal8}
        close={() => setShowModal8(false)}
        para="Are You Sure You Want To Accept Account Request?"
        success={false}
        action={handleUpdateApprove}
        showYesNoButtons={showYesButton || showNoButton}
      />
    </>
  );
};

export default AdminMentorProfile;
