
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import { AuthImg, adminAuthImages,  logo } from "../../assets/images";
import "./index.css";

export const AuthLayout = (props) => {
    return (
        <>
            <section className="authBg">
                <Container fluid className="vh-100 px-0">
                    <Row className="g-0 admin authBox vh-100">
                        <Col lg={6}>
                            <div className="authFormWrapper">
                                <div className="authForm">
                                    <div className="authLogo">
                                        <img src={logo} alt="authLogo" />
                                    </div>
                                    <div className="authFormHeader">
                                        <h1 className="p-xxl text-black mb-4">{props?.authTitle}</h1>
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
                        </Col>
                        <Col lg={6} className="authImage d-none d-lg-block position-relative">
                            <img src={AuthImg} alt="authImage" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
