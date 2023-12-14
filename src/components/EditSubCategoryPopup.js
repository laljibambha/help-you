import React from "react";
import "./EditSubCategoryPopup.css";

function EditSubCategoryPopup({
  editedSubCategory,
  handleEditSubCategoryName,
  handleSaveEditedSubCategory,
  handleEditSubCategoryImage,
  handleCancelEdit, // Added this function
}) {
  const handleSave = () => {
    handleSaveEditedSubCategory();
    handleEditSubCategoryImage();
  };

  return (
    <div className="edit-subcategory-popup">
      <div className="popup-content">
        <h2>Edit Sub-Category</h2>
        <input
          type="text"
          className="input-field"
          value={editedSubCategory.name}
          onChange={handleEditSubCategoryName}
        /> 
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="input-field"
          onChange={(e) => handleEditSubCategoryImage(e.target.files[0])}
        />
        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSubCategoryPopup;
