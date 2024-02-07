import { Col, Container, Form, Row } from "react-bootstrap";
import usePageTitle from "@hooks/usePageTitle";
import { DashboardLayout } from "@/layout/dashboardLayout";
import BackButton from "@components/backButton";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import { changePasswordValidate } from "@components/validations"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminChangePassword = () => {
  const navigate = useNavigate()
  usePageTitle("Change Password");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [load, setLoad] = useState(false);

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: formData,
    validationSchema: changePasswordValidate,
    onSubmit: (value) => handleFormSubmit(value)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (data) => {
    setLoad(true);

    let response = await axios.post('/change-password', data)
      .then(() => {
        setShowModal(true);
        setLoad(false);
      })
      .catch(err => {
        document.getElementById('response').innerHTML = 
        `<div className="alert alert-danger" role="alert"><strong>Ops!</strong> ${err.response.data.message}</div>`;
        setLoad(false);
      });
  }

  const modalAction = () => {
    setShowModal(false);
    navigate('/admin/my-profile');
  }

  return (
    <>
      <DashboardLayout>
        <section className="profile">
          <Container fluid>
            <div className="dashCard">
              <Row>
                <Col md={11} xs={12}>
                  <Row className="py-5">
                    <Col md={11} xs={12} className="ps-sm-5">
                      <h3>
                        <BackButton />
                        Change Password
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={6} xs={12}>
                      <div className="ps-sm-5 ms-sm-4">
                        <div id="response"></div>
                        <Form onSubmit={handleSubmit}>
                          <CustomInput
                            label="Current Password"
                            labelClass="mainLabel"
                            id="old_password"
                            type="password"
                            name="old_password"
                            placeholder="Enter Current Password"
                            inputClass="mainInput"
                            required
                            value={values.old_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors.old_password}
                            touched={touched.old_password}
                          />
                          <CustomInput
                            label="New Password"
                            labelClass="mainLabel"
                            id="new_password"
                            type="password"
                            name="new_password"
                            placeholder="Enter New Password"
                            inputClass="mainInput"
                            required
                            value={values.new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors.new_password}
                            touched={touched.new_password}
                          />
                          <CustomInput
                            label="Confirm Password"
                            labelClass="mainLabel"
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Enter Confirm Password"
                            inputClass="mainInput"
                            required
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors.confirm_password}
                            touched={touched.confirm_password}
                          />
                          <div className="pt-4">
                            <SiteButton type="submit" className="site-btn" load={load}>Update</SiteButton>
                          </div>
                        </Form>

                      </div>
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
        success
        onClickOk={modalAction}
        para="Password Has Been Successfully Updated"
      />
    </>
  );
};

export default AdminChangePassword;
