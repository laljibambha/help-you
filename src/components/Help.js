// Help.js
import React, { useState, useEffect } from "react";
import "./Help.css"; // Import your CSS file

function Help() {
  const apiUrl = "http://helpyouservice.in:4005/help/getHelp";
  const [helpData, setHelpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const responseData = await response.json();
          setHelpData(responseData);
        } else {
          console.error("Failed to fetch help data. Response status:", response.status);
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
