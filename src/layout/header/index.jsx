import "./index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faBars, faEllipsisV, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { logo } from "../../assets/images";
import { SERVER_URL } from "../../config/data";
import CustomModal from "../../components/customModal";
import SiteButton from "../../components/Button/button";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import moment from "moment";
import { decode } from "base-64";

export const AdminHeader = (props) => {
  const navigate = useNavigate();
  const { clearRole } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showYesButton, setShowYesButton] = useState(true);
  const [showNoButton, setShowNoButton] = useState(true);

  const loadNotifications = async () => {
    let data = await axios.get('/notifications?type=unread')
    .then(response => {
      setNotifications(response.data.data.data);
    })
    .catch(err => {
      console.error(err.response.data.message);
    });
  }

  useEffect(() => {
    let user = JSON.parse(decode(localStorage.getItem('user')));
    setProfile(user);
    loadNotifications();
  }, []);

  const handleLogout = async () => {
    let logout = await axios.post('/logout')
      .then(res => {
        clearRole();
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        setShowModal(false);
        navigate("/");
      })
      .catch(err => console.error(err.response.data));
  };

  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid>
          <Link to={"/admin/dashboard"} className="siteLogo order-2 order-lg-1">
            <img src={logo} alt="Logo" className="img-fluid" />
          </Link>
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon " icon={faEllipsisV} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="ms-auto">
              <Dropdown className="notiDropdown me-2 ">
                <Dropdown.Toggle
                  variant="transparent pb-0"
                  className="notButton notifi-btn"
                >
                  <FontAwesomeIcon className="bellIcon" icon={faBell} />
                  {/* <span className="badge">9+</span> */}
                  {(notifications.length > 0) && (<span className="position-absolute top-0 start-90 translate-middle p-1 bg-danger border border-light rounded-circle"></span>)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="notiMenu" align="end">
                  <div className="notificationsBody">
                    <div className="d-flex justify-content-between align-items-baseline pt-3 singleNoti notify-border">
                      <h6 className="fw-bold ps-2">Notifications</h6>
                      {notifications.length > 0 && (<p className="notify-bg">{notifications.length} New</p>)}
                    </div>
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((item) => (
                      <>
                        <div key={item.id}>
                          <Dropdown.Item
                            className="drop_icon"
                            key={item.id}
                            as={Link}
                            to="/admin/notifications"
                          >
                            <div className="d-flex">
                              <div className="mediaLeft">
                                <FontAwesomeIcon
                                  className="bell-icon"
                                  icon={faBell}
                                />
                              </div>
                              <div className="mediaRight">
                                <p className="notificationText mb-0">
                                  {item.data.content}
                                </p>
                                <div className="d-md-flex align-items-baseline justify-content-between">
                                  <p className="text-muted mb-0">
                                    {moment(item.created_at, "DD-MM-YYYY hh:mm:ss").fromNow()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Dropdown.Item>
                        </div>
                      </>
                    ))) : (
                      <>
                        <div className="text-center my-3 text-muted">No new notification!</div>
                      </>
                    )}
                  </div>
                  <div className="notiFooter">
                    <Link to={"/admin/notifications"}>View All</Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="userDropdown">
                <Dropdown.Toggle
                  variant="transparent"
                  className="notButton toggleButton "
                >
                  <div className="userImage">
                    <img src={SERVER_URL + profile.avatar} alt={true.toString()} className="img-fluid me-2 rounded-circle" />
                  </div>
                  <span className="me-2">{ profile.first_name + " " + profile.last_name }</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="userMenu" align="end">
                  <Link className="userMenuItem" to={"/admin/my-profile"}>
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />
                   My Profile
                  </Link>
                  <Link className="userMenuItem" onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon
                      className="me-1 yellow-text"
                      icon={faSignOut}
                    />
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <SiteButton className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
            <FontAwesomeIcon
              className="bell-icon"
              onClick={props.sidebarToggle}
              icon={faBars}
            />
          </SiteButton>
        </Container>
      </Navbar>
      
      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        action={handleLogout}
        heading="Logout"
        para="Are You Sure You Want To Logout?"
        showYesNoButtons={showYesButton || showNoButton}
      />
    </header>
  );
};
