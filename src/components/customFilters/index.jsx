import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import { Button, Dropdown, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import SiteButton from "../Button/button";

const CustomFilters = (props) => {
  const { sortStatus = true } = props;
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const applyFilter = () => {
    props.setFilters(prev => ({...prev, status, from, to}));
    handleClose();
  }

  return (
    <>
    <Dropdown className='user-filters-dropdown' align="end">
      <Dropdown.Toggle className="primery-color filter-btn" id="dropdown-basic">
        <FontAwesomeIcon icon={faFilter} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className="dropdown-header">
          <h3 className="fw-bold title mb-0">Filter</h3>
        </div>
        <div className="dropdown-body">
          <div className="tableFilters">
            <div className="row">
              <div className="col-12 ">
                {props?.dateFilter2 && (
                  <div className="filterWrapper">
                    <label className="filterLabel fw-bold mb-3">Sort By Date</label>
                    <div className="row mb-4">
                      <div className="col-12 my-2">
                        <label className="filterLabel">From:</label>
                        <input
                          type="date"
                          placeholder="From"
                          name="from"
                          id="from"
                          className="filterInput w-100"
                          value={from ?? props?.filters?.from}
                          max={to}
                          onChange={e => {
                            setFrom(e.target.value);
                            document.getElementById('to').setAttribute('min', e.target.value);

                          }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="filterLabel">To:</label>
                        <input
                          type="date"
                          placeholder="To"
                          name="to"
                          id="to"
                          className="filterInput w-100"
                          value={to ?? props?.filters?.to}
                          min={from}
                          onChange={e => {
                            setTo(e.target.value);
                            document.getElementById('from').setAttribute('max', e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-12 ">
                {props?.dateFilter && (
                  <div className="filterWrapper">
                    <label className="filterLabel fw-bold mb-3">Filter By Start Order:</label>
                    <div className="row mb-4">
                      <div className="col-12 my-2">
                        <label className="filterLabel">From:</label>
                        <input
                          type="date"
                          placeholder="From"
                          name="from"
                          id="from"
                          className="filterInput w-100"
                          value={from ?? props?.filters?.from}
                          max={to}
                          onChange={e => {
                            setFrom(e.target.value);
                            document.getElementById('to').setAttribute('min', e.target.value);

                          }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="filterLabel">To:</label>
                        <input
                          type="date"
                          placeholder="To"
                          name="to"
                          id="to"
                          className="filterInput w-100"
                          value={to ?? props?.filters?.to}
                          min={from}
                          onChange={e => {
                            setTo(e.target.value);
                            document.getElementById('from').setAttribute('max', e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-12 ">
                {props?.dateEndFilter && (
                  <div className="filterWrapper">
                    <label className="filterLabel fw-bold mb-3">Filter By End Order:</label>
                    <div className="row mb-4">
                      <div className="col-12 my-2">
                        <label className="filterLabel">From:</label>
                        <input
                          type="date"
                          placeholder="From"
                          name="from"
                          id="from"
                          className="filterInput w-100"
                          value={from ?? props?.filters?.from}
                          max={to}
                          onChange={e => {
                            setFrom(e.target.value);
                            document.getElementById('to').setAttribute('min', e.target.value);

                          }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="filterLabel">To:</label>
                        <input
                          type="date"
                          placeholder="To"
                          name="to"
                          id="to"
                          className="filterInput w-100"
                          value={to ?? props?.filters?.to}
                          min={from}
                          onChange={e => {
                            setTo(e.target.value);
                            document.getElementById('from').setAttribute('max', e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {sortStatus && (
              <div className="filterWrapper">
                <label className="filterLabel fw-bold mb-3">{props.statusFilterText ?? "Filter by Status"}</label>
                <select className="filterInput w-100 text-capitalize" value={status ?? props.filters?.status} onChange={e => setStatus(e.target.value)}>
                  <option value="">All</option>
                  {(props?.statusFilter) ? (props?.statusFilter.map(item => (
                    <option className="text-capitalize" value={item}>{item}</option>
                  ))) : (
                    <>
                      <option value={1}>Pending</option>
                      <option value={0}>Cancelled</option>
                      <option value={1}>Completed</option>
                    </>
                  )}
                </select>
              </div>
                )}
            </div>
            <div className="mt-3 text-center d-flex justify-content-center flex-column flex-sm-row">
              <SiteButton onClick={applyFilter} type="button" className="site-btn me-0 me-sm-3 mb-3 mb-sm-0">Apply</SiteButton>
              <SiteButton type="button" className="site-btn site_border_btn" onClick={handleClose}>Clear All</SiteButton>
            </div>
          </div>
        </div>
          
      </Dropdown.Menu>
  </Dropdown>

{/* 
      <Button
        variant="primary"
        className="primery-color filter-btn"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faFilter} />
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="off-convas"
      >
        <Offcanvas.Header>
          <h2 className="mainTitle mb-0">Filters</h2>
          <span className="close-btn" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="tableFilters">
            <div className="row">
              <div className="col-12 ">
                {props?.dateFilter && (
                  <div className="filterWrapper">
                    <label className="filterLabel mb-4">Sort by date:</label>
                    <div className="row mb-4">
                      <div className="col-12 my-2">
                        <label className="filterLabel">From:</label>
                        <input
                          type="date"
                          placeholder="From"
                          name="from"
                          id="from"
                          className="filterInput w-100"
                          value={from ?? props?.filters?.from}
                          max={to}
                          onChange={e => {
                            setFrom(e.target.value);
                            document.getElementById('to').setAttribute('min', e.target.value);

                          }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="filterLabel">To:</label>
                        <input
                          type="date"
                          placeholder="To"
                          name="to"
                          id="to"
                          className="filterInput w-100"
                          value={to ?? props?.filters?.to}
                          min={from}
                          onChange={e => {
                            setTo(e.target.value);
                            document.getElementById('from').setAttribute('max', e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {sortStatus && (
              <div className="filterWrapper">
                <label className="filterLabel">{props.statusFilterText ?? "Filter by Status"}</label>
                <select className="filterInput w-100 text-capitalize" value={status ?? props.filters?.status} onChange={e => setStatus(e.target.value)}>
                  <option value="">All</option>
                  {(props?.statusFilter) ? (props?.statusFilter.map(item => (
                    <option className="text-capitalize" value={item}>{item}</option>
                  ))) : (
                    <>
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </>
                  )}
                </select>
              </div>
                )}
            </div>
            <div className="mt-3">
              <SiteButton onClick={applyFilter} type="button" className="site-btn me-3">Apply</SiteButton>
              <SiteButton type="button" className="site-btn site_border_btn" onClick={handleClose}>Cancel</SiteButton>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  );
};

export default CustomFilters;
