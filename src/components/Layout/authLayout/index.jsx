
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLeftLong } from "@fortawesome/free-solid-svg-icons";
import {SiteHeader} from "../header"
import { AuthImg, logo } from "../../../assets/images";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

export const AuthLayout = (props) => {
    return (
        <>
           <SiteHeader />
            <section className="align-bottom page-content bg-white position-relative">
                <Container>
                    <Row className="g-0 authBox">
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
                                         <Link to={'/login'} className=' fw-bold text-decoration-none primary_color'> <FontAwesomeIcon  icon={faLeftLong} /> <span className="ms-2 text-dark">Back To  Login </span> </Link> 
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
