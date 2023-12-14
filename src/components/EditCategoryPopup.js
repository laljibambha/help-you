import React from "react";
import "./EditCategoryPopup.css";

function EditCategoryPopup({ 
  editedCategory,
  handleEditCategoryName,
  handleSaveEditedCategory,
  handleEditCategoryImage,
  handleCancelEditCategory, // New function for cancel
}) {
  return (
    <div className="edit-category-popup">
      <div className="popup-content">
        <h2>Edit Category</h2>
        <input
          type="text"
          className="input-field"
          value={editedCategory.name}
          onChange={handleEditCategoryName}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="input-field"
          onChange={(e) => handleEditCategoryImage(e.target.files[0])}
        />

        <div className="button-container">
          <button className="save-button" onClick={handleSaveEditedCategory}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancelEditCategory}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryPopup;
