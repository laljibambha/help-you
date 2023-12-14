import React from "react";
import "./EditProductPopup.css";

function EditProductPopup({
  editedProduct,
  handleEditProductName,
  handleSaveEditedProduct,
  handleEditProductMRP, // Assuming this function is for editing MRP
  handleCancelEdit,
}) {
  const handleSave = () => {
    handleSaveEditedProduct();
    // If needed, you can include the logic for handling product MRP here
    // handleEditProductMRP();
  };

  return (
    <div className="edit-product-popup">
      <div className="popup-content">
        <h2>Edit Product</h2>
        <input
          type="text"
          className="input-field"
          value={editedProduct.product_name}
          onChange={handleEditProductName}
        />
        <input
          type="text"
          className="input-field"
          value={editedProduct.product_mrp}
          onChange={handleEditProductMRP} // Assuming this function is for editing MRP
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

export default EditProductPopup;
