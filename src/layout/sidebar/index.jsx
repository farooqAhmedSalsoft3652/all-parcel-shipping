import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faClipboardList, faClipboardQuestion, faFileInvoiceDollar,  faUserGroup} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { faCreditCard,} from "@fortawesome/free-regular-svg-icons";

export const Sidebar = (props) => {
  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        {[
          {to: "/admin/dashboard", icon: faBorderAll, text: "Dashboard"},
          {to: "/admin/user-management", icon: faUserGroup , text: "User Management"},
          {to: "/admin/report-management", icon: faClipboardList, text: "Report Management"},
          {to: "/admin/orders-logs", icon: faFileInvoiceDollar, text: "Orders Logs"},
          {to: "/admin/query-management", icon: faClipboardQuestion, text: "Query Management"},
     
         ].map((item) => (
          <li key={item.to} className="sidebar-li ">
            <Link className={`sideLink ${location.pathname.includes(item.to) ? 'active' : ''}`} to={item.to}>
              <span className="sideIcon">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className="sideLinkText">{item.text}</span>
            </Link>
          </li> 
        ))}
      </ul>
    </div>
  );
};