import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ContactPage, contactPageAction } from "./ContactPage";
import { ThankYouPage } from "./ThankYouPage";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="contact" />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    action: contactPageAction,
  },
  {
    path: "/thank-you/:name",
    element: <ThankYouPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
