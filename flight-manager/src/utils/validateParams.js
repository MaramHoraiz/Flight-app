// src/utils/validateParams.js
export const validateParams = (page, pageSize) => {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(pageSize, 10);
    return Number.isInteger(pageNum) && pageNum > 0 && Number.isInteger(sizeNum) && sizeNum > 0;
  };
  