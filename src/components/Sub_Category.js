// SubCategory.js

import React, { useState, useEffect } from "react";
import "./Sub_Category.css";
import "./Sub_CategoryForm.css";
import EditSub_CategoryPopup from "./EditSub_CategoryPopup";

function SubCategory() {
  const apiUrl = "http://192.168.1.34:8000/sub_category/getSubcategory";
  const addSubCategoryUrl = "http://192.168.1.34:8000/sub_category/upload";
  const updateSubCategoryUrl = "http://192.168.1.34:8000/sub_category/updatesub_category";
  const deleteSubCategoryUrl = "http://192.168.1.34:8000/sub_category/deletesub_category";
  const updateSubCategoryImageUrl = "http://192.168.1.34:8000/sub_category/updatesub_categoryImage";

  const [data, setData] = useState([]);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editedSubCategory, setEditedSubCategory] = useState({ id: null, name: "" });
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const responseData = await response.json();

        // Assuming the API response is an array or an object with a property containing the array
        const receivedData = Array.isArray(responseData) ? responseData : responseData.data;

        setData(receivedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (id, name) => {
    setEditedSubCategory({ id, name });
  }

  const handleEditSubCategoryName = (e) => {
    setEditedSubCategory({ ...editedSubCategory, name: e.target.value });
  }

  const handleSaveEditedSubCategory = async () => {
    if (editedSubCategory.id === null) {
      return;
    }

    try {
      const response = await fetch(updateSubCategoryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editedSubCategory.id, name: editedSubCategory.name }),
      });

      if (response.ok) {
        const updatedData = data.map(subCategory => {
          if (subCategory.id === editedSubCategory.id) {
            return { ...subCategory, name: editedSubCategory.name };
          }
          return subCategory;
        });
        setData(updatedData);
        setEditedSubCategory({ id: null, name: "" });
      } else {
        console.error("Failed to update SubCategory. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating SubCategory:", error);
    }
  }

  const handleEditSubCategoryImage = async (file) => {
    if (editedSubCategory.id === null) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", editedSubCategory.id);
      formData.append("image", file);

      const response = await fetch(updateSubCategoryImageUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("SubCategory image updated successfully.");
      } else {
        console.error("Failed to update SubCategory image. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating SubCategory image:", error);
    }
  }

  const handleRemoveClick = async (id) => {
    try {
      const response = await fetch(deleteSubCategoryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setData(data.filter(subCategory => subCategory.id !== id));
      } else {
        console.error("Failed to delete SubCategory. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error removing SubCategory:", error);
    }
  }

  const handleAddSubCategoryClick = () => {
    setShowAddSubCategoryForm(true);
  }

  const handleCancelAddSubCategory = () => {
    setShowAddSubCategoryForm(false);
    setNewSubCategory({
      name: "",
      image: null,
    });
    setImagePreview(null);
    setSelectedService("");
  }

  const handleSaveSubCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newSubCategory.name);
      formData.append("image", newSubCategory.image);
      formData.append("service", selectedService);

      const response = await fetch(addSubCategoryUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedSubCategory = await response.json();
        setData([...data, addedSubCategory]);
        handleCancelAddSubCategory(); // Close the form only after a successful response
      } else {
        console.error("Failed to add SubCategory");
      }
    } catch (error) {
      console.error("Error adding SubCategory:", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewSubCategory({ ...newSubCategory, image: file });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }

  const fetchServices = async () => {
    const servicesUrl = "http://192.168.1.34:8000/service/getService";

    try {
      const response = await fetch(servicesUrl);
      if (response.ok) {
        const servicesData = await response.json();
        setServices(servicesData);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchServices();
  }, []);

  return (
    <div className="sub-category-container">
    <div className="sub-category">
      <button className="add-sub-category" onClick={handleAddSubCategoryClick}>
        Add SubCategory
      </button>
        {showAddSubCategoryForm && (
          <div className="popup">
            <div className="add-sub-category-form">
              <h2>Add New SubCategory</h2>
              <input
                type="text"
                className="input-field"
                placeholder="SubCategory Name"
                value={newSubCategory.name}
                onChange={(e) =>
                  setNewSubCategory({ ...newSubCategory, name: e.target.value })
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
              <select
                className="input-field"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="" disabled>Select Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <div className="form-buttons">
                <button className="save-button" onClick={handleSaveSubCategory}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancelAddSubCategory}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
       {data.map((dataObj) => (
          <div className="sub-category-item" key={dataObj.id}>
            <div className="sub-category-image">
              <img src={`http://192.168.1.34:8000/images/${dataObj.image}`} alt={dataObj.name} />
            </div>
            {editedSubCategory.id === dataObj.id ? (
              <EditSub_CategoryPopup
                editedSubCategory={editedSubCategory}
                handleEditSubCategoryName={handleEditSubCategoryName}
                handleSaveEditedSubCategory={handleSaveEditedSubCategory}
                handleEditSubCategoryImage={handleEditSubCategoryImage}
              />
            ) : (
              <div>
                <p className="sub-category-name">{dataObj.name}</p>
                <p className="category-name">Category: {dataObj.category_name}</p>
              </div>
            )}
            <button className="sub-category-edit" onClick={() => handleEditClick(dataObj.id, dataObj.name)}>
              Edit
            </button>
            <button className="sub-category-remove" onClick={() => handleRemoveClick(dataObj.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategory;
