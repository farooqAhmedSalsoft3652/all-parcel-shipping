import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faClipboard, faClipboardList, faMoneyCheckDollar, faShield, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { faCreditCard, faMessage, faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";

export const Sidebar = (props) => {
  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        {[
          {to: "/admin/dashboard", icon: faBorderAll, text: "Dashboard"},
          {to: "/admin/mentee-management", icon: faUsers , text: "Mentee Management"},
          {to: "/admin/mentor-management", icon: faUser, text: "Mentor Management"},
          {to: "/admin/mentorship-request", icon: faClipboardList, text: "Mentorship Request"},
          {to: "/admin/interests-management", icon: faCreditCard, text: "Interests"},
          {to: "/admin/ad-subscription", icon: faShield, text: "Ad Subscription"},
          {to: "/admin/featuring-subscription", icon: faBorderAll, text: "Featuring Subscription"},
          {to: "/admin/mentorship-fees", icon: faMoneyCheckDollar, text: "Mentorship Fees"},
          {to: "/admin/payment-logs", icon: faMoneyBill1, text: "Payment Logs"},
          {to: "/admin/queries-list", icon: faMessage, text: "Queries"},
     
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