import "./index.css";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/layout/authLayout';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import usePageTitle from '@hooks/usePageTitle';
import SiteButton from '@components/Button/button';
import {CustomInput} from '@components/CustomInput';
import CustomModal from '@components/customModal';
import { passwordValidate } from '@components/validations';
import axios from 'axios';

const AdminForgetPassword3 = () => {
    usePageTitle("Forget Password");
    const navigate = useNavigate()
    const { state } = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        email: state?.email, 
        password: "", 
        confirm_password: ""
    });
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(!state?.email || !state?.code){
            navigate('/login');
        }
        else setFormData({...formData, email: state.email});
    }, []);

    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: formData,
        validationSchema: passwordValidate,
        onSubmit: (values) => handleClick(values)
    });

    const handleClick = async (data) => {
        setLoad(true);

        let response = await axios.post('/reset-password', data)
        .then(() => {
            setLoad(false);
            setShowModal(true);
        })
        .catch(err => {
            document.getElementById("response").innerHTML = 
            `<div className="alert alert-danger" role="alert">${err.response.data.message}</div>`;
            
            setLoad(false);
            setTimeout(() => {
                document.getElementById("response").innerHTML = "";
            }, 2000);
        });
    }

    const passwordUpdate = () => {
        setShowModal(false);
        navigate('/admin/login');
    }

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Enter a new password.' backOption={true}>
                <div id="response"></div>
                <Form onSubmit={handleSubmit}>
                    <CustomInput 
                        label='New Password' 
                        labelClass='mainLabel' 
                        type='password' 
                        id='password' 
                        placeholder='Enter New Password' 
                        inputClass='mainInput' 
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.password}
                        touched={touched.password}
                    />

                    <CustomInput 
                        label='Confirm Password' 
                        labelClass='mainLabel' 
                        type='password' 
                        id='confirm_password' 
                        placeholder='Enter Confirm Password' 
                        inputClass='mainInput' 
                        required 
                        value={values.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.confirm_password}
                        touched={touched.confirm_password}
                    />

                    <div className="mt-4 text-center">
                        <SiteButton type='submit' className="site-btn" load={load}>Update</SiteButton>
                    </div>
                </Form>
            </AuthLayout>

            <CustomModal show={showModal} close={passwordUpdate} onClickOk={passwordUpdate} btntext="continue" success para='Password Successfully Updated' />
        </>
    )
}



export default AdminForgetPassword3




