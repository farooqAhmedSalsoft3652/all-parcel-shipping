import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";
import {CustomInput} from '@components/CustomInput';
import { AuthLayout } from '@components/Layout/authLayout';
import SiteButton from '@components/Button/button';
import usePageTitle from '@hooks/usePageTitle';
import { Form } from 'react-bootstrap';
import axios from 'axios';


const ForgetPassword = () => {
    usePageTitle("Forget Password");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [load, setLoad] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault()
        setLoad(true);
        navigate('/forget-password2');

        // let data = await axios.post('/forget-password', formData)
        //     .then(response => {
        //         setLoad(false);
        //         navigate('/forget-password2', {
        //             state: {
        //                 email: formData.email
        //             }
        //         });
        //     })
        //     .catch(err => {
        //         document.getElementById('response').innerHTML = 
        //         `<div className="alert alert-danger"role="alert"><strong>Opss! </strong>${err.response.data.message}</div>`;
        //         setLoad(false);
        //         // console.error(err.response.data)
        //     });
    }

    return (
        <AuthLayout authTitle='Forgot Password' authPara='Enter your email address to receive a verification code' backOption={true}>
            <div id="response"></div>
            <Form onSubmit={handleClick}>
                <CustomInput label='Email Address' required id='userEmail' type='email' placeholder='Enter Your Email Address' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                    setFormData({ ...formData, email: event.target.value })
                }} />
                <div className="mt-5 text-center">
                    <SiteButton type='submit' className="site-btn w-100" load={load}>Continue</SiteButton>
                </div>
            </Form>
        </AuthLayout>
    )
}



export default ForgetPassword
