import React from "react";
import "./EditServicePopup.css";

function EditServicePopup({
  editedService,
  handleEditServiceName,
  handleSaveEditedService,
  handleEditServiceImage, // New function for image update
}) {
  return (
    <div className="edit-service-popup">
      <div className="popup-content">
        <h2>Edit Service</h2>
        <input
          type="text"
          className="input-field"
          value={editedService.name}
          onChange={handleEditServiceName}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="input-field"
          onChange={(e) => handleEditServiceImage(e.target.files[0])} // Pass the selected file to handleEditServiceImage
        />

        <div className="button-container">
          <button className="save-button" onClick={handleSaveEditedService}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditServicePopup;
