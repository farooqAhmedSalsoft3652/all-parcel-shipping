import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import usePageTitle from "@hooks/usePageTitle";
import {CustomInput} from "@components/CustomInput";
import CustomModal from "@components/customModal";
import SiteButton from "@components/Button/button";
import BackButton from "@components/backButton";
import axios from "axios";
import { useFormik } from "formik";
import { adsValidate } from "@components/validations";

const AddSubscriptionFunc = () => {
  usePageTitle("Add Subscription");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    package_title: "",
    amount: "",
    no_of_request: "",
    details: ""
  });
  const [load, setLoad] = useState(false);

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: formData,
    validationSchema: adsValidate,
    onSubmit: (values) => handleClickedAddSub(values)
  });

  const handleClickedAddSub = (data) => {
    setLoad(true);

    let response = axios.post('/ad-management/add', data)
      .then(() => {
        setShowModal(true);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/admin/ad-subscription");
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
                          Add Subscription
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Form onSubmit={handleSubmit}>
                    <Row className="pt-5 pb-3">
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Package Title"
                          labelClass="mainLabel bold"
                          type="text"
                          id="package_title"
                          placeholder="Enter Package Title"
                          inputClass="mainInput"
                          required
                          value={values.package_title}
                          errors={errors.package_title}
                          touched={touched.package_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Amount"
                          labelClass="mainLabel bold"
                          type="text"
                          id="amount"
                          placeholder="Enter Amount"
                          inputClass="mainInput"
                          required
                          value={values.amount}
                          errors={errors.amount}
                          touched={touched.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Number Of Requests"
                          labelClass="mainLabel bold"
                          type="number"
                          id="no_of_request"
                          placeholder="Enter Number Of Requests"
                          inputClass="mainInput"
                          required
                          value={values.no_of_request}
                          errors={errors.no_of_request}
                          touched={touched.no_of_request}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Detail"
                          labelClass="mainLabel bold"
                          type="text"
                          id="details"
                          placeholder="Enter Package Details"
                          inputClass="mainInput"
                          required
                          value={values.details}
                          errors={errors.details}
                          touched={touched.details}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <SiteButton
                          type="submit"
                          className="site-btn"
                          load={load}
                        >
                          Add
                        </SiteButton>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>
      
      <CustomModal
        show={showModal}
        close={closeModal}
        onClickOk={closeModal}
        success
        para="Subscription Package Has Been Added Successfully"
      />
    </>
  );
};

export default AddSubscriptionFunc;