import React, { useState, useEffect } from "react";
import "./User.css";

function User() {
  const baseApiUrl = "http://192.168.1.40:8000/";
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const apiUrl = `${baseApiUrl}user/getUser?page=${page}`;
      console.log("API URL:", apiUrl);

      // Making a POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You may need to add other headers like authorization if required
        },
        // You can add a request body if needed
        // body: JSON.stringify({ key: "value" }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.data); // Assuming user data is stored in the 'data' property
        setError(null);
      } else {
        // Handle non-2xx HTTP responses
        setError(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      // Handle network errors and other exceptions
      setError(`Error fetching user data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getImageUrl = (imageName) => `${baseApiUrl}images/${imageName}`;

  return (
    <div className="User">
      <h1 className="user-h1">User</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userData.length > 0 && (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Country Code</th>
                <th>Mobile</th>
                <th>WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className="user-image">
                    {row.image_url ? (
                      <img
                        className="user-image"
                        src={getImageUrl(row.image_url)}
                        alt={row.name}
                      />
                    ) : (
                      <p>No image</p>
                    )}
                  </td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.country_code}</td>
                  <td>{row.mobile}</td>
                  <td>{row.whatsapp_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
}

export default User;
