import "./index.css";
import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Col, Container, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { SERVER_URL, mentorshipStatusFilter } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import CustomTable from "@components/CustomTable";
import LoadingSpinner from '@components/loader';
import axios from "axios";

const PaymentLogs = () => {
  usePageTitle("Payment Logs");

  const AdSubsHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "AdTitle",
      title: "Ad Title",
    },
    {
      key: "MENTORNAME",
      title: "MENTOR NAME",
    },
    {
      key: "SubscriptionDate",
      title: "Subscription Date",
    },
    {
      key: "RequestsReceived",
      title: "Requests Received",
    },
    {
      key: "RemainingRequests",
      title: "Remaining Requests",
    },
    {
      key: "Status",
      title: "Status",
    },
    // {
    //   key: "action",
    //   title: "Action",
    // },
  ];
  const FeaturingHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "featureAdTitle",
      title: "feature Ad Title",
    },
    {
      key: "MENTORNAME",
      title: "MENTOR NAME",
    },
    {
      key: "SubscriptionDate",
      title: "Subscription Date",
    },
    {
      key: "RequestsReceived",
      title: "Requests Received",
    },
    {
      key: "RemainingRequests",
      title: "Remaining Requests",
    },
    {
      key: "Status",
      title: "Status",
    },
    // {
    //   key: "action",
    //   title: "Action",
    // },
  ];
  const MentorshipReqHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "requestID",
      title: "request ID",
    },
    {
      key: "MENTORNAME",
      title: "MENTOR NAME",
    },
    {
      key: "menteename",
      title: "mentee name",
    },
    {
      key: "requestdate",
      title: "request date",
    },
    {
      key: "amount",
      title: "amount",
    },
    {
      key: "Status",
      title: "Status",
    },
    // {
    //   key: "action",
    //   title: "Action",
    // },
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

  const [adsPaymentLogs, setAdsPaymentLogs] = useState([]);
  const [featuredPaymentLogs, setFeaturedPaymentLogs] = useState([]);
  const [mentorshipPaymentLogs, setMentorshipPaymentLogs] = useState([]);

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const [filters2, setFilters2] = useState({});
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalRecords2, setTotalRecords2] = useState(0);
  const [totalPages2, setTotalPages2] = useState(1);
  const [load2, setLoad2] = useState(true);

  const [filters3, setFilters3] = useState({});
  const [currentPage3, setCurrentPage3] = useState(1);
  const [totalRecords3, setTotalRecords3] = useState(0);
  const [totalPages3, setTotalPages3] = useState(1);
  const [load3, setLoad3] = useState(true);

  const loadAdsPaymentLogs = async () => {
    setLoad(true);
    let url = `/payment-logs/ad-subscription?page=${currentPage}`;
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search_user=${filters.search}`; 
    if(filters.status) url += `&status2=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        setAdsPaymentLogs(response.data.data.data);
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

  const loadFeaturedPaymentLogs = async () => {
    setLoad2(true);
    let url = `/payment-logs/featured-subscription?page=${currentPage2}`;
    if(filters2.from)   url += `&from=${filters2.from}`; 
    if(filters2.to)     url += `&to=${filters2.to}`; 
    if(filters2.search) url += `&search_user=${filters2.search}`; 
    if(filters2.status) url += `&status2=${filters2.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        setFeaturedPaymentLogs(response.data.data.data);
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

  const loadMentorshipPaymentLogs = async () => {
    setLoad3(true);
    let url = `/payment-logs/mentorship-fee?page=${currentPage3}`;
    if(filters3.from)   url += `&from=${filters3.from}`; 
    if(filters3.to)     url += `&to=${filters3.to}`; 
    if(filters3.search) url += `&search_users=${filters3.search}`; 
    if(filters3.status) url += `&status2=${filters3.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        setMentorshipPaymentLogs(response.data.data.data);
        setCurrentPage3(response.data.data.meta.current_page);
        setTotalRecords3(total_records);
        setTotalPages3(total_pages);
        setLoad3(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad3(false);
      });
  }

  useEffect(() => {
    loadAdsPaymentLogs();
  }, [currentPage, filters]);

  useEffect(() => {
    loadFeaturedPaymentLogs();
  }, [currentPage2, filters2]);

  useEffect(() => {
    loadMentorshipPaymentLogs();
  }, [currentPage3, filters3]);

  function getStatusColorClass(status) {
    switch (status) {
      case 1:
      case "accepted":
      case "contacted":
      case "request accepted":
        return "status_active";
      case "requested":
      case "pending":
        return "status-yellow";
      case 0:
      case "rejected":
      case "request rejected":
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
                      <h3>Payment Logs</h3>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Tabs
                      defaultActiveKey="AdSubscription"
                      id="uncontrolled-tab-example"
                      className="sign-up-tab req-tab m-w-tab mb-3"
                    >
                      <Tab eventKey="AdSubscription" title="Ad Subscription">
                        <CustomTable
                          headers={AdSubsHeader}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          totalPages={totalPages}
                          totalRecords={totalRecords}
                          filters={filters}
                          setFilters={setFilters}
                          setLoad={setLoad}
                          filterSearch={true}
                          renderEntries={false}
                          dateFilter={true}
                        >
                          <tbody>
                            {load ? (
                              <tr>
                                <td colSpan="100%">
                                  <LoadingSpinner />
                                </td>
                              </tr>
                            ) : (
                              adsPaymentLogs.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.package_title}</td>
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <img
                                        className="ad_poster_img me-2"
                                        src={SERVER_URL + item.mentor_avatar}
                                        alt={true.toString()}
                                      />
                                      <p className="flex-grow-1 align-self-center text-start mb-0">
                                        {item.mentor_name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>{item.date}</td>
                                  <td>{item.request_recieved}</td>
                                  <td>{item.remaining_request}</td>
                                  <td
                                    className={`${getStatusColorClass(
                                      item.status
                                    )}`}
                                  >
                                    {item.status == 1 ? "active" : "inactive"}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </CustomTable>
                      </Tab>
                      <Tab
                        eventKey="FeaturingSubscription"
                        title="Featuring Subscription"
                      >
                        <CustomTable
                          headers={FeaturingHeader}
                          currentPage={currentPage2}
                          setCurrentPage={setCurrentPage2}
                          totalPages={totalPages2}
                          totalRecords={totalRecords2}
                          filters={filters2}
                          setFilters={setFilters2}
                          setLoad={setLoad2}
                          filterSearch={true}
                          renderEntries={false}
                          dateFilter={true}
                        >
                          <tbody>
                            {load2 ? (
                              <tr>
                                <td colSpan="100%">
                                  <LoadingSpinner />
                                </td>
                              </tr>
                            ) : (
                              featuredPaymentLogs.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.package_title}</td>
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <img
                                        className="ad_poster_img me-2"
                                        src={SERVER_URL + item.mentor_avatar}
                                        alt={true.toString()}
                                      />
                                      <p className="flex-grow-1 align-self-center text-start mb-0">
                                        {item.mentor_name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>{item.date}</td>
                                  <td>{item.request_recieved}</td>
                                  <td>{item.remaining_request}</td>
                                  <td
                                    className={`${getStatusColorClass(
                                      item.status
                                    )}`}
                                  >
                                    {item.status == 1 ? "active" : "inactive"}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </CustomTable>
                      </Tab>
                      <Tab
                        eventKey="Mentorshiprequests"
                        title="Mentorship requests"
                      >
                        <CustomTable
                          headers={MentorshipReqHeader}
                          currentPage={currentPage3}
                          setCurrentPage={setCurrentPage3}
                          totalPages={totalPages3}
                          totalRecords={totalRecords3}
                          filters={filters3}
                          setFilters={setFilters3}
                          setLoad={setLoad3}
                          statusFilter={mentorshipStatusFilter}
                          filterSearch={true}
                          renderEntries={false}
                          dateFilter={true}
                        >
                          <tbody>
                            {load3 ? (
                              <tr>
                                <td colSpan="100%">
                                  <LoadingSpinner />
                                </td>
                              </tr>
                            ) : (
                              mentorshipPaymentLogs.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>#{item.request_id}</td>
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <img
                                        className="ad_poster_img me-2"
                                        src={SERVER_URL + item.mentor_avatar}
                                        alt={true.toString()}
                                      />
                                      <p className="flex-grow-1 align-self-center text-start mb-0">
                                        {item.mentor_name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <img
                                        className="ad_poster_img me-2"
                                        src={SERVER_URL + item.mentee_avatar}
                                        alt={true.toString()}
                                      />
                                      <p className="flex-grow-1 align-self-center text-start mb-0">
                                        {item.mentee_name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>{item.date}</td>
                                  <td>${item.amount}</td>
                                  <td
                                    className={`${getStatusColorClass(
                                      item.status
                                    )}`}
                                  >
                                    {item.status}
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

export default PaymentLogs;
