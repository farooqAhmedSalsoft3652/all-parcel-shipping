import "./index.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AuthLayout } from "@/layout/authLayout";
import usePageTitle from "@hooks/usePageTitle";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import { codeValidate } from "@components/validations";
import { useFormik } from "formik";
import axios from "axios";

const AdminForgetPassword2 = () => {
  usePageTitle("Forget Password");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({code: "", email: state?.email});
  const [load, setLoad] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // useEffect(() => {
  //   if(!state?.email && state?.email == null){
  //     navigate('/login');
  //   }
  //   else setFormData({...formData, email: state?.email});
  // }, []);

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: formData,
    validationSchema: codeValidate,
    onSubmit: (values) => handleClick(values)
  });

  const handleClick = async (data) => {
    setLoad(true);
    navigate('/admin/forget-password3');

    // let response = await axios.post('/verify-code', data)
    //   .then(() => {
    //     setLoad(false);
    //     navigate("/admin/forget-password3", {
    //       state: {
    //         email: state.email,
    //         code: data.code
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     document.getElementById('response').innerHTML = 
    //     `<div className="alert alert-danger" role="alert"><strong>Opss!</strong> ${err.response.data.message}</div>`;
    //     setLoad(false);
    //   });
  };

  const resendCode = async (e) => {
    e.preventDefault()
    // setRemainingTime(59);

    // let data = await axios.post('/forget-password', { email: state.email })
    // .then(() => {
    //     console.log("Code has been sent");
    // })
    // .catch(err => {
    //     document.getElementById('response').innerHTML = 
    //     `<div className="alert alert-danger"role="alert"><strong>Opss! </strong>${err.response.data.message}</div>`;
    //     // console.error(err.response.data)
    // });
  };

  useEffect(() => {
    if (remainingTime) {
      const intervalId = setInterval(() => {
        const timeLeft = remainingTime - 1;
        setRemainingTime(timeLeft);

        if (timeLeft === 0) clearInterval(intervalId);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  return (
    <>
      <AuthLayout
        authTitle="Verification Code"
        authPara="Enter verification code to recover your password."
        backOption={true}
      >
        <div id="response"></div>
        <Form onSubmit={handleSubmit}>
          <CustomInput
            label="Verification Code"
            labelClass="mainLabel"
            type="number"
            id="code"
            placeholder="Verification Code"
            inputClass="mainInput"
            required
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.code}
            touched={touched.code}
          />
          <div className="d-flex mt-1 justify-content-between align-items-center">
            <p className="redColor m-0">
              {remainingTime > 0 && (<>Resending in {remainingTime} seconds</>)}
            </p>
            
            {remainingTime === 0 && (
              <SiteButton
                type="button"
                className="resend-btn primary_color"
                // onClick={resendCode}
              >
                Resend Code
              </SiteButton>
            )}
          </div>
          <div className="mt-5 text-center">
            <SiteButton
              type="submit"
              className="site-btn w-100"
              load={load}
            >
              Continue
            </SiteButton>
          </div>
        </Form>
      </AuthLayout>
    </>
  );
};

export default AdminForgetPassword2;
