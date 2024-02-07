import "./index.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import usePageTitle from "@hooks/usePageTitle";
import { SERVER_URL } from "@config/data";
import BackButton from "@components/backButton";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import { DashboardLayout } from "@/layout/dashboardLayout";
import axios from "axios";
import { decode, encode } from "base-64";

const EditAdminProfile = () => {
  usePageTitle("Edit Profile");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [editedImage, setEditedImage] = useState(null);
  const [profileErrors, setProfileErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [value, setValue] = useState();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  useEffect(() => {
    let user = JSON.parse(decode(localStorage.getItem('user')));
    setProfileData(user);
    setValue(user.phone_number);
  }, []);

  const handleImageChange = async (e) => {
    setLoad2(true);
    const profileImage = e.target.files[0];
    if (profileImage) {
      let data = await axios.post('/change-avatar', {profile: profileImage}, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        setEditedImage(URL.createObjectURL(profileImage));
        setProfileData(prevData => ({...prevData, avatar: response.data.data}));
        setProfileErrors("");
        setShowModal2(true);
        setLoad2(false);
      })
      .catch(err => {
        console.error(err.response.data);
        setProfileErrors(err.response.data.message);
        setLoad2(false);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    if(value) formData.phone_number = value;

    let data = await axios.post('/edit-profile', formData)
      .then(response => {
        localStorage.setItem('user', encode(JSON.stringify(response.data.data)));
        setShowModal(true);
        setFormData({});
        setFormErrors({});
        setLoad(false);
      })
      .catch(err => {
        setLoad(false);
        setFormErrors(err.response.data.data)
      });
  }

  const dataUpdated = () => {
    navigate("/admin/my-profile");
  };

  const avatarUpdated = () => {
    setShowModal2(false);
    localStorage.setItem('user', encode(JSON.stringify(profileData)));
    navigate("/admin/my-profile");
  };

  return (
    <>
      <DashboardLayout>
        <section className="edit-profile">
          <Container fluid>
            <div className="dashCard">
              <Row>
                <Col xs={12}>
                  <Row className="pt-5 ms-auto ps-4">
                    <Col xs={12}>
                      <div className="section_title">
                        <h3>
                          <BackButton />
                          Edit Profile
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="pt-5">
                    <Col xs={12}>
                      <div className="sec_title d-block text-center">
                        <div className="mb-2">
                          <div className="attached position-relative">
                            <img
                              src={
                                editedImage || SERVER_URL + profileData.avatar
                              }
                              className="img-fluid ml-0 profile_img "
                              alt={true.toString()}
                            />

                            <label
                              htmlFor={!load2 && "imageUpload"}
                              className="camera-icon"
                            >
                              {load2 ? (
                                <div
                                  className="spinner-border text-primary spinner-border-sm"
                                  role="status"
                                ></div>
                              ) : (
                                <FontAwesomeIcon icon={faCamera} />
                              )}
                            </label>
                            <input
                              type="file"
                              id="imageUpload"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                          </div>
                          {profileErrors && (
                            <small className="text-danger">
                              {profileErrors}
                            </small>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Form onSubmit={handleSubmit}>
                    <Row className="pt-4">
                      <Col lg={10} className="offset-lg-1">
                        <Row className="pt-3">
                          <Col lg={6} xs={12}>
                            <CustomInput
                              label="First Name"
                              required
                              id="first_name"
                              type="text"
                              placeholder="Enter First Name"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={
                                formData.first_name ?? profileData.first_name
                              }
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  first_name: e.target.value,
                                })
                              }
                              inputError={formErrors.first_name}
                            />
                          </Col>
                          <Col lg={6} xs={12}>
                            <CustomInput
                              label="Last Name"
                              required
                              id="last_name"
                              type="text"
                              placeholder="Enter Last Name"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={
                                formData.last_name ?? profileData.last_name
                              }
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  last_name: e.target.value,
                                })
                              }
                              inputError={formErrors.last_name}
                            />
                          </Col>
                          <Col lg={6} xs={12}>
                            <label className="mainLabel bold">
                              Phone Number
                            </label>
                            <PhoneInput
                              placeholder="Enter phone number"
                              value={value}
                              onChange={setValue}
                              className="mainInput"
                              defaultCountry="US"
                              focusInputOnCountrySelection="false"
                            />
                            {formErrors.phone_number ? (
                              <small className="text-danger ms-2">
                                {formErrors.phone_number[0]}
                              </small>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="text-center py-5">
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
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={dataUpdated}
        para="Your Profile Has Been Successfully Updated"
        success={true}
        onClickOk={dataUpdated}
      />

      <CustomModal
        show={showModal2}
        close={avatarUpdated}
        para="Your avatar has been successfully updated!"
        success={true}
        onClickOk={avatarUpdated}
      />
    </>
  );
};

export default EditAdminProfile;
