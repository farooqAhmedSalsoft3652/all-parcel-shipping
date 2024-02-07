import "./index.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { SERVER_URL } from "@config/data";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import CustomTable from "@components/CustomTable";
import BackButton from "@components/backButton";
import axios from "axios";
import LoadingSpinner from "@components/loader";


const AccountRequest = () => {
  usePageTitle("Account Request");
  
  const mentorshipHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "name",
      title: "Mentor Name",
    },
    {
      key: "email",
      title: "email address",
    },
    {
      key: "registration",
      title: "registration date",
    },
    {
      key: "Status",
      title: " Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];
  const sortingValues = [
    {
      value: "all",
      text: "All",
    },
    {
      value: "status",
      text: "Status",
    },
    {
      value: "registered",
      text: "Registered Date",
    },
  ];
  const {
    filterSort,
    filterSortValue,
    setFilterSortValue,
    filterSortValues,
    filterSearch,
    filterSearchValue,
    setFilterSearchValue,
    dateFilter,
    filterFrom,
    setFilterFrom,
    filterTo,
    setFilterTo,
  } = UseTableControls();

  const [mentorAccountRequest, setMentorAccountRequest] = useState([]);
  const [mentorUpdateRequest, setMentorUpdateRequest] = useState([]);

  const [filters1, setFilters1] = useState({});
  const [currentPage1, setCurrentPage1] = useState(1);
  const [totalRecords1, setTotalRecords1] = useState(0);
  const [totalPages1, setTotalPages1] = useState(1);
  const [load1, setLoad1] = useState(true);

  const [filters2, setFilters2] = useState({});
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalRecords2, setTotalRecords2] = useState(0);
  const [totalPages2, setTotalPages2] = useState(1);
  const [load2, setLoad2] = useState(true);

  const loadMentorRequest = async () => {
    setLoad1(true);
    let url = `/mentor-management/request?page=${currentPage1}`;
    if(filters1.from)   url += `&from=${filters1.from}`; 
    if(filters1.to)     url += `&to=${filters1.to}`; 
    if(filters1.search) url += `&search=${filters1.search}`; 
    if(filters1.status) url += `&status=${filters1.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        // console.log(response.data.data);
        setMentorAccountRequest(response.data.data.data);
        setCurrentPage1(response.data.data.meta.current_page);
        setTotalRecords1(total_records);
        setTotalPages1(total_pages);
        setLoad1(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad1(false);
      });
  }

  const loadMentorUpdateRequest = async () => {
    setLoad2(true);
    let url = `/mentor-management/update-request?page=${currentPage2}`;
    if(filters2.from)   url += `&from=${filters2.from}`; 
    if(filters2.to)     url += `&to=${filters2.to}`; 
    if(filters2.search) url += `&search=${filters2.search}`; 
    if(filters2.status) url += `&status=${filters2.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        // console.log(response.data.data);
        setMentorUpdateRequest(response.data.data.data);
        setCurrentPage2(response.data.data.meta.current_page);
        setTotalRecords2(total_records);
        setTotalPages2(total_pages);
        setLoad2(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad2(false);
      });
  }

  useEffect(() => {
    loadMentorRequest();
  }, [currentPage1, filters1]);

  useEffect(() => {
    loadMentorUpdateRequest();
  }, [currentPage2, filters2]);

  function getStatusColorClass(status) {
    switch (status) {
      case 0:
        return "status_active";
      case 2:
        return "status_rejected";
      default:
        return "";
    }
  }

  return (
    <>
      <DashboardLayout>
        <Container fluid>
          <Row className="py-3">
            <div className="dashCard">
              <Col xs={12} md={11} className="m-auto">
                <Row>
                  <Col xs={12}>
                    <div className="my-5">
                      <h3>
                        <BackButton />
                        Mentor Account Request
                      </h3>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Tabs
                      defaultActiveKey="home"
                      id="uncontrolled-tab-example"
                      className="sign-up-tab req-tab mb-3 mb-xl-0"
                    >
                      <Tab eventKey="home" title="Account Request">
                        <CustomTable
                          headers={mentorshipHeader}
                          currentPage={currentPage1}
                          setCurrentPage={setCurrentPage1}
                          totalPages={totalPages1}
                          totalRecords={totalRecords1}
                          filters={filters1}
                          setFilters={setFilters1}
                          setLoad={setLoad1}
                          // filterSort={true}
                          renderEntries={false}
                          // filterSortValue={filterSortValue}
                          // setFilterSortValue={setFilterSortValue}
                          // filterSortValues={sortingValues}
                          filterSearch={true}
                          // filterSearchValue={filterSearchValue}
                          // setFilterSearchValue={setFilterSearchValue}
                          dateFilter={true}
                          // filterFrom={filterFrom}
                          // setFilterFrom={setFilterFrom}
                          // filterTo={filterTo}
                          // setFilterTo={setFilterTo}
                        >
                          <tbody>
                            {load1 ? (
                              <tr>
                                <td colSpan="100%">
                                  <LoadingSpinner />
                                </td>
                              </tr>
                            ) : (
                              mentorAccountRequest.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <img
                                        className="ad_poster_img me-2"
                                        src={SERVER_URL + item.avatar}
                                        alt={true.toString()}
                                      />
                                      <p className="flex-grow-1 align-self-center text-start mb-0">
                                        {item.name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>{item.email}</td>
                                  <td>{item.register_date}</td>
                                  <td
                                    className={`status-cell ${getStatusColorClass(
                                      item.approved
                                    )}`}
                                  >
                                    {item.approved == 0
                                      ? "Pending"
                                      : "Rejected"}
                                  </td>
                                  <td>
                                    <Link
                                      to={`/admin/mentor-management/mentor-profile/${item.id}`}
                                      className="tableAction view text-decoration-underline"
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </CustomTable>
                      </Tab>
                      <Tab eventKey="profile" title="Update Request">
                        <CustomTable
                          headers={mentorshipHeader}
                          currentPage={currentPage2}
                          setCurrentPage={setCurrentPage2}
                          totalPages={totalPages2}
                          totalRecords={totalRecords2}
                          filters={filters2}
                          setFilters={setFilters2}
                          setLoad={setLoad2}
                          // filterSort={true}
                          renderEntries={false}
                          // filterSortValue={filterSortValue}
                          // setFilterSortValue={setFilterSortValue}
                          // filterSortValues={sortingValues}
                          filterSearch={true}
                          // filterSearchValue={filterSearchValue}
                          // setFilterSearchValue={setFilterSearchValue}
                          dateFilter={true}
                          // filterFrom={filterFrom}
                          // setFilterFrom={setFilterFrom}
                          // filterTo={filterTo}
                          // setFilterTo={setFilterTo}
                        >
                          <tbody>
                            {load2 ? (
                              <tr>
                                <td colSpan="100%">
                                  <LoadingSpinner />
                                </td>
                              </tr>
                            ) : (
                              mentorUpdateRequest.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <img
                                        className="ad_poster_img me-2"
                                        src={SERVER_URL + item.avatar}
                                        alt={true.toString()}
                                      />
                                      <p className="flex-grow-1 align-self-center text-start mb-0">
                                        {item.name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>{item.email}</td>
                                  <td>{item.register_date}</td>
                                  <td
                                    className={`status-cell ${getStatusColorClass(
                                      item.update_approved
                                    )}`}
                                  >
                                    {item.update_approved == 0
                                      ? "Pending"
                                      : "Rejected"}
                                  </td>
                                  <td>
                                    <Link
                                      to={`/admin/mentor-management/mentor-profile/${item.id}`}
                                      className="tableAction view text-decoration-underline"
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </CustomTable>
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default AccountRequest;
