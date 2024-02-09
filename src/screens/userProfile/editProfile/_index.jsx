import "./index.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "@components/Layout/layout";
import BackButton from "@components/backButton";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import usePageTitle from "@hooks/usePageTitle";
import { SERVER_URL } from "@config/data";
import axios from "axios";
import { Select } from 'antd';
import { decode, encode } from "base-64";
import EducationDetail from "@components/mentorDetail/EducationDetail";
import WorkExperience from "@components/mentorDetail/WorkExperience";
import UpdateCertification from "@components/mentorDetail/UpdateCertification";

const EditProfile = () => {
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
  const [value, setValue] = useState();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const educationFields = {
    id: 1,
    institute_name: "",
    degree_title: "",
    education_from: "",
    education_to: ""
  }
  const workExperienceFields = {
    id: 1,
    organization_name: "",
    designation: "",
    work_from: "",
    work_to: ""
  }
  const certificationFields = {
    id: 1,
    institute_name: "",
    certificate_title: "",
    certificate_picture: "",
  }

  const [education, setEducation] = useState([educationFields]);
  const [workExperience, setWorkExperience] = useState([workExperienceFields]);
  const [certification, setCertification] = useState([certificationFields]);

  const refineResponse = (item, index, keyName) => {
    item.id = index + 1;
    item[keyName + "_from"] = item.from.date;
    item[keyName + "_to"] = item.to.date;
    delete item.user_id;
    delete item.from;
    delete item.to;
    return item;
  }

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
        // console.log(res.data);
        setInterests(options);
      })
      .catch(err => console.error(err.response.data));
  }

  const loadProfileData = async () => {
    let data = await axios.get('/profile')
      .then(response => {
        setProfileData(response.data?.data);
        setValue(response.data?.data?.phone_number);

        response.data?.data?.education?.map((item, index) => refineResponse(item, index, "education"));
        response.data?.data?.work_experiences?.map((item, index) => refineResponse(item, index, "work"));
        response.data?.data?.certifications?.map((item, index) => { item.id = index + 1; delete item.user_id });
        setEducation(response.data?.data?.education);
        setWorkExperience(response.data?.data?.work_experiences);
        setCertification(response.data?.data?.certifications);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  }

  useEffect(() => {
    loadInterest();
    // loadProfileData();
  }, []);

  useMemo(() => {
    let user = JSON.parse(decode(localStorage.getItem('user')));
    setProfileData(user);
    setValue(user.phone_number);

    user.education?.map((item, index) => refineResponse(item, index, "education"));
    user.work_experiences?.map((item, index) => refineResponse(item, index, "work"));
    user.certifications?.map((item, index) => { item.id = index + 1; delete item.user_id });
    setEducation(user.education);
    setWorkExperience(user.work_experiences);
    setCertification(user.certifications);

    let interests = user.interests.map(e => e.interests);
    setUserInterests(interests);
  }, [])

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
          console.error(err.response.data);
          setProfileErrors(err.response.data.message);
          setLoad2(false);
        });
    }
  };

  const handleMultipleSelect = (value) => {
    setFormData(() => ({ ...formData, interests: value }));
  };

  const handleDetailFields = (event, itemId, setData) => {
    const { name, value, files } = event.target;
    setData((prevState) => {
      return prevState.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            [name]: files !== null ? files[0] : value
          };
        }
        return item;
      });
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoad(true);

    if(value) formData.phone_number = value;

    if (formData.other_interests) {
      if(!formData.interests) formData.interests = userInterests;

      formData.interests.push(formData.other_interests);
      delete formData.other_interests;
    }

    if(education.length > 0) formData.education = education;
    if(workExperience.length > 0) formData.work_experience = workExperience;
    if(certification.length > 0) formData.certification = certification;


    let data = await axios.post('/edit-profile/mentor', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      localStorage.setItem('user', encode(JSON.stringify(response.data.data)));
      setShowModal(true);
      setFormData({});
      setFormErrors({});
      setEducation([educationFields]);
      setWorkExperience([workExperienceFields]);
      setCertification([certificationFields]);
      setLoad(false);
    })
    .catch(err => {
      setFormErrors(err.response.data.data)
      setLoad(false);
    });
  }

  const avatarUpdated = () => {
    localStorage.setItem('user', encode(JSON.stringify(profileData)));
    setShowModal2(false);
    navigate("/profile");
  };

  const dataUpdated = () => {
    setShowModal(false);
    navigate("/profile");
  };

  const addRow = (setData, data, fields) => {
    setData([...data,
    {
      ...fields,
      id: data.length + 1,
    }
    ]);
  }

  const deleteRow = (setData, data) => {
    const filteredRows = data.filter((row, index) => index !== data.length - 1);
    setData(filteredRows);
  }

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
                              src={
                                editedImage ?? SERVER_URL + profileData.avatar
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
                  <Form onSubmit={handleUpdate}>
                    <Row className="pt-4">
                      <Col lg={10} className="offset-lg-1">
                        <Row>
                          <Col xs={12}>
                            <div className="head">
                              <p className="primary_color fw-bold p-lg m-0">
                                Personal Details
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row className="pt-4 justify-content-center">
                          <Col lg={6} xs={12}>
                            <CustomInput
                              label="First Name"
                              labelClass="mainLabel bold"
                              type="text"
                              id="firstname"
                              placeholder="Enter First Name"
                              inputClass="mainInput"
                              required
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
                              labelClass="mainLabel bold"
                              type="text"
                              id="Lastname"
                              placeholder="Enter Last Name"
                              inputClass="mainInput"
                              required
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
                              <small className="text-danger ms-2">
                                {formErrors.phone_number[0]}
                              </small>
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
                              style={{ width: "100%" }}
                              options={interests}
                            />
                            {formErrors.interests ? (
                              <small className="text-danger ms-2">
                                {formErrors.interests[0]}
                              </small>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xs={12}>
                            <CustomInput
                              label="Other Interest (If Any)"
                              labelClass="mainLabel bold"
                              type="text"
                              id="other_interests"
                              placeholder="Enter Other Interest (If Any)"
                              inputClass="mainInput"
                              value={formData.other_interests}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  other_interests: e.target.value,
                                })
                              }
                            />
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

export default EditProfile;
