import "./index.css";
import { useState, useEffect } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { SERVER_URL, mentorshipStatusFilter } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import CustomTable from "@components/CustomTable";
import LoadingSpinner from '@components/loader';
import axios from "axios";
import {LogsObjectData} from "@config/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const OrdersLogs = () => {
  usePageTitle("Orders Logs");

  const logsHeader  = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "order_No",
      title: "Order No",
    },
    {
      key: "tracking_No.",
      title: "Tracking No",
    },
    {
      key: "user",
      title: "User",
    },
    {
      key: "total_Price",
      title: "Total Price",
    },
    {
      key: "total_Weight",
      title: "Total Weight",
    },
    {
      key: "start_Order",
      title: "Start Order",
    },
    {
      key: "end_Order",
      title: "End Order",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },
  ];


  const [logsData, setLogsData] = useState([]);

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

        // setLogsData(response.data.data.data);
        setLogsData(LogsObjectData);
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
              <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
                  <div className="mainTitle mb-0 mb-5">
                      <h2 className="text-black fw-medium">Order Logs</h2>  
                  </div>
                  <Row>
                    <Col xs={12}>
                      <CustomTable
                        headers={logsHeader}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        filters={filters}
                        setFilters={setFilters}
                        setLoad={setLoad}

                        // filterSort={true}
                        // filterSortValue={filterSortValue}
                        // setFilterSortValue={setFilterSortValue}
                        // filterSortValues={sortingValues}
                        filterSearch={true}
                        // filterSearchValue={filterSearchValue}
                        // setFilterSearchValue={setFilterSearchValue}

                        renderEntries={true}
                        dateFilter2={true}
                        className="dark"
                        // filterFrom={filterFrom}
                        // setFilterFrom={setFilterFrom}
                        // filterTo={filterTo}
                        // setFilterTo={setFilterTo}
                      >
                        <tbody>
                          {load ? (
                            <tr>
                              <td colSpan="100%">
                                <LoadingSpinner />
                              </td>
                            </tr>
                          ) : (
                          logsData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.orderNo}</td>
                              <td>{item.trackingNo}</td>
                              <td>{item.user}</td>
                              <td>{item.totalPrice}</td>
                              <td>{item.totalWeight}</td>
                              <td>{item.startOrder}</td>
                              <td>{item.endOrder}</td>
                              <td>
                                <span
                                  className={`status-tag ${
                                    item.status === "completed"
                                      ? "text-green"
                                      : item.status === "pending"
                                      ? "text-blue"
                                      : item.status === "cancelled"
                                      ? "text-red"
                                      : ""
                                  }`}
                                >
                                  {item.status === "completed"
                                    ? "Completed"
                                    : item.status === "cancelled"
                                    ? "Cancelled"
                                    : item.status === "pending"
                                    ? "Pending"
                                    : ""}
                                </span>
                              </td>
                              <td>
                                <Dropdown>
                                  <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      as={Link}
                                      to={`/admin/orders-logs/details/${item?.id}`}
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                      View
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          )))}
                        </tbody>
                      </CustomTable>
                    </Col>
                  </Row>
              </div>
            </div>
          </Row>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default OrdersLogs;
