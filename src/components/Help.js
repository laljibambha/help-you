// Help.js
import React, { useState, useEffect } from "react";
import "./Help.css"; 
import ApiUrls from "../APIURL/ApiUrls";

function Help() {
  // const baseApiUrl = "http://192.168.1.37:4005/";
  // const apiUrl = `${baseApiUrl}help/getHelp`;
  const [helpData, setHelpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiUrls.GET_HELP);

        if (response.ok) {
          const responseData = await response.json();
          setHelpData(responseData);
        } else {
          console.error(
            "Failed to fetch help data. Response status:",
            response.status
          );
          console.error("Response text:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching help data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="help-container">
      <h2>Help</h2>
      <table className="help-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {helpData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.mobile}</td>
              <td>{row.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Help;
