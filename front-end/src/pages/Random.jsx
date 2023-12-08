import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Random() {
  const [title, setTitle] = useState(null);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(`/api/w/random`);
        console.log(response.data);
        setTitle(response.data);
      } catch (error) {
        console.log("error: ");
        console.log(error);
      }
    };
    getMessage();
  }, []);

  if (!title) {
    return (
      <div style={{ display: "block" }}>
        <h1>redirecting</h1>
      </div>
    );
  }
  return (
    <div>
      <Navigate to={`/w/${title}`} />
    </div>
  );
}
