import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import BackButton from "@components/backButton";
import SiteButton from "@components/Button/button";
import {CustomInput} from "@components/CustomInput";
import CustomModal from "@components/customModal";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import { editInterestValidate } from "@components/validations";
import { useFormik } from "formik";
import axios from "axios";

const EditInterest = () => {
  usePageTitle("Edit Interest");
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [detailData, setDetailData] = useState({}); 
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(true);

  const loadInterestDetail = async () => {
    setLoad2(true);
    let data = await axios.get(`/interest-management/${id}`)
      .then(response => {
        setDetailData(response.data.data);
        setLoad2(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad2(false);
      });
  }

  useEffect(() => {
    loadInterestDetail();
  }, [id]);

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: formData,
    validationSchema: editInterestValidate,
    onSubmit: (values) => handleFormSubmit(values)
  });

  const handleFormSubmit = async (data) => {
      setLoad(true);
      let response = await axios.post(`/interest-management/${id}/update`, data)
        .then(() => {
          setShowModal(true);
          setLoad(false);
        })
        .catch(err => {
          console.error(err.response.data.message);
          setLoad(false);
        });
  };

  const handleClick = () => {
    setShowModal(false);
    navigate("/admin/interests-management");
  }

  return (
    <>
      <DashboardLayout>
        <section>
          <Container fluid>
            <div className="dashCard py-3">
              <Row className="py-5 ps-5 ">
                <Col xs={12} xl={8}>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <h3 className="text-capitalize">
                          <BackButton />
                          Edit Interest
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  {load2 ? (
                    <LoadingSpinner />
                  ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row className="pt-5 pb-3">
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Interest Name"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Interest Name"
                          labelClass="mainLabel bold"
                          inputClass="mainInput"
                          value={values.name ?? detailData.name}
                          errors={errors.name}
                          touched={touched.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Col>
                      {/* <Col xs={12} md={6}>
                        <label htmlFor="" className="mainLabel bold">
                          Status<span className="text-danger">*</span>
                        </label>
                        <select
                          className="mainInput"
                          value={formData.status ?? detailData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <SiteButton
                          className="site-btn"
                          type="submit"
                          load={load}
                        >
                          Update
                        </SiteButton>
                      </Col>
                    </Row>
                  </Form>
                  )}
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        onClickOk={handleClick}
        success
        para="Interest Updated Successfully"
      />
    </>
  );
};

export default EditInterest;