import { React, useState, useEffect } from "react";
import "./index.css";
import {AdminHeader} from "../header"
import {Sidebar} from "../sidebar"
export const DashboardLayout = (props) => {

  const [sideBarClass, setsideBarClass] = useState("");
  const [bodyClass, setbodyClass] = useState("");
  useEffect(() => {
    if (window.innerWidth <= 991) {
      setsideBarClass("collapsed");
      setbodyClass("expanded");
    } else {
      setsideBarClass("");
      setbodyClass("");
    }
    function handleResize() {
      if (window.innerWidth <= 991) {
        setsideBarClass("collapsed");
        setbodyClass("expanded");
      } else {
        setsideBarClass("");
        setbodyClass("");
      }
    }
    window.addEventListener("resize", handleResize);
    }, []);
    function sidebarToggle() {
      if (sideBarClass === "") {
        setsideBarClass("collapsed");
        setbodyClass("expanded");
      } else {
        setsideBarClass("");
        setbodyClass("");
      }
    }
    return (
      <>
        <AdminHeader sidebarToggle={sidebarToggle} />
        <Sidebar sideClass={sideBarClass} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className={`dashboardBody  admin-bg ${bodyClass}`}>{props.children}</div>
            </div>
          </div>
        </div>
      </>
    );
  };