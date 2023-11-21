import React, { useState, useEffect } from "react";
import "./Category.css";
import "./CategoryForm.css";

function Category() {
  const getCategoriesUrl = "http://192.168.1.34:8000/category/getCategories";
  const addCategoryUrl = "http://192.168.1.34:8000/category/addCategory";
  const updateCategoryUrl = "http://192.168.1.34:8000/category/updateCategory";
  const deleteCategoryUrl = "http://192.168.1.34:8000/category/deleteCategory";

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    serviceId: null,
    image: null,
  });
  const [editedCategory, setEditedCategory] = useState({ id: null, name: "" });

  const fetchCategories = async () => {
    try {
      const response = await fetch(getCategoriesUrl);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("http://192.168.1.34:8000/service/getService");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleEditClick = (id, name) => {
    setEditedCategory({ id, name });
  };

  const handleEditCategoryName = (e) => {
    setEditedCategory({ ...editedCategory, name: e.target.value });
  };

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
        body: JSON.stringify({
          id: editedCategory.id,
          name: editedCategory.name,
        }),
      });

      if (response.ok) {
        const updatedCategories = categories.map((category) => {
          if (category.id === editedCategory.id) {
            return { ...category, name: editedCategory.name };
          }
          return category;
        });
        setCategories(updatedCategories);
        setEditedCategory({ id: null, name: "" });
      } else {
        console.error(
          "Failed to update category. Response status:",
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

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
        setCategories(categories.filter((category) => category.id !== id));
      } else {
        console.error(
          "Failed to delete category. Response status:",
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
  };

  const handleCancelAddCategory = () => {
    setShowAddCategoryForm(false);
    setNewCategory({
      name: "",
      serviceId: null,
      image: null,
    });
  };

  const handleSaveCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("serviceId", newCategory.serviceId);
      formData.append("image", newCategory.image);

      const response = await fetch(addCategoryUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);
        handleCancelAddCategory();
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCategory({ ...newCategory, image: file });
  };

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  return (
    <div className="Category">
      <button className="add-category" onClick={handleAddCategoryClick}>
        Add Category
      </button>
      {showAddCategoryForm && (
        <div className="popup">
          <div className="add-category-form">
            <h2>Add New Category</h2>
            <select
              className="input-field"
              value={newCategory.serviceId}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  serviceId: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select Service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
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
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="form-buttons">
              <button
                className="save-button"
                onClick={() => {
                  handleSaveCategory();
                  document.getElementById("service-section").scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
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
      {categories.map((category) => (
        <div className="category-item" key={category.id}>
          <p className="category-name">{category.name}</p>
          <button
            className="category-edit"
            onClick={() => handleEditClick(category.id, category.name)}
          >
            Edit
          </button>
          <button
            className="category-remove"
            onClick={() => handleRemoveClick(category.id)}
          >
            Remove
          </button>
        </div>
      ))}
       <div className="services-section">
        <ul>
          {services.map((service) => (
            <li key={service.id}>{service.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;