import React, { useState, useEffect } from "react";
import "./Category.css";
import "./CategoryForm.css";
import EditCategoryPopup from "./EditCategoryPopup";

function Category() {
  const apiUrl = "http://192.168.1.34:8000/category/getCategory";
  const addCategoryUrl = "http://192.168.1.34:8000/Category/upload";
  const updateCategoryUrl = "http://192.168.1.34:8000/Category/updateCategory";
  const deleteCategoryUrl = "http://192.168.1.34:8000/Category/deleteCategory";
  const updateCategoryImageUrl = "http://192.168.1.34:8000/Category/updateCategoryImage";

  const [data, setData] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editedCategory, setEditedCategory] = useState({ id: null, name: "" });
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
    setEditedCategory({ id, name });
  }

  const handleEditCategoryName = (e) => {
    setEditedCategory({ ...editedCategory, name: e.target.value });
  }

  const handleSaveEditedCategory = async () => {
    if (editedCategory.id === null) {
      return;
    }

    try {
      const response = await fetch(updateCategoryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editedCategory.id, name: editedCategory.name }),
      });

      if (response.ok) {
        const updatedData = data.map(Category => {
          if (Category.id === editedCategory.id) {
            return { ...Category, name: editedCategory.name };
          }
          return Category;
        });
        setData(updatedData);
        setEditedCategory({ id: null, name: "" });
      } else {
        console.error("Failed to update Category. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  }

  const handleEditCategoryImage = async (file) => {
    if (editedCategory.id === null) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", editedCategory.id);
      formData.append("image", file);

      const response = await fetch(updateCategoryImageUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Category image updated successfully.");
      } else {
        console.error("Failed to update Category image. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating Category image:", error);
    }
  }

  const handleRemoveClick = async (id) => {
    try {
      const response = await fetch(deleteCategoryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setData(data.filter(Category => Category.id !== id));
      } else {
        console.error("Failed to delete Category. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error removing Category:", error);
    }
  }

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
  }

  const handleCancelAddCategory = () => {
    setShowAddCategoryForm(false);
    setNewCategory({
      name: "",
      image: null,
    });
    setImagePreview(null);
    setSelectedService("");
  }

  const handleSaveCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("image", newCategory.image);
      formData.append("service", selectedService);

      const response = await fetch(addCategoryUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setData([...data, addedCategory]);
        handleCancelAddCategory(); // Close the form only after successful response
      } else {
        console.error("Failed to add Category");
      }
    } catch (error) {
      console.error("Error adding Category:", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCategory({ ...newCategory, image: file });

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
    <div>
     <h1>Category</h1>
    <div className="Category">
      <button className="add-Category" onClick={handleAddCategoryClick}>
        Add Category
      </button>
      {showAddCategoryForm && (
        <div className="popup">
          <div className="add-Category-form">
            <h2>Add New Category</h2>
            <input
              type="text"
              className="input-field"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
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
              <button className="save-button" onClick={handleSaveCategory}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={handleCancelAddCategory}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {data.map((dataObj) => (
        <div className="Category-item" key={dataObj.id}>
          <div className="Category-image">
            <img src={"http://192.168.1.34:8000/images/" + dataObj.image} alt={dataObj.name} />
          </div>
          {editedCategory.id === dataObj.id ? (
            <EditCategoryPopup
              editedCategory={editedCategory}
              handleEditCategoryName={handleEditCategoryName}
              handleSaveEditedCategory={handleSaveEditedCategory}
              handleEditCategoryImage={handleEditCategoryImage}
            />
          ) : (
            <div>
              <p className="Category-name">{dataObj.name}</p>
              <p className="Service-name">Service: {dataObj.service_name}</p>
            </div>
          )}
          <button className="Category-edit" onClick={() => handleEditClick(dataObj.id, dataObj.name)}>
            Edit
          </button>
          <button className="Category-remove" onClick={() => handleRemoveClick(dataObj.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}


export default Category;
