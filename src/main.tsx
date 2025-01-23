import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from 'react-toastify'
import App from "./App.tsx";

import './App.css'
import 'antd/dist/reset.css'
import './style/main.scss'
import 'react-toastify/dist/ReactToastify.css'

if (typeof global === 'undefined') {
  window.global = window;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
