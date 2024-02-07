import "./index.css";
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/layout/authLayout';
import usePageTitle from '@hooks/usePageTitle';
import {CustomInput} from '@components/CustomInput';
import SiteButton from '@components/Button/button';
import axios from 'axios';

const AdminForgetPassword = () => {
    usePageTitle("Forget Password");
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const [load, setLoad] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault()
        setLoad(true);

        let data = await axios.post('/forget-password', formData)
        .then(response => {
            setLoad(false);
            navigate('/admin/forget-password2', {
                state: {
                    email: formData.email
                }
            });
        })
        .catch(err => {
            document.getElementById('response').innerHTML = 
            `<div className="alert alert-danger"role="alert"><strong>Opss! </strong>${err.response.data.message}</div>`;
            setLoad(false);
            // console.error(err.response.data)
        });
    }

    return (
        <AuthLayout authTitle='Forgot Password' authPara='Enter email address to receive a verification code.' backOption={true}>
            <div id="response"></div>
            <Form onSubmit={handleClick}>
                <CustomInput label='Email Address' required id='userEmail' type='email' placeholder='Enter Your Email Address' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                    setFormData({ ...formData, email: event.target.value })
                }} />
                <div className="mt-4 text-center">
                    <SiteButton type='submit' className="site-btn" load={load}>Continue</SiteButton>
                </div>
            </Form>
        </AuthLayout>
    )
}



export default AdminForgetPassword
