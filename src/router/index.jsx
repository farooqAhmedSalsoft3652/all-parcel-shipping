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

import { Dashboard } from "@screens/admin/dashboard";

import AdminNotification from "@screens/admin/notification";
import MenteeManagement from "@screens/admin/menteeManagement";
import MenteeDetail from "@screens/admin/menteeManagement/detail";
import MentorManagement from "@screens/admin/mentorManagement";
import MentorshipRequest from "@screens/admin/mentorshipRequest";
import AccountRequest from "@screens/admin/accountRequest";
import AdminMentorDetail from "@screens/admin/mentorManagement/detail";
import AdminMentorReqDetail from "@screens/admin/mentorManagement/requestDetail";
import AdminMentorProfile from "@screens/admin/accountRequest/detail";
import InterstManagent from "@screens/admin/interstManegement";
import AddInterest from "@screens/admin/interstManegement/addInterest";
import EditInterest from "@screens/admin/interstManegement/editInterst";
import DetailInterest from "@screens/admin/interstManegement/interstDetail";
import AdminAdSubscription from "@screens/admin/adSubscription";
import AddSubscriptionFunc from "@screens/admin/adSubscription/addSubscriptin";
import SubscriptionDetail from "@screens/admin/adSubscription/subscriptionDetail";
import EditSubscription from "@screens/admin/adSubscription/editSubscription";
import FeaturingSubscription from "@screens/admin/featuringSubscription";
import AddFeaturingSubscription from "@screens/admin/featuringSubscription/addFeaturingSubscription";
import FeaturingSubDetail from "@screens/admin/featuringSubscription/FeaturingsubscriptionDetail";
import EditFeaturingSubs from "@screens/admin/featuringSubscription/editFeaturingSubscription";
import MentorShipFee from "@screens/admin/mentorShipFee";
import QueriesList from "@screens/admin/queries";
import QueriesDetail from "@screens/admin/queries/detail";
import PaymentLogs from "@screens/admin/paymentLogs";
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
        <Route path=" /shipping-payment-information" element={<ShippingPaymentInformation />} />
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

        <Route path="/order-logs" element={<OrderLogs />} />
        <Route path="/order-logs/details/:id" element={<OrderDetails />} />

        <Route path="/login" element={<UserLogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />




        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<PasswordChange />} />






{/* will be delet after Guest Acount Setup */}


        {/* <Route path="/featured-ads" element={<FeaturedAds />} /> */}
        {/* <Route path="/ads" element={<AdsPage />} /> */}
      </Route>
      {/* Guest Screens End */}

      {/* Auth Screens Start */}
      {/* <Route element={<GuestRoutes />}>
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />
      </Route> */}
      {/* Auth Screens End */}

      {/* Mentee Screens Start */}
      {/* <Route element={<ProtectedRoutes roles={[roles.mentee]} />}>
        <Route path="/mentor/details/:id" element={<MentorDetail />} />
        <Route path="/my-request" element={<MyRequest />} />
        <Route path="/my-request/details/:id" element={<MyRequestDetail />} />
        <Route path="/user/profile" element={<MenteeProfile />} />
        <Route path="/user/edit-profile" element={<EditUserProfile />} />
      </Route> */}
      {/* Mentee Screens End */}

      {/* Mentor Screens Start */}
      {/* <Route element={<ProtectedRoutes  roles={[roles.mentor]} />}>
        <Route path="/mentorship-request" element={<MentorShipReq />} />
        <Route
          path="/mentorship-request/details/:id"
          element={<MentorReqDetail />}
        />

        <Route path="/ads-logs" element={<AdsLogs />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit-profile" element={<EditProfile />} />
      </Route> */}
      {/* Mentor Screens End */}

      {/* Screens for Mentor, Mentee */}
      {/* <Route element={<ProtectedRoutes roles={[roles.mentor, roles.mentee]} />}>
        <Route path="/payments" element={<Payment />} />
        <Route path="/change-password" element={<PasswordChange />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route> */}

      {/* Admin Screens Start */}
      {/* <Route element={<GuestRoutes admin />}>
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
      </Route> */}

      <Route element={<ProtectedRoutes admin roles={[roles.admin]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/notifications" element={<AdminNotification />} />

        <Route path="/admin/mentee-management" element={<MenteeManagement />} />
        <Route
          path="/admin/mentee-management/details/:id"
          element={<MenteeDetail />}
        />

        <Route path="/admin/mentor-management" element={<MentorManagement />} />
        <Route
          path="/admin/mentor-management/details/:id"
          element={<AdminMentorDetail />}
        />
        <Route
          path="/admin/mentor-management/account-request"
          element={<AccountRequest />}
        />
        <Route
          path="/admin/mentor-management/mentor-profile/:id"
          element={<AdminMentorProfile />}
        />

        <Route
          path="/admin/mentorship-request"
          element={<MentorshipRequest />}
        />
        <Route
          path="/admin/mentorship-request/details/:id"
          element={<AdminMentorReqDetail />}
        />

        <Route
          path="/admin/interests-management"
          element={<InterstManagent />}
        />
        <Route
          path="/admin/interests-management/add-interest"
          element={<AddInterest />}
        />
        {/* <Route path="/admin/interests-management/detail/:id" element={<DetailInterest />} /> */}
        <Route
          path="/admin/interests-management/edit-interest/:id"
          element={<EditInterest />}
        />

        <Route
          path="/admin/ad-subscription"
          element={<AdminAdSubscription />}
        />
        <Route
          path="/admin/ad-subscription/add-subscription"
          element={<AddSubscriptionFunc />}
        />
        <Route
          path="/admin/ad-subscription/detail/:id"
          element={<SubscriptionDetail />}
        />
        <Route
          path="/admin/ad-subscription/edit-subscription/:id"
          element={<EditSubscription />}
        />

        <Route
          path="/admin/featuring-subscription"
          element={<FeaturingSubscription />}
        />
        <Route
          path="/admin/featuring-subscription/add-subscription"
          element={<AddFeaturingSubscription />}
        />
        <Route
          path="/admin/featuring-subscription/detail/:id"
          element={<FeaturingSubDetail />}
        />
        <Route
          path="/admin/featuring-subscription/edit-subscription/:id"
          element={<EditFeaturingSubs />}
        />

        <Route path="/admin/mentorship-fees" element={<MentorShipFee />} />

        <Route path="/admin/queries-list" element={<QueriesList />} />
        <Route
          path="/admin/queries-list/detail/:id"
          element={<QueriesDetail />}
        />

        <Route path="/admin/payment-logs" element={<PaymentLogs />} />

        <Route path="/admin/my-profile" element={<AdminProfile />} />
        <Route
          path="/admin/change-password"
          element={<AdminChangePassword />}
        />
        <Route path="/admin/edit/profile" element={<EditAdminProfile />} />
      </Route>
      {/* Admin Screens End */}
    </Routes>
  );
}

export default UserRouter;