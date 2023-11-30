import React, { useState, useEffect } from "react";
import "./Service.css";
import "./ServiceForm.css";
import EditServicePopup from "./EditServicePopup";

function Service() {
  const baseApiUrl = "http://192.168.1.40:8000/";
  const url = `${baseApiUrl}service/getService`;
  const addServiceUrl = `${baseApiUrl}service/upload`;
  const updateServiceUrl = `${baseApiUrl}service/updateService`;
  const deleteServiceUrl = `${baseApiUrl}service/deleteService`;
  const updateServiceImageUrl = `${baseApiUrl}service/updateServiceImage`;

  const [data, setData] = useState([]);
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editedService, setEditedService] = useState({ id: null, name: "" });

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (id, name) => {
    setEditedService({ id, name });
  };

  const handleEditServiceName = (e) => {
    setEditedService({ ...editedService, name: e.target.value });
  };

  const handleSaveEditedService = async () => {
    if (editedService.id === null) {
      return;
    }

    try {
      const response = await fetch(updateServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editedService.id, name: editedService.name }),
      });

      if (response.ok) {
        const updatedData = data.map((service) => {
          if (service.id === editedService.id) {
            return { ...service, name: editedService.name };
          }
          return service;
        });
        setData(updatedData);
        setEditedService({ id: null, name: "" });
      } else {
        console.error("Failed to update service. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleEditServiceImage = async (file) => {
    if (editedService.id === null) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", editedService.id);
      formData.append("image", file);

      const response = await fetch(updateServiceImageUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Service image updated successfully.");
      } else {
        console.error("Failed to update service image. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating service image:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedService({ id: null, name: "" });
  };

  const handleRemoveClick = async (id) => {
    try {
      const response = await fetch(deleteServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setData(data.filter((service) => service.id !== id));
      } else {
        console.error("Failed to delete service. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error removing service:", error);
    }
  };

  const handleAddServiceClick = () => {
    setShowAddServiceForm(true);
  };
  

  const handleCancelAddService = () => {
    setShowAddServiceForm(false);
    setNewService({
      name: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleSaveService = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newService.name);
      formData.append("image", newService.image);

      const response = await fetch(addServiceUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedService = await response.json();
        setData([...data, addedService]);
        handleCancelAddService();
      } else {
        console.error("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewService({ ...newService, image: file });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Service">
      <h1>Service</h1>
      <button className="add-service" onClick={handleAddServiceClick}>
        Add Service
      </button>
      {showAddServiceForm && (
        <div className="popup">
          <div className="add-service-form">
            <h2>Add New Service</h2>
            <input
              type="text"
              className="input-field"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="input-field"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Selected" className="image-preview" />
            )}
            <div className="form-buttons">
              <button className="save-button" onClick={handleSaveService}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={handleCancelAddService}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {data.map((dataObj) => (
        <div className="service-item" key={dataObj.id}>
          <div className="service-image">
            <img src={"http://192.168.1.40:8000/images/" + dataObj.image} alt={dataObj.name} />
          </div>
          {editedService.id === dataObj.id ? (
            <EditServicePopup
              editedService={editedService}
              handleEditServiceName={handleEditServiceName}
              handleSaveEditedService={handleSaveEditedService}
              handleEditServiceImage={handleEditServiceImage}
              handleCancelEdit={handleCancelEdit}
            />
          ) : (
            <div key={`service-info-${dataObj.id}`}>
              <p className="service-name">{dataObj.name}</p>
            </div>
          )}
          <button className="service-edit" onClick={() => handleEditClick(dataObj.id, dataObj.name)}>
            Edit
          </button>
          <button className="service-remove" onClick={() => handleRemoveClick(dataObj.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Service;
