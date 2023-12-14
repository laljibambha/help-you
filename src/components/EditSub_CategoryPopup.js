import React from "react";
import "./EditSub_CategoryPopup.css"; // Assuming you have a corresponding CSS file

function EditSub_CategoryPopup({
  editedSubCategory,
  handleEditSubCategoryName,
  handleSaveEditedSubCategory,
  handleEditSubCategoryImage, // New function for image update
}) {
  return (
    <div className="edit-subcategory-popup">
      <div className="popup-content">
        <h2>Edit SubCategory</h2>
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
          onChange={(e) => handleEditSubCategoryImage(e.target.files[0])} // Pass the selected file to handleEditSubCategoryImage
        /> 

        <div className="button-container">
          <button className="save-button" onClick={handleSaveEditedSubCategory}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSub_CategoryPopup;
