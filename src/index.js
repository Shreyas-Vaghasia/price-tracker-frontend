import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import AddVendorPage from './pages/AddVendorPage';
import EditProduct from './pages/EditProduct';
import 'bootswatch/dist/pulse/bootstrap.min.css';
//pulse theme - Bootswatch 
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/add-new-product",
    element: <AddProductPage />,
  },
  {
    path: "/add-new-vendor",
    element: <AddVendorPage />,
  },
  {
    path: "/edit-product/:id",
    element: <EditProduct />,
  }
  ,

  {
    path: "*",
    element: <div>Not Found</div>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
