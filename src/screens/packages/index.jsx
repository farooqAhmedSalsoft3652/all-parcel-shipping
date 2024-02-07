import { Col, Container, Row } from "react-bootstrap"
import PakagesCard from "@components/PackagesCard"
import {packagesData} from "@config/data"
import './index.css'
import { Layout } from "@components/Layout/layout"
import BackButton from "@components/backButton"
import { Link } from "react-router-dom"
import usePageTitle from "@hooks/usePageTitle"


const PackagesLogs = () => {

    usePageTitle("Packages");


  return (
    <Layout>
     <div className="packeges_section section_padding position-relative two_pices_bg">
       <Container>
       <div className="packges-layout">
         <Row>
            <Col xs={12}>
            <Row className="my-3">
            <Col md={12} >
                <h3>
                <BackButton />
                      Packages
                </h3>
            </Col>
            </Row>
            <Row className="ps-4">
                {
                    packagesData.map((card)=>(
                        <Col key={card.id} md={6} xl={4}> 
                           <PakagesCard data={card}/>
                        </Col>
                    ))
                }
            </Row>
            <Row className="text-center mt-5">
                <Col xl={12}>
                    <Link to="/payments" className="site-btn text-decoration-none">
                        Subscribe Now
                    </Link>
                </Col>
            </Row>
            </Col>
         </Row>
       </div>
        </Container>
    </div>
    </Layout>
    
  )
}

export default PackagesLogs