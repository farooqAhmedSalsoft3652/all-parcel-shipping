import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import usePageTitle from "@hooks/usePageTitle";
import { DashboardLayout } from "@/layout/dashboardLayout";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import CustomTable from "@components/CustomTable";
import CustomModal from "@components/customModal";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MentorShipFee = () => {
  usePageTitle("Mentorship Fees");
  const [feeData, setFeeData] = useState([]);
  const [fees, setFees] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);

  const loadFeeData = async () => {
    setLoad(true);
    let data = await axios.get(`/mentorship-fees?page=${currentPage}`)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        setFeeData(response.data.data.data);
        setCurrentPage(response.data.data.meta.current_page);
        setTotalRecords(total_records);
        setTotalPages(total_pages);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }
  
  useEffect(() => {
    loadFeeData()
  }, [currentPage]);
    
  const handleClick = async () => {
    if (fees !== "") {
      setLoad2(true);
      let data = await axios.post('/mentorship-fees/update', { fees })
        .then(response => {
          setShowModal(true);
          setFees("");
          loadFeeData();
          setLoad2(false);
        })
        .catch(err => {
          console.error(err.esponse.data.message);
          setLoad2(false);
        });
    }
  };
  
  const feeHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "Fees",
      title: "Fees",
    },
    {
      key: "UpdateOn",
      title: "Update On",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <section>
          <Container fluid>
            <div className="dashCard m-h py-3">
              <Row className="py-5 ps-5 ">
                <Col xs={12} md={6} xl={5}>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <h3 className="text-capitalize">
                          Mentorship Fees
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="pt-5 pb-3">
                    <Col xs={12}>
                      <CustomInput
                        label="Fees"
                        labelClass="mainLabel bold"
                        type="number"
                        id="name"
                        placeholder="Enter Fees"
                        inputClass="mainInput"
                        required
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <SiteButton
                        onClick={handleClick}
                        className="site-btn"
                        load={load2}
                      >
                        Update Charges
                      </SiteButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="dashCard m-h my-4 ">
              <Row className="py-5 ps-5 ">
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <h3 className="text-capitalize">Fees Logs</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="pt-5 pb-3">
                    <Col xs={12}>
                      <CustomTable
                        headers={feeHeader}  
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        setLoad={setLoad}

                        renderEntries={false}
                        required={false}
                        renderSearchWrapper={false}
                      >
                        <tbody>
                          {load ? (
                            <tr>
                              <td colSpan="100%">
                                <LoadingSpinner />
                              </td>
                            </tr>
                          ) : (
                          feeData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>${item.fees}</td>
                              <td>{item.updated_at}</td>
                            </tr>
                          )))}
                        </tbody>
                      </CustomTable>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        onClickOk={() => setShowModal(false)}
        success
        para="Mentorship Fees has been updated successfully"
      />
    </>
  );
};

export default MentorShipFee;
