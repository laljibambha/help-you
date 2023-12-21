import React, { useState, useEffect } from "react";
import "./Sub_Category.css";
import "./Sub_CategoryForm.css";
import EditSubCategoryPopup from "./EditSubCategoryPopup";
import ApiUrls from "../APIURL/ApiUrls";

function SubCategory() {
  const baseApiUrl = "http://192.168.1.37:4005/";
  const apiUrl = `${baseApiUrl}sub_category/getSubcategory`;
  const addSubCategoryUrl = `${baseApiUrl}sub_category/upload`;
  const updateSubCategoryUrl =
    `${baseApiUrl}sub_category/updateSubcategory`;
  const deleteSubCategoryUrl =
    `${baseApiUrl}sub_category/deleteSubcategory`;
  const updateSubCategoryImageUrl =
    `${baseApiUrl}sub_category/updatesub_categoryImage`;
  const categoriesUrl = `${baseApiUrl}category/getCategory`;

  const [data, setData] = useState([]);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    image: null,
    categoryId: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editedSubCategory, setEditedSubCategory] = useState({
    id: null,
    name: "",
  });
  const [categories, setCategories] = useState([]);

  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        const receivedData = Array.isArray(responseData)
          ? responseData
          : responseData.data;
        setter(receivedData);
      } else {
        console.error(`Error fetching data from ${url}. Response status:`, response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  const handleEditClick = (id, name) => {
    setEditedSubCategory({ id, name });
  };

  const handleEditSubCategoryName = (e) => {
    setEditedSubCategory({ ...editedSubCategory, name: e.target.value });
  };

  const handleSaveEditedSubCategory = async () => {
    if (editedSubCategory.id === null) {
      return;
    }

    try {
      const response = await fetch(ApiUrls.UPDATE_SUBCATEGORY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editedSubCategory.id,
          name: editedSubCategory.name,
        }),
      });

      if (response.ok) {
        const updatedData = data.map((subCategory) => {
          if (subCategory.id === editedSubCategory.id) {
            return { ...subCategory, name: editedSubCategory.name };
          }
          return subCategory;
        });
        setData(updatedData);
        setEditedSubCategory({ id: null, name: "" });
      } else {
        console.error(
          "Failed to update SubCategory. Response status:",
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating SubCategory:", error);
    }
  };

  const handleEditSubCategoryImage = async (file) => {
    if (editedSubCategory.id === null) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", editedSubCategory.id);
      formData.append("image", file);

      const response = await fetch(ApiUrls.UPDATE_SUBCATEGORY_IMAGE, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("SubCategory image updated successfully.");
      } else {
        console.error(
          "Failed to update SubCategory image. Response status:",
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating SubCategory image:", error);
    }
  };

  const handleRemoveClick = async (id) => {
    try {
      const response = await fetch(ApiUrls.DELETE_SUBCATEGORY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setData(data.filter((subCategory) => subCategory.id !== id));
        console.log(`Subcategory with id ${id} removed successfully.`);
      } else {
        console.error(
          `Failed to delete SubCategory with id ${id}. Response status:`,
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error removing SubCategory:", error);
    }
  };

  const handleAddSubCategoryClick = () => {
    setShowAddSubCategoryForm(true);
  };

  const handleCancelEdit = () => {
    setShowAddSubCategoryForm(false);
    setEditedSubCategory({
      id: null,
      name: "",
    });
  };

  const handleSaveSubCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newSubCategory.name);
      formData.append("image", newSubCategory.image);
      formData.append("category_id", newSubCategory.categoryId);

      const response = await fetch(ApiUrls.ADD_SUBCATEGORY, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedSubCategory = await response.json();
        setData([...data, addedSubCategory]);
        handleCancelEdit(); // Close the form only after a successful response
      } else {
        console.error("Failed to add SubCategory");
      }
    } catch (error) {
      console.error("Error adding SubCategory:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewSubCategory({ ...newSubCategory, image: file });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    fetchData(ApiUrls.GET_SUBCATEGORY, setData);
    fetchData(ApiUrls.GET_CATEGORY, setCategories);
  }, [ApiUrls.GET_SUBCATEGORY, ApiUrls.GET_CATEGORY]);

  return (
    <div className="sub-category-container">
      <h1>SubCategory</h1>
      <div className="sub-category">
        <button
          className="add-sub-category"
          onClick={handleAddSubCategoryClick}
        >
          Add SubCategory
        </button>
        {showAddSubCategoryForm && (
          <div className="popup">
            <div className="add-sub-category-form">
              <h2>Add New SubCategory</h2>
              <select
                className="input-field"
                value={newSubCategory.categoryId}
                onChange={(e) =>
                  setNewSubCategory({
                    ...newSubCategory,
                    categoryId: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="image-preview"
                />
              )}
              <div className="form-buttons">
                <button className="save-button" onClick={handleSaveSubCategory}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancelEdit}
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
              {dataObj.image && (
                <img
                  src={`${ApiUrls.BASE_URL}images/${dataObj.image}`}
                  alt={dataObj.name}
                />
              )}
            </div>
            {editedSubCategory.id === dataObj.id ? (
              <EditSubCategoryPopup
                editedSubCategory={editedSubCategory}
                handleEditSubCategoryName={handleEditSubCategoryName}
                handleSaveEditedSubCategory={handleSaveEditedSubCategory}
                handleEditSubCategoryImage={handleEditSubCategoryImage}
                handleCancelEdit={handleCancelEdit} // Rename function
              />
            ) : (
              <div>
                <p className="sub-category-name">{dataObj.name}</p>
                <p className="category-name">
                  Category: {dataObj.category_name}
                </p>
              </div>
            )}
            <div>
            <button
              className="sub-category-edit"
              onClick={() => handleEditClick(dataObj.id, dataObj.name)}
            >
              Edit
            </button>
            <button
              className="sub-category-remove"
              onClick={() => handleRemoveClick(dataObj.id)}
            >
              Remove
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategory;
