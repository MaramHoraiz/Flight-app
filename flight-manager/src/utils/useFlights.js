// src/hooks/useFlights.js
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";
import FlightService from "../services/FlightService";
import { validateParams } from "../utils/validateParams";

const useFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchFlights = async (page, pageSize) => {
    // if (!AuthService.isLoggedIn()) {
    //   try {
    //     await AuthService.login('john@doe.com', 'string');
    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //     return;
    //   }
    // }

    setLoading(true);
    try {
      const data = await FlightService.getFlights(page, pageSize);
      setFlights(data.resources);
      setTotalPages(Math.ceil(data.count / pageSize));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let pageParam = parseInt(urlParams.get("page") || "1", 10);
    let pageSizeParam = parseInt(urlParams.get("pageSize") || "10", 10);
    if (urlParams.size > 0) {
      pageParam = urlParams.get("page");
      pageSizeParam = urlParams.get("pageSize");
      if (!validateParams(pageParam, pageSizeParam)) {
        return navigate("/bad-request");
      }
    }
    if (!validateParams(pageParam, pageSizeParam)) {
      navigate("/bad-request");
      return;
    }

    setPage(pageParam);
    setPageSize(pageSizeParam);
    fetchFlights(pageParam, pageSizeParam);
  }, [location.search, navigate]);

  const handleDeleteFlight = async (flightId) => {
    try {
      await FlightService.deleteFlight(flightId);
      fetchFlights(page, pageSize);
    } catch (error) {
      console.error("Failed to delete flight:", error);
      setError(error);
    }
  };
  const handleEditFlight = async (flightId,formData) => {
  try {
      await FlightService.updateFlight(flightId, formData);
      fetchFlights(page, pageSize);
    } catch (err) {
      setError('Failed to update flight. Please make sure the code is unique.');
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", value);
    urlParams.set("pageSize", pageSize);
    navigate({ search: urlParams.toString() });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("pageSize", event.target.value);
    urlParams.set("page", 1);
    navigate({ search: urlParams.toString() });
  };

  return {
    flights,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    handleDeleteFlight,
    handleEditFlight,
  };
};

export default useFlights;
