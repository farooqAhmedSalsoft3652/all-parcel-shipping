import "./index.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import CustomTable from "@components/CustomTable";
import CustomModal from "@components/customModal";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const FeaturingSubscription = () => {
  usePageTitle("Featuring Subscription");
  const navigate = useNavigate();

  const AddSubscriptionHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "PackageTitle",
      title: "Package Title",
    },
    {
      key: "Amount",
      title: "Amount",
    },
    {
      key: "NoofRequests",
      title: "No. of Requests",
    },
    {
      key: "ModificationDate",
      title: "Modification Date",
    },

    {
      key: "action",
      title: "Action",
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

  const [adsData, setAdsData] = useState([]);
  const [id, setId] = useState("");
  const [active, setActive] = useState("");
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

  const loadAds = async () => {
    setLoad(true);
    let url = `/featured-management?page=${currentPage}`;
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
    .then(response => {
      let total_records    = response.data.data.meta.total;
      let records_per_page = response.data.data.meta.per_page;
      let total_pages      = Math.ceil(total_records / records_per_page);

      setAdsData(response.data.data.data);
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
    loadAds();
  }, [currentPage, filters]);

  const handleChange = (e) => {
    if(e.target.checked){
      setShowModal(true);
      setActive(1);
    } else {
      setShowModal3(true);
      setActive(0);
    }
  }

  const handleChange2 = async () => {
    setShowModal(false);
    setShowModal3(false);

    let data = await axios.post(`featured-management/${id}/update/status`, {
      status: active
    })
    .then(response => {
      if(active === 1){
        setShowModal2(true);
      }else{
        setShowModal4(true);
      }
      loadAds();
      setId("");
      setActive("");
    })
    .catch(err => {
      console.error(err.response.data.message);
    });
  };

  const handleClickSubscription = () => {
    navigate("/admin/featuring-subscription/add-subscription");
  };



  return (
    <>
      <DashboardLayout>
        <section>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <div className="dashCard py-3">
                  <Row>
                    <Col xs={11} className="m-auto">
                      <Row className="my-5">
                        <Col xs={12}>
                          <div>
                            <h3 className=" text-capitalize">
                               Featuring Subscription
                            </h3>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <CustomTable
                            headers={AddSubscriptionHeader}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            totalRecords={totalRecords}
                            filters={filters}
                            setFilters={setFilters}
                            setLoad={setLoad}

                            filterSort={true}
                            // filterSortValue={filterSortValue}
                            // setFilterSortValue={setFilterSortValue}
                            RequestButton={true}
                            RequestButtonText="Add Subscription"
                            shouldDisplaySpan={false}
                            requestButtonClasses="h-short"
                            // filterSortValues={sortingValues}
                            filterSearch={true}
                            // filterSearchValue={filterSearchValue}
                            // setFilterSearchValue={setFilterSearchValue}
                            renderEntries={false}
                            dateFilter={true}
                            // filterFrom={filterFrom}
                            // setFilterFrom={setFilterFrom}
                            // filterTo={filterTo}
                            // setFilterTo={setFilterTo}
                            onRequestButton={handleClickSubscription}
                          >
                            <tbody>
                              {load ? (
                                <tr>
                                  <td colSpan="100%">
                                    <LoadingSpinner />
                                  </td>
                                </tr>
                              ) : (
                              adsData.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.package_title}</td>
                                  <td>${item.amount}</td>
                                  <td>{item.no_of_request}</td>
                                  <td>{item.updated_at}</td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <label className="switch">
                                        <input
                                          type="checkbox"
                                          checked={item.status === 1}
                                          onChange={e => {
                                            handleChange(e);
                                            setId(item.id);
                                          }}
                                        />
                                        <span className="slider-btn round"></span>
                                      </label>
                                      <Link
                                        to={`/admin/featuring-subscription/detail/${item.id}`}
                                        className="tableAction"
                                      >
                                        <FontAwesomeIcon
                                          className="primary_color"
                                          icon={faEye}
                                        />
                                      </Link>
                                      <Link
                                        to={`/admin/featuring-subscription/edit-subscription/${item.id}`}
                                        className="tableAction"
                                      >
                                        <FontAwesomeIcon
                                          className="secondary-color"
                                          icon={faPenToSquare}
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              )))}
                            </tbody>
                          </CustomTable>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="Are You Sure You Want To Active Subscription?"
        success={false}
        action={handleChange2}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal2}
        close={() => setShowModal2(false)}
        onClickOk={() => setShowModal2(false)}
        success
        para="This Subscription Has Been Activated Successfully"
      />
      <CustomModal
        show={showModal3}
        close={() => setShowModal3(false)}
        para="Are You Sure You Want To Inactive Subscription"
        success={false}
        action={handleChange2}
        showYesNoButtons={showYesButton || showNoButton}
      />
      <CustomModal
        show={showModal4}
        close={() => setShowModal4(false)}
        onClickOk={() => setShowModal4(false)}
        success
        para="This Subscription Has Been Inactivated Successfully"
      />
    </>
  );
};

export default FeaturingSubscription;
