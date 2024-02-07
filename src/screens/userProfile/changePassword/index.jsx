import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useFormik } from "formik"
import { Layout } from "@components/Layout/layout"
import { changePasswordValidate } from "@components/validations"
import BackButton from "@components/backButton"
import {CustomInput} from "@components/CustomInput"
import SiteButton from "@components/Button/button"
import CustomModal from "@components/customModal"
import usePageTitle from "@hooks/usePageTitle"
import axios from "axios"

const PasswordChange = () => {
  usePageTitle("Change Password");
  const navigate = useNavigate()
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

  const passwordUpdate = () => {
    navigate(-1);
  }
  return (
    <>
    <Layout>
    <section className="password_change section_padding two_pices_bg">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="form_layout">
                <Row className="pt-5 ms-auto ps-4">
                  <Col xs={12}>
                    <div className="section_title">
                      <h3>
                        <BackButton />
                         Change Password
                      </h3>
                    </div>
                  </Col>
                </Row>
                <Row className="my-5">
                    <Col xs={12}>
                        <Row className="justify-content-center">
                            <Col xs={10} xl={5} lg={4}>
                              <div id="response"></div>
                              <Form onSubmit={handleSubmit}>
                                <CustomInput 
                                  label="Current Password" 
                                  labelClass="mainLabel" 
                                  type="password" 
                                  id="old_password"
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
                                  type="password" 
                                  id="new_password"
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
                                  placeholder="Enter Confirm Password" 
                                  inputClass="mainInput" 
                                  required 
                                  value={values.confirm_password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  errors={errors.confirm_password}
                                  touched={touched.confirm_password}
                                />  

                                <div className="text-center py-4">
                                  <SiteButton className="site-btn" type="submit" load={load}>
                                    Update
                                  </SiteButton>
                                </div>
                              </Form>
                            </Col>
                        </Row>
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
        para="Password Has Been Successfully Updated"
        success={true}
        onClickOk={passwordUpdate}
      />
    </>
  )
}

export default PasswordChange