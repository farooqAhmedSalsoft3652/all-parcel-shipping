import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout/layout"
import usePageTitle from "@hooks/usePageTitle";
import CustomTable from "@components/CustomTable";
import UseTableControls from "@config/useTableControls";
import LoadingSpinner from "@components/loader";
import { Dropdown } from "react-bootstrap";
import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { orderLogsData } from "@config/data";

const OrderLogs = () => {
  usePageTitle("Order Logs");
  const [orderData, setOrderData] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const {
    filterSort, filterSortValue, setFilterSortValue, filterSortValues, filterSearch, filterSearchValue, setFilterSearchValue, dateFilter, dateEndFilter, filterFrom, setFilterFrom, filterTo, setFilterTo
  } = UseTableControls();
  
  const orderLogsHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "OrderNo",
      title: "Order No",
    },
    {
      key: "TrackingNo",
      title: "Tracking No",
    },
    {
      key: "TotalPrice",
      title: "Total Price",
    },
    {
      key: "TotalWeight",
      title: "Total Weight",
    },
    {
      key: "StartOrder",
      title: "Start Order",
    },
    {
      key: "EndOrder",
      title: "End Order",
    },
    {
      key: "Status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },
  ];
    
  const sortingValues = [
    {
      value: 'all',
      text: 'All'
    },
    {
      value: 'status',
      text: 'Status'
    },
    {
      value: 'registered',
      text: 'Registered Date'
    },
  ];

  const loadAdsLogs = async () => {
    setLoad(true);
    let url = `/ad-logs?page=${currentPage}`;
    if(filters.limit)  url += `&limit=${filters.limit}`; 
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        // console.log(response.data.data);
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

         //setOrderData(response.data.data.data); // API Data
        setOrderData(orderLogsData); // Static Data
        setCurrentPage(response.data.data.meta.current_page);
        setTotalRecords(total_records);
        setTotalPages(total_pages);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data);
        setLoad(false);
      });
  }


  useEffect(() => {
    loadAdsLogs();
  }, [currentPage, filters]);

  useEffect(()=>{
    setOrderData(orderLogsData);
  },[orderLogsData])
  
  console.log("ata", orderData);

  return (
    <Layout>
      <section className="align-bottom page-content bg-white">
        <Container>
          <Row>
            <Col xs={12} className="title text-center">
              <h2 className="text-primary mb-2 fw-medium">Order Logs</h2>
              <Link
                to={"/tracking"}
                className="site-btn text-decoration-none text-center mt-2 width-220"
              >
                Track Order
              </Link>
            </Col>
            <Col xs={12} className="mt-4">
              <CustomTable
                headers={orderLogsHeader}
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

                // filterSearch={true}
                // filterSearchValue={filterSearchValue}
                // setFilterSearchValue={setFilterSearchValue}

                dateFilter={true}
                dateEndFilter={true}
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
                    orderData.map((item, index) => (
                      <tr key={index}>
                        <td>{(index + 1).toString().padStart(2, "0")}</td>
                        <td>{item.orderNo}</td>
                        <td>{item.trackingNo}</td>
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
                          <Dropdown align="start">
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                as={Link}
                                to={`/order-logs/details/${item?.id}`}
                              >
                                <FontAwesomeIcon icon={faEye} />
                                View
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </CustomTable>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export default OrderLogs;