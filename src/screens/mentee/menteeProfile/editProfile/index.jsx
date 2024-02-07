import "react-phone-number-input/style.css";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Select } from 'antd';
import { decode, encode } from "base-64";
import { SERVER_URL } from "@config/data";
import { Layout } from "@components/Layout/layout";
import BackButton from "@components/backButton";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import usePageTitle from "@hooks/usePageTitle";
import PhoneInput from "react-phone-number-input";
import axios from "axios";

const EditUserProfile = () => {
  usePageTitle("Edit Profile");
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [profileData, setProfileData] = useState({});
  const [editedImage, setEditedImage] = useState(null);
  const [profileErrors, setProfileErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const loadInterest = async () => {
    const options = [];
    let response = await axios.get('/get-interests')
      .then(res => {
        res.data.data.map(item => {
          options.push({
            value: item.name,
            label: item.name
          });
        });
        setInterests(options);
      })
      .catch(err => console.error(err.response.data));
  }

  useMemo(() => {
    let user = JSON.parse(decode(localStorage.getItem('user')));

    let interest = user.interests.map(e => e.interests);
    setUserInterests(interest);
    setProfileData(user);
    setValue(user.phone_number);
  }, []);

  useEffect(() => {
    loadInterest();
  }, []);

  const handleImageChange = (e) => {
    setLoad2(true);
    const profileImage = e.target.files[0];
    if (profileImage) {
      let data = axios.post('/change-avatar', { profile: profileImage }, {
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => {
          setEditedImage(URL.createObjectURL(profileImage));
          setProfileData(prevData => ({ ...prevData, avatar: response.data.data }));
          setProfileErrors("");
          setShowModal2(true);
          setLoad2(false);
        })
        .catch(err => {
          setProfileErrors(err.response.data.message);
          setLoad2(false);
        });
    }
  };

  const handleMultipleSelect = (value) => {
    setFormData(() => ({ ...formData, interests: value }));
    // console.log(`Selected: ${value}`);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (value) formData.phone_number = value;
    if (formData.other_interests) {
      if(!formData.interests) formData.interests = userInterests;

      formData.interests.push(formData.other_interests);
      delete formData.other_interests;
    }

    let data = await axios.post('edit-profile/mentee', formData)
      .then(response => {
        localStorage.setItem('user', encode(JSON.stringify(response.data.data)));
        setShowModal(true);
        setFormErrors({});
        setLoad(false);
      })
      .catch(err => {
        setFormErrors(err.response.data.data);
        setLoad(false);
      });
  }

  const dataUpdated = () => {
    setShowModal(false);
    navigate("/user/profile");
  };

  const avatarUpdated = () => {
    localStorage.setItem('user', encode(JSON.stringify(profileData)));
    setShowModal2(false);
    navigate("/user/profile");
  };

  return (
    <>
      <Layout>
        <section className="mantor-detail section_padding two_pices_bg">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="form_layout">
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
                              src={editedImage ?? (SERVER_URL + profileData.avatar)}
                              className="img-fluid ml-0 profile_img"
                              alt={true.toString()}
                            />
                            <label
                              htmlFor={!load2 && "imageUpload"}
                              className="camera-icon"
                            >
                              {load2 ? (
                                <div className='spinner-border text-primary spinner-border-sm' role='status'></div>
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
                            <small className="text-danger">{profileErrors}</small>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Form onSubmit={handleEditProfile}>
                    <Row className="pt-4">
                      <Col lg={10} className="offset-lg-1">
                        <Row className="pt-4 justify-content-center">
                          <Col lg={6} xs={12}>
                            <CustomInput
                              label="First Name"
                              labelClass="mainLabel bold"
                              type="text"
                              id="name"
                              placeholder="Enter First Name"
                              inputClass="mainInput"
                              required
                              value={formData.first_name ?? profileData.first_name}
                              onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                              inputError={formErrors.first_name}
                            />
                          </Col>
                          <Col lg={6} xs={12}>
                            <CustomInput
                              label="Last Name"
                              labelClass="mainLabel bold"
                              type="text"
                              id="OtherInterest "
                              placeholder="Enter Last Name"
                              inputClass="mainInput"
                              required
                              value={formData.last_name ?? profileData.last_name}
                              onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                              inputError={formErrors.last_name}
                            />
                          </Col>

                          <Col lg={6} xs={12}>
                            <label className="mainLabel bold">
                              Phone Number
                              <span className="text-danger">*</span>
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
                              <small className='text-danger ms-2'>{formErrors.phone_number[0]}</small>
                            ) : null}
                          </Col>
                          <Col lg={6} xs={12}>
                            <label htmlFor="" className="mainLabel bold">
                              Area Of Interest
                              {/* <span className="text-danger">*</span> */}
                            </label>
                            <Select
                              mode="multiple"
                              defaultValue={userInterests}
                              onChange={handleMultipleSelect}
                              placeholder="Please select your area of interest"
                              style={{ width: '100%' }}
                              options={interests}
                            />
                            {formErrors.interests ? (
                              <small className='text-danger ms-2'>{formErrors.interests[0]}</small>
                            ) : null}
                          </Col>
                          <Col className="mt-4" xs={12}>
                            <CustomInput
                              label="Other Interest (If Any)"
                              labelClass="mainLabel bold"
                              type="text"
                              id="OtherInterest "
                              placeholder="Enter Other Interest (If Any)"
                              inputClass="mainInput"
                              onChange={e => setFormData({ ...formData, other_interests: e.target.value })}
                            />
                          </Col>
                        </Row>
                        <Row className="pt-3 justify-content-center">
                          <Col xs={12}>
                            <label htmlFor="" className="mainLabel">
                              About Yourself
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={5}
                              className="mainInput"
                              placeholder="Type Here..."
                              value={formData.about_yourself ?? profileData.about_yourself}
                              onChange={e => setFormData({ ...formData, about_yourself: e.target.value })}
                              required
                            ></textarea>
                            {formErrors.about_yourself ? (
                              <div className="mb-3">
                                <small className='text-danger ms-2'>{formErrors.about_yourself[0]}</small>
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="text-center py-5">
                      <Col xs={12}>
                        <SiteButton
                          type="submit"
                          className="site-btn"
                          load={load}
                        >
                          Update
                        </SiteButton>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>

      <CustomModal
        show={showModal2}
        close={avatarUpdated}
        para="Your Avatar Has Been Updated"
        success={true}
        onClickOk={avatarUpdated}
      />

      <CustomModal
        show={showModal}
        close={dataUpdated}
        para="Your Profile Has Been Successfully Updated"
        success={true}
        onClickOk={dataUpdated}
      />
    </>
  );
};

export default EditUserProfile;
