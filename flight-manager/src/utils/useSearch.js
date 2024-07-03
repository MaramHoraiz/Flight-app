// src/hooks/useSearch.js
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import { validateCode } from '../utils/validateParams';

const useSearch = (initialSearch, page, pageSize, fetchFlights) => {
  const [search, setSearch] = useState(initialSearch);
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (validateCode(value)) {
      setSearchError(null);
      debounceUpdateSearchParams(value);
    } else {
      setSearchError("Invalid code format");
    }
  };

  const debounceUpdateSearchParams = useCallback(
    debounce((value) => {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("search", value);
      navigate({ search: urlParams.toString() });
      fetchFlights(page, pageSize, value);
    }, 500), [page, pageSize, navigate, location.search]
  );

  return {
    search,
    searchError,
    handleSearchChange
  };
};

export default useSearch;
