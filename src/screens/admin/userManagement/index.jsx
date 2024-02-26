import "./index.css";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import UseTableControls from "@config/useTableControls";
import usePageTitle from "@hooks/usePageTitle";
import CustomTable from "@components/CustomTable";
import CustomModal from "@components/customModal";
import LoadingSpinner from "@components/loader";
import axios from "axios";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {UserObjectData} from "@config/data";

const UserManagement = () => {
  usePageTitle("User Management");

  const {
    filterSort,
    filterSortValue,
    setFilterSortValue,
    filterSortValues,
    filterSearch,
    filterSearchValue,
    setFilterSearchValue,
    dateFilter,
    dateFilter2,
    filterFrom,
    setFilterFrom,
    filterTo,
    setFilterTo,
  } = UseTableControls();
  const userHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "Name",
      title: "Name",
    },
    {
      key: "EmailAddress",
      title: "E-Email Address",
    },
    {
      key: "RegisteredOn",
      title: "Registered On",
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

  const [userData, setUserData] = useState([]);
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
  


  const loadMenteeData = async () => {
    setLoad(true);
    let url = `/mentee-management?page=${currentPage}`;
    if(filters.limit)  url += `&limit=${filters.limit}`; 
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);
        
        setUserData(UserObjectData);
        // setUserData(response.data.data.data);
        console.log(userData)
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
    loadMenteeData();
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

    let data = await axios.post(`/mentee-management/${id}/update`, {
      status: activityStatus
    })
    .then(response => {
      if(activityStatus === 1){
        setShowModal2(true);
      }else{
        setShowModal4(true);
      }
      loadMenteeData();
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
      <section className=" ">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <div className="dashCard py-3">
                <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
                  <div className="mainTitle mb-0 mb-5">
                      <h2 className="text-black fw-medium">User Management</h2>  
                  </div>
                  <Row>
                    <Col xs={12}>
                      <CustomTable
                        headers={userHeader}
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
                          userData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.register_date}</td>
                              <td>
                                <select
                                  className={`filterInput drop-down-action ${
                                    item.status === "active" ? "green-bg" : "red-bg"
                                  }`}
                                  value={item.status}
                                  onChange={(e) => {
                                    handleChange(e);
                                    setId(item.id);
                                  }}
                                >
                                  <option
                                    value="active"
                                    className={`text-success ${
                                      item.status === "active" ? "green-bg" : "red-bg"
                                    }`}
                                  >
                                    Active
                                  </option>
                                  <option                                   
                                    value="inactive"
                                    className={`text-danger ${
                                      item.status === "inactive" ? "red-bg" : "green-bg"
                                    }`}
                                  >
                                    Inactive
                                  </option>
                                </select>
                              </td>
                              <td>
                              <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    as={Link}
                                    to={`/admin/user-management/details/${item?.id}`}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                    View
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>

                                {/* <Link
                                  to={`/admin/mentee-management/details/${item.id}`}
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
    <CustomModal
      show={showModal}
      close={() => setShowModal(false)}
      para="Are You Sure You Want To Active Mentee?"
      success={false}
      action={changeActivityStatus}   
      showYesNoButtons={showYesButton || showNoButton}
    />
    <CustomModal
      show={showModal2}
      close={() => setShowModal2(false)}
      para="This Mentee Has Been Activated Successfully."
      onClickOk={() => setShowModal2(false)}
      success
    />
    <CustomModal
      show={showModal3}
      close={() => setShowModal3(false)}
      para="Are You Sure You Want To Inactive Mentee?"
      success={false}
      action={changeActivityStatus}   
      showYesNoButtons={showYesButton || showNoButton}
    />
    <CustomModal
      show={showModal4}
      close={() => setShowModal4(false)}
      para="This Mentee Has Been Inactivated Successfully."
      onClickOk={() => setShowModal4(false)}
      success
    />
    </>
  );
};

export default UserManagement;
