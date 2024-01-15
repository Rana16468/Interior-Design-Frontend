import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Layout/Main";
import Home from "../Components/Home/Home";
import UserRegister from "../Components/Pages/Register/UserRegister";
import Login from "../Components/Pages/Register/Login";
import CategoriesDetails from "../Components/CategoriesDetails/CategoriesDetails";
import AddCategories from "../Components/CategoriesDetails/AddCategories";
import CategoriesList from "../Components/CategoriesDetails/CategoriesList";
import AddToDesign from "../AddCategoricalDesign/AddToDesign";
import PrivateRouter from "./PrivateRouter";
import MyCategorieList from "../UpdateInteriorDesign/MyCategorieList";
import UpdateInterior from "../UpdateInteriorDesign/UpdateInterior";
import UpdateCategory from "../Components/CategoriesDetails/UpdateCategory";
import MyBooking from "../Components/Booking/MyBooking";
import UpdateBooking from "../Components/Booking/UpdateBooking";
import BookingPayment from "../Components/Payment/BookingPayment";
import PaymentSuccess from "../Components/Payment/PaymentSuccess";
import PaymentFailed from "../Components/Payment/PaymentFailed";
import WishList from "../Components/WishList/WishList";
import SpecificWishList from "../Components/WishList/SpecificWishList";
import MyBuyerList from "../Components/MyBuyer/MyBuyerList";
import TransactionDetails from "../Components/MyBuyer/TransactionDetails";
import DashBoardLayout from "../Components/Layout/DashBoardLayout ";

import Dashboard from "../Components/Dashboard/Dashboard";
import AllBooking from "../Components/Dashboard/SellerAccessable/AllBooking";
import CategoriesAllListedInfo from "../Components/Dashboard/SellerAccessable/CategoriesAllListedInfo";
import PaymentList from "../Components/Dashboard/SellerAccessable/PaymentList";
import AllWishList from "../Components/Dashboard/SellerAccessable/AllWishList";
import AllReportList from "../Components/Dashboard/SellerAccessable/AllReportList";
import SpeciifcReportService from "../Components/Dashboard/SellerAccessable/SpeciifcReportService";
import UserList from "../Components/Dashboard/SellerAccessable/UserList";
import UserProfile from "../Components/UserProfile/UserProfile";
import About from "../Components/About/About";
import Service from "../Components/Service/Service";
import Contruct from "../Components/Contruct/Contruct";
import ImageGenerated from "../Components/ImageGenrated/ImageGenerated";
import ContractList from "../Components/Contruct/ContractList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <UserRegister /> },
      { path: "/login", element: <Login /> },

      { path: "/add-design-catagories", element: <AddCategories /> },
      { path: "/categories-list", element: <CategoriesList /> },
      { path: "/addToDesign/:id", element: <AddToDesign /> },
      { path: "/about", element: <About /> },
      { path: "/Service", element: <Service /> },
      { path: "/Contruct", element: <Contruct /> },
      {
        path: "/imageGenerated",
        element: (
          <PrivateRouter>
            <ImageGenerated />
          </PrivateRouter>
        ),
      },

      {
        path: "/user_profile",
        element: (
          <PrivateRouter>
            <UserProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "/categories-details/:id",
        element: (
          <PrivateRouter>
            <CategoriesDetails></CategoriesDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/MyCategorieList/:id",
        element: (
          <PrivateRouter>
            <MyCategorieList />
          </PrivateRouter>
        ),
      },
      {
        path: "/SpecificCategoriesDetails/:id",
        element: (
          <PrivateRouter>
            <UpdateInterior></UpdateInterior>
          </PrivateRouter>
        ),
      },
      {
        path: "/update_category/:id",
        element: (
          <PrivateRouter>
            <UpdateCategory />
          </PrivateRouter>
        ),
      },
      {
        path: "/my_bookinglist",
        element: (
          <PrivateRouter>
            <MyBooking />
          </PrivateRouter>
        ),
      },
      {
        path: "/update_booking_list/:id",
        element: (
          <PrivateRouter>
            <UpdateBooking />
          </PrivateRouter>
        ),
      },
      {
        path: "/bookingPayment/:id",
        element: (
          <PrivateRouter>
            <BookingPayment />
          </PrivateRouter>
        ),
      },
      {
        path: "/payment/success/:tranId",
        element: (
          <PrivateRouter>
            <PaymentSuccess />
          </PrivateRouter>
        ),
      },
      {
        path: "/payment/fail/:tranId",
        element: (
          <PrivateRouter>
            <PaymentFailed />
          </PrivateRouter>
        ),
      },
      {
        path: "/WishList",
        element: (
          <PrivateRouter>
            <WishList></WishList>
          </PrivateRouter>
        ),
      },
      {
        path: "/specific-WishList/:id",
        element: (
          <PrivateRouter>
            <SpecificWishList />
          </PrivateRouter>
        ),
      },
      {
        path: "/myBuyerList",
        element: (
          <PrivateRouter>
            <MyBuyerList />
          </PrivateRouter>
        ),
      },
      {
        path: "/TransactionDetails/:id",
        element: (
          <PrivateRouter>
            <TransactionDetails />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashBoardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "all_wish_list",
        element: <AllWishList />,
      },
      {
        path: "all_bookinglist",
        element: <AllBooking />,
      },
      {
        path: "all_categories_details",
        element: <CategoriesAllListedInfo />,
      },
      {
        path: "all_payment_list",
        element: <PaymentList></PaymentList>,
      },
      { path: "all_report_list", element: <AllReportList /> },
      {
        path: "SpeciifcReportService/:id",
        element: <SpeciifcReportService></SpeciifcReportService>,
      },
      { path: "all_user_list", element: <UserList /> },
      { path: "ContractList", element: <ContractList /> },
    ],
  },
]);

export default routes;
