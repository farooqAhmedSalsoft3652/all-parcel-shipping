import { Route, Routes, BrowserRouter } from "react-router-dom";
import { roles } from "@config/data";

import Home from "@screens/home";

import ShipMyParcel from "@screens/shipMyParcel";
import ShipMyParcelStep2 from "@screens/shipMyParcel/step-2";
import PricesComparison from "@screens/shipMyParcel/PricesComparison";
import ShippingDetailsPickup from "@screens/shipMyParcel/shippingDetailsPickUp";
import ShippingDetailsDropOff from "@screens/shipMyParcel/shippingDetailsDropOff";
import ShippingPaymentInformation from "@screens/shipMyParcel/ShippingPaymentInformation";
import Tracking from "@screens/tracking";
import TrackingOrder from "@screens/tracking/trackingOrder";
import ContactUs from "@screens/contactUs";
import Couriers from "@screens/couriers";
import CouriersDetails from "@screens/couriers/couriersDetails";
import PrivacyPolicy from "@screens/privacyPolicy";
import TermsConditions from "@screens/termsConditions";
import Faq from "@screens/faq";
import Reviews from "@screens/reviews";
import RetailerReturns from "@screens/retailerReturns";
import AboutUs from "@screens/aboutUs";
import DeliveryServices from "@screens/deliveryServices";



import UserLogIn from "@screens/auth/login";
import ForgetPassword from "@screens/auth/forgetPassword";
import ForgetPassword2 from "@screens/auth/forgetPassword2";
import ForgetPassword3 from "@screens/auth/forgetPassword3";
import SignUp from "@screens/auth/signup";


import OrderLogs from "@screens/orderLogs";
import OrderDetails from "@screens/orderLogs/OrderDetails";


// import PackagesLogs from "@screens/packages";
import Payment from "@screens/payment";
import MyProfile from "@screens/userProfile";
import EditProfile from "@screens/userProfile/editProfile";
import PasswordChange from "@screens/userProfile/changePassword";
import Notifications from "@screens/notifications";

import NotFound from "@screens/Page404";

import AdminLogIn from "@screens/admin/auth/login";
import AdminForgetPassword from "@screens/admin/auth/forgetPassword";
import AdminForgetPassword2 from "@screens/admin/auth/forgetPassword2";
import AdminForgetPassword3 from "@screens/admin/auth/forgetPassword3";
import { Dashboard } from "@screens/admin/dashboard";
import UserManagement from "@screens/admin/userManagement";
import OrdersLogs from "@screens/admin/ordersLogs";


import UserDetail from "@screens/admin/userManagement/detail";
import ReportManagement from "@screens/admin/reportManagement";

import AdminNotification from "@screens/admin/notification";
import QueryManagement from "@screens/admin/queryManegement";
import QueryDetails from "@screens/admin/queryManegement/details";


import AdminProfile from "@screens/admin/myProfile";
import AdminChangePassword from "@screens/admin/myProfile/changePassword";
import EditAdminProfile from "@screens/admin/myProfile/editProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import GuestRoutes from "./GuestRoutes";
import PreventAdmin from "./PreventAdmin";







const UserRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      {/* Guest Screens start */}
      <Route element={<PreventAdmin />}>
        <Route path="/" element={<Home />} />
        <Route path="/ship-my-parcel" element={<ShipMyParcel />} />
        <Route path="/ship-my-parcel/step-2" element={<ShipMyParcelStep2 />} />
        <Route path="/prices-comparison" element={<PricesComparison />} />
        <Route path="/shipping-details-pickup" element={<ShippingDetailsPickup />} />
        <Route path="/shipping-details-dropoff" element={<ShippingDetailsDropOff />} />
        <Route path="/shipping-payment-information" element={<ShippingPaymentInformation />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/tracking/tracking-order" element={<TrackingOrder />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/couriers" element={<Couriers />} />
        <Route path="/couriers-details" element={<CouriersDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/retailer-returns" element={<RetailerReturns />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/delivery-services" element={<DeliveryServices />} />

        <Route path="/order-logs" element={<OrderLogs />} />
        <Route path="/order-logs/details/:id" element={<OrderDetails />} />

        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<PasswordChange />} />

{/* will be delet after Guest Acount Setup */}
      </Route>

      {/* Guest Screens End */}


      {/* Auth Screens Start */}
      <Route element={<GuestRoutes />}>
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />
      </Route>
      {/* Auth Screens End */}

     

      {/* Admin Screens Start */}
      {<Route element={<GuestRoutes admin />}>
        <Route path="/admin" element={<AdminLogIn />} />
        <Route path="/admin/login" element={<AdminLogIn />} />
        <Route
          path="/admin/forget-password"
          element={<AdminForgetPassword />}
        />
        <Route
          path="/admin/forget-password2"
          element={<AdminForgetPassword2 />}
        />
        <Route
          path="/admin/forget-password3"
          element={<AdminForgetPassword3 />}
        />
      </Route>}

      <Route element={<ProtectedRoutes admin roles={[roles.admin]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/notifications" element={<AdminNotification />} />

        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/user-management/details/:id" element={<UserDetail />} />
        <Route path="/admin/report-management" element={<ReportManagement />} />

        <Route path="/admin/orders-logs" element={<OrdersLogs />} />
        <Route path="/admin/orders-logs/details/:id" element={<OrdersLogs />} />
        <Route path="/admin/query-management" element={<QueryManagement />} />
        <Route path="/admin/query-management/details/:id" element={<QueryDetails />} />


        

        <Route path="/admin/my-profile" element={<AdminProfile />} />
        <Route path="/admin/change-password" element={<AdminChangePassword />} />
        <Route path="/admin/edit/profile" element={<EditAdminProfile />} />
      </Route>
      {/* Admin Screens End */}
    </Routes>
  );
}

export default UserRouter;