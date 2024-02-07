import './index.css'
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@components/Layout/layout';
import BackButton from '@components/backButton';
import PakagesCard from '@components/PackagesCard';
import usePageTitle from '@hooks/usePageTitle';
import SiteButton from '@components/Button/button';
import CustomModal from "@components/customModal";
import axios from 'axios';

const FeaturingPackagesLogs = () => {
    usePageTitle("Featuring Logs Packages");
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false)
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [load, setLoad] = useState(false);

    const loadPackages = async () => {
        let data = await axios.get('/featured-packages')
            .then(response => {
                // console.log(response.data.data);
                setPackages(response.data.data);
            })
            .catch(err => console.error(err.response.data));
    }

    useEffect(() => {
        loadPackages();
    }, []);

    const handleSubmit = async () => {
        setLoad(true);

        if(selectedPackage == ''){
            document.getElementById('response').innerHTML = 
            `<div className="alert alert-danger" role="alert">Please select a package first!</div>`;
            setLoad(false);
        }
        else{            
            let response = await axios.post('/featured-subscription', {id: selectedPackage})
            .catch(err => {
                document.getElementById('response').innerHTML = 
                `<div className="alert alert-danger" role="alert">${err.response.data.message}</div>`;
                setLoad(false);
                
                setTimeout(() => {
                    document.getElementById('response').innerHTML = "";
                }, 2000);
            });

            if(response.data.status){
                window.open(response.data.data.url, 'Payment', 'popup=yes,width=450,height=750,left=100,top=100');
                setSelectedPackage('');
                setLoad(false);
                
                setTimeout(() => {
                    navigate('/featuring-logs')
                }, 2000);
            }
            else{
                document.getElementById('response').innerHTML = 
                `<div className="alert alert-danger" role="alert">${response.data.message}</div>`;
                setLoad(false);

                setTimeout(() => {
                    document.getElementById('response').innerHTML = "";
                }, 2000);
            }
        }
    }

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
                            <div id="response"></div>
                            {packages.map(card => (
                                <Col key={card.id} md={6} xl={4}>
                                    <SiteButton
                                        onClick={() => setSelectedPackage(card.id)}
                                        type="button"
                                        className="not_Btn w-100"
                                    >
                                        <PakagesCard 
                                            data={card} 
                                            classSelected={card.id === selectedPackage ? 'selected' : ''} 
                                        />
                                    </SiteButton>
                                </Col>
                            ))}
                        </Row>
                        <Row className="text-center mt-5">
                            <Col xl={12}>
                                <SiteButton onClick={handleSubmit} className="site-btn text-decoration-none" load={load}>
                                    Subscribe Now
                                </SiteButton>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>

        <CustomModal
            show={showModal}
            close={() => setShowModal(false)}
            para="Payment Successfull!"
            onClickOk={() => navigate("/featuring-logs")}
            success
        />
    </Layout>
  )
}

export default FeaturingPackagesLogs;