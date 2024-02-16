import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./style.css";
import { Row, Col, Form } from "react-bootstrap";
import { AuthLayout } from '@components/Layout/authLayout';
import {CustomInput} from '@components/CustomInput';
import CustomModal from '@components/customModal';
import SiteButton from '@components/Button/button';
import usePageTitle from '@hooks/usePageTitle';
import axios from 'axios';
import { useFormik } from 'formik';
import { passwordValidate } from '@components/validations';

const ForgetPassword3 = () => {
    usePageTitle("Forget Password");
    const navigate = useNavigate();
    const { state } = useLocation();
    const [showModal, setShowModal] = useState(false);
    // const [formData, setFormData] = useState({
    //     email: state?.email, 
    //     password: "", 
    //     confirm_password: ""
    // });
    // const [load, setLoad] = useState(false);

    // useEffect(() => {
    //     if(!state?.email || !state?.code){
    //         navigate('/login');
    //     }
    //     else setFormData({...formData, email: state.email});
    // }, []);

    // const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    //     initialValues: formData,
    //     validationSchema: passwordValidate,
    //     onSubmit: (values) => handleClick(values)
    // });

    // const handleClick = async (data) => {
    //     setLoad(true);

    //     let response = await axios.post('/reset-password', data)
    //     .then(() => {
    //         setLoad(false);
    //         setShowModal(true);
    //     })
    //     .catch(err => {
    //         document.getElementById("response").innerHTML = 
    //         `<div className="alert alert-danger" role="alert">${err.response.data.message}</div>`;
            
    //         setLoad(false);
    //         setTimeout(() => {
    //             document.getElementById("response").innerHTML = "";
    //         }, 2000);
    //     });
    // }

    const passwordUpdate = () => {
        setShowModal(false);
        navigate('/login');
    }

    // const handleClick = () => {
    //     e.preventDefault();
    //     console.log("test");
    //     setShowModal(true);
    // }

    // const handleSubmit = () => {
    //     e.preventDefault();
    //     setShowModal(true);
    // }

    const pasShowModal1 = () => {
        console.log("test")
        // preventDefault();
        setShowModal(true);
    }

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Set New Password for Your Account' backOption={true}>
                <div id="response"></div>
                <Form>
                    <Row className="pt-4">
                        <Col xs={12} className="mb-4">
                            <CustomInput 
                                label='New Password' 
                                labelClass='mainLabel' 
                                type='password' 
                                id='password' 
                                placeholder='Enter New Password' 
                                inputClass='mainInput' 
                                required
                                // value={values.password}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // errors={errors.password}
                                // touched={touched.password}
                            />
                        </Col>
                        <Col xs={12} className="mb-4">
                            <CustomInput 
                                label='Confirm Password' 
                                labelClass='mainLabel' 
                                type='password' 
                                id='confirm_password' 
                                placeholder='Confirm New Password' 
                                inputClass='mainInput' 
                                required 
                                // value={values.confirm_password}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // errors={errors.confirm_password}
                                // touched={touched.confirm_password}
                            />
                        </Col>
                    </Row>
                    <div className="mt-4 text-center">
                        <SiteButton type='button' onClick={pasShowModal1} className="site-btn w-100">Update</SiteButton>
                    </div>
                </Form>
            </AuthLayout>

            <CustomModal show={showModal} close={passwordUpdate} onClickOk={passwordUpdate} buttonText="Please Login To Continue" btntext="continue" heading="System Message" success para='Password updated successfully' />
        </>
    )
}

export default ForgetPassword3;





