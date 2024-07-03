// src/components/PaginationControls.js

import React from "react";
import { Pagination, Select, MenuItem } from "@mui/material";

const PaginationControls = ({
  totalPages,
  page,
  onPageChange,
  handlePageSizeChange,
  pageSize,
}) => {
  return (
    <>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
      <div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Page size:"
          value={pageSize}
          onChange={handlePageSizeChange}
          style={{ marginLeft: "10px", height: "60%" }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </div>
    </>
  );
};

export default PaginationControls;
