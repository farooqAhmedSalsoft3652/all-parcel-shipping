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

import {userAvatar} from "../../../../assets/images";

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
    //navigate("/admin/my-profile");
  };

  return (
    <>
      <DashboardLayout>
        <section className="edit-profile">
          <Container fluid>
            <div className="dashCard">
              <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
                <div class="mainTitle mb-0 mb-5">
                  <div className="d-flex align-items-center gap-2 ">
                    <BackButton />
                    <h2 class="text-black fw-medium">Edit Profile</h2>  
                  </div>
                </div>
                <Row>
                  <Col md={5} xs={12} className="detail-block pt-3">
                    <Row>
                      <Col xs={12}>
                        <div className="sec_title d-block">
                          <div className="mb-2">
                            <div className="attached position-relative profile_img_wraper">
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

                      <Form onSubmit={handleSubmit}>
                        <Col xs={12} className="my-sm-4">
                          <CustomInput
                            label="Name"
                            required
                            id="first_name"
                            type="text"
                            placeholder="Enter First Name"
                            labelClass="mainLabel bold ms-0"
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
                        <Col xs={12} className="my-sm-5">
                          <div className="inputWrapper">
                            <label for="first_name" class="mainLabel bold d-block ms-0 mb-0">Email:</label>
                            <p className="fw-regular">{profileData.email}</p>
                          </div>

                        </Col>
                        <Col xs={12} className="my-5">
                          <SiteButton
                            className="site-btn me-2"
                            type="submit"
                            load={load}
                            >Update</SiteButton>
                          <SiteButton type="submit" className="site-btn site_border_btn ms-2">Cancel</SiteButton>
                        </Col>
                      </Form>
                    </Row>
                  </Col>
                </Row>
                
              </div>
              
            </div>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={dataUpdated}
        heading="System Message"
        para="Profile Updated Successfully!"
        success={true}
        onClickOk={dataUpdated}
      />

      <CustomModal
        show={showModal2}
        close={avatarUpdated}
        heading="System Message"
        para="Profile avatar updated successfully!"
        success={true}
        onClickOk={avatarUpdated}
      />
    </>
  );
};

export default EditAdminProfile;
