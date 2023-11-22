import React, { useState, useEffect } from "react";
import "./Product.css";
import EditProductPopup from "./EditProductPopup";

function Product() {
  const apiUrl = "http://192.168.1.40:8000/product/getProduct";
  const addProductUrl = "http://192.168.1.40:8000/Product/upload";
  const updateProductUrl = "http://192.168.1.40:8000/Product/updateProduct";
  const deleteProductUrl = "http://192.168.1.40:8000/Product/deleteProduct";

  const [data, setData] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_mrp: "",
    sub_category_name: "",
  });
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    product_name: "",
    product_mrp: "",
    sub_category_name: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const responseData = await response.json();
        const receivedData = Array.isArray(responseData) ? responseData : responseData.data;
        setData(receivedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (id, product_name, product_mrp, sub_category_name) => {
    setEditedProduct({ id, product_name, product_mrp, sub_category_name });
  };

  const handleEditProductName = (e) => {
    setEditedProduct({ ...editedProduct, product_name: e.target.value });
  };

  const handleSaveEditedProduct = async () => {
    if (editedProduct.id === null) {
      return;
    }

    try {
      const response = await fetch(updateProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editedProduct.id,
          product_name: editedProduct.product_name,
          product_mrp: editedProduct.product_mrp,
          sub_category_name: editedProduct.sub_category_name,
        }),
      });

      if (response.ok) {
        const updatedData = data.map((product) => {
          if (product.id === editedProduct.id) {
            return {
              ...product,
              product_name: editedProduct.product_name,
              product_mrp: editedProduct.product_mrp,
              sub_category_name: editedProduct.sub_category_name,
            };
          }
          return product;
        });
        setData(updatedData);
        setEditedProduct({
          id: null,
          product_name: "",
          product_mrp: "",
          sub_category_name: "",
        });
      } else {
        console.error("Failed to update Product. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  const handleRemoveClick = async (id) => {
    try {
      const response = await fetch(deleteProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setData(data.filter((product) => product.id !== id));
      } else {
        console.error("Failed to delete Product. Response status:", response.status);
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error removing Product:", error);
    }
  };

  const handleAddProductClick = () => {
    setShowAddProductForm(true);
  };

  const handleCancelAddProduct = () => {
    setShowAddProductForm(false);
    setNewProduct({
      product_name: "",
      product_mrp: "",
      sub_category_name: "",
    });
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch(addProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: newProduct.product_name,
          product_mrp: newProduct.product_mrp,
          sub_category_name: newProduct.sub_category_name,
        }),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setData([...data, addedProduct]);
        handleCancelAddProduct(); // Close the form only after a successful response
      } else {
        console.error("Failed to add Product");
      }
    } catch (error) {
      console.error("Error adding Product:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Product-container">
      <button className="add-Product" onClick={handleAddProductClick}>
        Add Product
      </button>
      {showAddProductForm && (
        <div className="popup">
          <div className="add-Product-form">
            <h2>Add New Product</h2>
            <input
              type="text"
              className="input-field"
              placeholder="Product Name"
              value={newProduct.product_name}
              onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Product MRP"
              value={newProduct.product_mrp}
              onChange={(e) => setNewProduct({ ...newProduct, product_mrp: e.target.value })}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Sub Category Name"
              value={newProduct.sub_category_name}
              onChange={(e) => setNewProduct({ ...newProduct, sub_category_name: e.target.value })}
            />
            <div className="form-buttons">
              <button className="save-button" onClick={handleSaveProduct}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelAddProduct}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="Product-list">
        {data.map((dataObj) => (
          <div className="Product-item" key={dataObj.id}>
            <div className="Product-details">
              <p className="Product-name">{dataObj.product_name}</p>
              <p className="Product-mrp">{dataObj.product_mrp}</p>
              <p className="Sub-category-name">{dataObj.sub_category_name}</p>
            </div>
            {editedProduct.id === dataObj.id ? (
              <EditProductPopup
                editedProduct={editedProduct}
                handleEditProductName={handleEditProductName}
                handleSaveEditedProduct={handleSaveEditedProduct}
              />
            ) : (
              <div className="Product-actions">
                <button
                  className="Product-edit"
                  onClick={() =>
                    handleEditClick(
                      dataObj.id,
                      dataObj.product_name,
                      dataObj.product_mrp,
                      dataObj.sub_category_name
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className="Product-remove"
                  onClick={() => handleRemoveClick(dataObj.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
