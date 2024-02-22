import CustomFilters from "../customFilters";
import CustomPagination from "../customPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import {CustomInput} from "../CustomInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const CustomTable = (props) => {
  const Navigate = useNavigate()
  const isMounted = useRef(false);
  const [search, setSearch] = useState(props?.filters?.search);
  const {
    renderSearchWrapper = true,
    renderEntries = true,
    required = true,
    RequestButton = false,
    paginateRecords = true,
    RequestButtonText,
    shouldDisplaySpan,
    requestButtonClasses,
    onRequestButton,
    
  } = props;

  const handleRequestButtonClick = () => {
    if (onRequestButton) {
      onRequestButton();
    } else {
      Navigate("/admin/mentor-management/account-request");
    }
  };

  // useEffect(() => {
  //   isMounted.current = true; // Set the flag to true when the component is mounted.
  //   const timeoutId = setTimeout(() => {
  //     if (isMounted.current) {
  //       props.setFilters(prev => ({ ...prev, search }));
  //     }
  //   }, 2000);

  //   return () => {
  //     isMounted.current = false; // Set the flag to false when the component is unmounted.
  //     clearTimeout(timeoutId);
  //   };
  // }, [search]);

  useEffect(() => {
    if(renderSearchWrapper && isMounted.current){
      props.setLoad(true);
      const timeoutId = setTimeout(() => {props.setFilters(prev => ({...prev, search}))}, 750);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <>
      <div
        className={`d-block d-sm-flex ${
          renderEntries ? "justify-content-between" : "justify-content-end"
        } `}
      >
        {renderEntries && (
          <div className="filterWrapper d-flex align-items-center align-self-center mb-3 mb-sm-0">
            <label className="filterLabel me-2 mb-0">Show</label>
            <select
              className="filterInput"
              value={props?.filters?.limit}
              onChange={(e) =>
                props.setFilters((prev) => ({ ...prev, limit: e.target.value }))
              }
            >
              {/* <option value="3">03</option> */}
              <option value="all">All</option>
              <option value="5">05</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <span className="filterLabel ms-2 d-none d-md-block">Entries</span>
          </div>
        )}
        {RequestButton && (
          <div className="request_btn me-3">
            <button
              className={`site-btn ${requestButtonClasses}`}
              onClick={handleRequestButtonClick}
            >
              {RequestButtonText}
              {shouldDisplaySpan && (
                <span className="request_list text-decoration-none">
                  {props?.numberOfRequest}
                </span>
              )}
            </button>
          </div>
        )}
        <div className="filterWrapper justify-content-end d-flex gap-3 mb-0">
          {renderSearchWrapper && (
            <div className="searchWrapper flex-grow-1">
              <CustomInput
                type="text"
                placeholder="Search"
                name="search"
                inputClass="filterInput searchInput"
                value={search}
                onChange={(e) => {
                  isMounted.current = true;
                  setSearch(e.target.value);
                }}
              />
              <button className="searchButton notButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          )}
          
          {required === true && (
            <CustomFilters
              // filterSort={props?.filterSort}
              // filterSortValue={props?.filterSortValue}
              // setFilterSortValue={props?.setFilterSortValue}
              // filterSortValues={props?.filterSortValues}
              // filterSearch={props?.filterSearch}
              // filterSearchValue={props?.filterSearchValue}
              // setFilterSearchValue={props?.setFilterSearchValue}
              dateFilter={props?.dateFilter}
              dateFilter2={props?.dateFilter2}
              // filterFrom={props?.filterFrom}
              // setFilterFrom={props?.setFilterFrom}
              // filterTo={props?.filterTo}
              // setFilterTo={props?.setFilterTo}
              sortStatus={props?.sortStatus}
              statusFilter={props?.statusFilter}
              statusFilterText={props?.statusFilterText}
              filters={props?.filters}
              setFilters={props?.setFilters}
              dateEndFilter={props?.dateEndFilter}

            />
          )}
        </div>
      </div>

      <div className="main-tabble table-responsive mx-n2">
        <table className={`table table-borderless dataTable px-0 ${props.className}`}>
          <thead>
            <tr>
              {props?.headers.map((header) => (
                <th key={header.key}>{header.title}</th>
              ))}
            </tr>
          </thead>
          {props?.children}
        </table>
      </div>
      {paginateRecords && (
        <CustomPagination
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          totalPages={props.totalPages}
          totalRecords={props.totalRecords}
        />
      )}
    </>
  );
};

export default CustomTable;
