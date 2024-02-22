import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DashboardLayout } from "@/layout/dashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "@components/CustomTable";
import CustomModal from "@components/customModal";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import axios from "axios";
import LoadingSpinner from "@components/loader";
import {queryObjectData} from "@config/data";


const QueryManagement = () => {
  usePageTitle("Interest Management");
  const navigate = useNavigate();

  const querytHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "Name",
      title: "Name",
    },
    {
      key: "Email",
      title: "Emaile",
    },
    {
      key: "User_Type",
      title: "User Type",
    },
    {
      key: "Subject",
      title: "Subject",
    },
    {
      key: "Date",
      title: "Date",
    },
    {
      key: "action",
      title: "Action",
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

  const [queryData, setQueryData] = useState([]);
  const [activityStatus, setActivityStatus] = useState("");
  const [id, setId] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showYesButton, setShowYesButton] = useState(true);
  const [showNoButton, setShowNoButton] = useState(true);

  const loadInterests = async () => {
    setLoad(true);
    let url = `/interest-management?page=${currentPage}`;
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        // setInterests(response.data.data.data);
         setQueryData(queryObjectData);
        setCurrentPage(response.data.data.meta.current_page);
        setTotalRecords(total_records);
        setTotalPages(total_pages);
        setLoad(false);;
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    loadInterests();
  }, [currentPage, filters]);

  const handleChange = (e) => {
    if(e.target.value === "active"){
      setShowModal(true);
      setActivityStatus(1);
    } else {
      setShowModal3(true);
      setActivityStatus(0);
    }
  };

  const changeActivityStatus = async () => {
    setShowModal(false);
    setShowModal3(false);

    let data = await axios.post(`/interest-management/${id}/update`, {
      status: activityStatus
    })
    .then(response => {
      if(activityStatus === 1){
        setShowModal2(true);
      }else{
        setShowModal4(true);
      }
      loadInterests();
      setId("");
      setActivityStatus("");
    })
    .catch(err => {
      console.error(err.response.data.message);
    });
  }


  return (
    <>
      <DashboardLayout>
        <section>
          <Container fluid>
            <Row>
            <Col xs={12}>
              <div className="dashCard py-3">
                <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
                  <div className="mainTitle mb-0 mb-5">
                      <h2 className="text-black fw-medium">Query Management</h2>  
                  </div>
                  <Row>
                    <Col xs={12}>
                      <CustomTable
                        headers={querytHeader}
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
                        // shouldDisplaySpan={true}
                        // numberOfRequest={mentorRequest}
                        // requestButtonClasses= "h-short"
                        // filterSortValues={sortingValues}
                        // filterSearch={true}
                        // filterSearchValue={filterSearchValue}
                        // setFilterSearchValue={setFilterSearchValue}  

                        renderEntries={true}
                        dateFilter={true}
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
                            queryData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.userType}</td>
                              <td className="text-truncate">{item.subject}</td>
                              <td>{item.date}</td>
                              <td>
                                <Dropdown>
                                  <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      as={Link}
                                      to={`/admin/query-management/details/${item?.id}`}
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                      View
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>

                                {/* <Link
                                  to={`/admin/mentor-management/details/${item.id}`}
                                  className="tableAction fw-bold view text-decoration-underline"
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </Link> */}
                              </td>
                            </tr>
                          )))}
                        </tbody>
                      </CustomTable>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            </Row>
          </Container>
        </section>
      </DashboardLayout>
    </>
  );
};

export default QueryManagement;
