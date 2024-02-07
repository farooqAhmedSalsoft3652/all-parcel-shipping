
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLeftLong } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import { AuthImg, logo } from "../../assets/images";

export const AuthLayout = (props) => {
    return (
        <>
            <section className="authBg">
                <div className='container'>
                    <div className="row g-0 authBox">
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className='authImage'>
                                <img src={AuthImg} alt="authImage" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="authFormWrapper">
                                <div className="authForm">
                                    <div className="authLogo">
                                        <img src={logo} alt="authLogo" />
                                    </div>
                                    <div className="authFormHeader">
                                        <h1 className="p-xxl primary_color">{props?.authTitle}</h1>
                                        <p className="authPara d-grey-color">{props?.authPara}</p>
                                    </div>
                                    {props?.children}
                                    {props?.backOption &&
                                        <div className="text-center mt-4">
                                         <Link to={'/admin'} className=' fw-bold text-decoration-none primary_color'> <FontAwesomeIcon  icon={faLeftLong} /> <span className="ms-2 text-dark">Back To  Login </span> </Link> 
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
