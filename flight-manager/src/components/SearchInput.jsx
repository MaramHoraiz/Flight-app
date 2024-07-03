// src/components/SearchInput.js
import React from 'react';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useSearch from '../utils/useSearch';

const SearchInput = ({ initialSearch, page, pageSize, fetchFlights }) => {
  const { search, searchError, handleSearchChange } = useSearch(initialSearch, page, pageSize, fetchFlights);

  return (
    <TextField
      label="Search by code"
      value={search}
      onChange={handleSearchChange}
      error={!!searchError}
      helperText={searchError}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
