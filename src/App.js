import React from 'react';

import 'bootswatch/dist/pulse/bootstrap.min.css';
import './App.css';

import { useState } from 'react';
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
import LoginPage from './pages/LoginPage';
// export const UserContext = React.createContext({});
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
//pulse theme - Bootswatch 
const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute Component={HomePage} />),
  },
  {
    path: "/add-new-product",
    element: (<ProtectedRoute Component={AddProductPage} />),
  },
  {
    path: "/add-new-vendor",
    element: (<ProtectedRoute Component={AddVendorPage} />),
  },
  {
    path: "/edit-product/:id",
    element: (<ProtectedRoute Component={EditProduct} />),
  }
  ,

  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/login",
    element: <LoginPage />

  }
]);

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
