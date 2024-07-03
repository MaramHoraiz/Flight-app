// src/App.js or src/index.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./context/ThemeContext";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import FlightList from "./pages/FlightList";
import AddFlightPage from "./pages/AddFlight";
import BadRequest from "./pages/BadRequest";
import Register from "./pages/Register";
import Login from "./pages/Login";
const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bad-request" element={<BadRequest />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <FlightList />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-flight"
              element={
                <PrivateRoute>
                  <AddFlightPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
