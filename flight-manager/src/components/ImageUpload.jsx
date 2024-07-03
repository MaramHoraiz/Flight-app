// src/components/ImageUpload.js
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const ImageUpload = ({ onImageChange }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // if (!file.type.startsWith("image/")) {
      //   setError("Only image files are allowed.");
      //   return;
      // }
      const base64 = await convertBase64(file);
      debugger
      console.log(base64);
      setError(null);
      setPreview(URL.createObjectURL(file));
      onImageChange(base64);
    }
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div style={{ margin: "1rem" }}>
      <input
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        id="file-input"
        onChange={handleImageChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Upload Photo
        </Button>
      </label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ marginTop: 10, width: "100%", maxHeight: 300 }}
        />
      )}
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default ImageUpload;
