import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import usePageTitle from "@hooks/usePageTitle";
import { AuthLayout } from "@/layout/authLayout";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import useAuth from "@hooks/useAuth";
import axios from "axios";
import { encode } from 'base-64';

const AdminLogIn = () => {
  usePageTitle("Admin Login");
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const [formData, setFormData] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    let response = await axios.post('/admin/login', formData)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('_token', encode(response.data.data.access_token));
        localStorage.setItem('user', encode(JSON.stringify(response.data.data.user)));

        setTimeout(() => {
          document.getElementById('response').hidden = true;
          setRole(response.data.data.user.role_id);
          setLoad(false);
          navigate('/admin/dashboard');
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.data.access_token}`;
        }, 1000);
      })
      .catch(error => {
        document.getElementById('response').innerHTML = 
        `<div class="alert alert-danger" role="alert"><strong>Oops!</strong> ${error.response.data.message}</div>`;
        setLoad(false);
      });
  };

  return (
    <>
      <AuthLayout authTitle="Admin Login" authPara="Login into your Account">
        <div id="response"></div>
        <Form onSubmit={handleSubmit}>
          <CustomInput
            label="Email Address"
            required
            id="email"
            type="email"
            placeholder="Enter Your Email Address"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <CustomInput
            label="Password"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
            required
            id="password"
            type="password"
            placeholder="Enter Password"
            labelClass="mainLabel"
            inputClass="mainInput"
          />
          <div className="d-flex align-items-baseline justify-content-between mt-1">
            <div className="checkBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="me-1"
              />
              <label htmlFor="rememberMe" className="d-grey-color">
                Remember Me
              </label>
            </div>
            <Link
              to={"/admin/forget-password"}
              className="d-grey-color text-decoration-underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <SiteButton type="submit" className="site-btn" load={load}>
              Login
            </SiteButton>
          </div>
        </Form>
      </AuthLayout>
    </>
  );
};

export default AdminLogIn;
