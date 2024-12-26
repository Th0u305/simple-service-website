import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import PrivateRoute from "./components/Private/PrivateRoute";
import Dashboard from "./components/Private/Page/Dashboard/Dashboard";
import ContextProvider from "./components/Context/ContextProvider";
import Login from "./components/Private/Page/Login";
import Register from "./components/Private/Page/Register";
import { HelmetProvider } from "react-helmet-async";
import Money from "./components/Private/Page/Dashboard/DashboardPages/Money";
import Settings from "./components/Private/Page/Dashboard/DashboardPages/Settings";
import Profile from "./components/Private/Page/Dashboard/DashboardPages/Profile";
import SingleCard from "./components/Pages/SingleCard";
import AllServices from "./components/Private/Page/AllServices";
import AddService from "./components/Private/Page/AddService";
import Review from "./components/Private/Page/Review";
import MyService from "./components/Private/Page/MyService";
import UpdateService from "./components/Private/Page/UpdateService";
import MyReviews from "./components/Private/Page/MyReviews";
import UpdateReview from "./components/Private/Page/UpdateReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: ({ params }) =>
          fetch(`https://service-web-server.vercel.app/service/:${params}`),
      },
      {
        path: "/home",
        element: <Navigate to={"/"}></Navigate>,
      },

      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/services",
        element: (
          <PrivateRoute>
            <AllServices></AllServices>
          </PrivateRoute>
        ),
      },
      {
        path : "/myService",
        element : <PrivateRoute><MyService></MyService></PrivateRoute>
      },
      {
        path : "/myReviews",
        element : <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: "/addService",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path : "/updateReview/:id/:id",
        element : <PrivateRoute><UpdateReview></UpdateReview></PrivateRoute>,
      },
      {
        path: "service/:id",
        element: (
          <PrivateRoute>
            <SingleCard></SingleCard>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://service-web-server.vercel.app/singleService/${params.id}`),
      },
      { 
        path: "service/:id/review", 
        element: <PrivateRoute><Review></Review></PrivateRoute> ,
        loader: ({ params }) =>
          fetch(`https://service-web-server.vercel.app/singleService/${params.id}`),
      },
      { 
        path: "service/update/:id", 
        element: <PrivateRoute><UpdateService></UpdateService></PrivateRoute> ,
        loader: ({ params }) =>
          fetch(`https://service-web-server.vercel.app/singleService/update/${params.id}`),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/billing",
            element: (
              <PrivateRoute>
                <Money></Money>{" "}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/profile",
            element: (
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/setting",
            element: (
              <PrivateRoute>
                <Settings></Settings>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </HelmetProvider>
  </StrictMode>
);
