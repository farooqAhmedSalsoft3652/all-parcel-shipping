import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Layout } from "@components/Layout/layout";
import { SERVER_URL } from "@config/data";
import { mentorshipValidations } from "@components/validations";
import usePageTitle from "@hooks/usePageTitle";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import BackButton from "@components/backButton";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MentorDetail = () => {
  usePageTitle("Mentor Detail");
  const navigate = useNavigate();

  const { id } = useParams();
  const [fees, setFees] = useState({});
  const [formData, setFormData] = useState({goals: "", expectations: ""});
  const [detailData, setDetailData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);

  const loadMentorDetail = async () => {
    let response = await axios.get(`/mentor/detail?id=${id}`)
      .catch(err => {
        console.error(err.response.data);
        setLoad(false);
      });

    if(response.data.status){
      setDetailData(response.data.data);
      setLoad(false);
    }else{
      setLoad(false);
      navigate(-1);
    }
  }

  const loadFees = async () => {
    let data = await axios.get('/get-mentorship-fees')
      .then(response => {
        setFees(response.data.data);
      })
      .catch(err => console.error(err.response.data));
  }
  
  useEffect(() => {
    loadFees();
    loadMentorDetail();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useFormik({
    initialValues: formData,
    validationSchema: mentorshipValidations,
    onSubmit: (value) => handleSubmit2(value)
  });

  const handleSubmit2 = async (data) => {
    setLoad2(true);

    data.mentor_id = id;
    data.mentor_charges = fees.fees;

    let response = await axios.post('/mentor/request', data)
    .catch(err => console.error(err.response.data));

    if(response.data.status){
      window.open(response.data.data.url, 'Payment', 'popup=yes,width=450,height=750,left=100,top=100');
      setShowModal(false);
      setLoad2(false);

      setTimeout(() => {
        navigate('/my-request')
      }, 2000);
    }
  };

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
                      <h3>
                        <BackButton />
                        Mentor Detail
                      </h3>
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
                                    src={SERVER_URL + detailData.avatar}
                                    className="img-fluid ml-0 profile_img"
                                    alt={true.toString()}
                                  />
                                </div>
                              </div>
                              <p className="p-lg primary_color fw-bold mb-0">
                                {detailData.full_name}
                              </p>
                              {/* <p className="xl-grey-color p-xs profile_label mb-0">
                              {detailData.email}
                            </p>
                            <p className="xl-grey-color p-xs profile_label">
                              {detailData.phone_number}
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
                                      {detailData?.interests?.length > 0 ? (
                                        detailData.interests.map(
                                          (item, index) =>
                                            index + 1 ===
                                            detailData.interests.length ? (
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
                                      {detailData.about_yourself}
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
                                  {detailData.education?.map((item, index) => (
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
                                  {detailData.work_experiences?.map(
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
                                  {detailData.certifications?.map(
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
                          <SiteButton
                            onClick={() => setShowModal(true)}
                            className="site-btn"
                          >
                            Request Mentorship For ${fees.fees}
                          </SiteButton>
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

      <CustomModal
        show={showModal}
        close={closeModal}
        heading="Request Detail"
        success={false}
        showRejectionReason={false}
        showAdditionalContent={true}
        // setFormData={setFormData}
        // handleAdditionalButton={handleAdditionalButtonClick}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
        values={values}
        errors={errors}
        touched={touched}
        load={load2}
      />
      <CustomModal
        show={showModal2}
        close={() => setShowModal2(false)}
        para="Payment Successfull!"
        onClickOk={() => navigate("/my-request")}
        success
      />
    </>
  );
};

export default MentorDetail;
