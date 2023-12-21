import React, { useState, useEffect } from "react";
import "./Product.css";
import EditProductPopup from "./EditProductPopup";
import ApiUrls from "../APIURL/ApiUrls";

function Product() {
  // const baseApiUrl = "http://192.168.1.37:4005/";
  // const apiUrl = `${baseApiUrl}product/getProduct`;
  // const addProductUrl = `${baseApiUrl}product/addProduct`;
  // const updateProductUrl = `${baseApiUrl}Product/updateProduct`;
  // const deleteProductUrl = `${baseApiUrl}Product/deleteProduct`;
  // const subCategoriesUrl = `${baseApiUrl}sub_category/getSubcategory`;

  const [data, setData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_mrp: "",
    sub_category_id: "",
    disable_mrp: true,
  });
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    product_name: "",
    product_mrp: "",
    sub_category_id: "",
    disable_mrp: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(ApiUrls.GET_PRODUCT);
      if (response.ok) {
        const responseData = await response.json();
        const receivedData = Array.isArray(responseData)
          ? responseData
          : responseData.data;
        setData(receivedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(ApiUrls.GET_SUBCATEGORY);
      if (response.ok) {
        const responseData = await response.json();
        const receivedData = Array.isArray(responseData)
          ? responseData
          : responseData.data;
        setSubCategories(receivedData);
      }
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    }
  };

  const handleEditClick = (
    id,
    product_name,
    product_mrp,
    sub_category_id,
    disable_mrp
  ) => {
    setEditedProduct({
      id,
      product_name,
      product_mrp,
      sub_category_id,
      disable_mrp,
    });
  };

  const handleEditProductName = (e) => {
    setEditedProduct({ ...editedProduct, product_name: e.target.value });
  };

  const handleSaveEditedProduct = async () => {
    if (editedProduct.id === null) {
      return;
    }

    try {
      const response = await fetch(ApiUrls.UPDATE_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editedProduct.id,
          product_name: editedProduct.product_name,
          product_mrp: editedProduct.product_mrp,
          sub_category_id: editedProduct.sub_category_id,
          disable_mrp: editedProduct.disable_mrp,
        }),
      });

      if (response.ok) {
        const updatedData = data.map((product) => {
          if (product.id === editedProduct.id) {
            return {
              ...product,
              product_name: editedProduct.product_name,
              product_mrp: editedProduct.product_mrp,
              sub_category_id: editedProduct.sub_category_id,
              disable_mrp: editedProduct.disable_mrp,
            };
          }
          return product;
        });
        setData(updatedData);
        setEditedProduct({
          id: null,
          product_name: "",
          product_mrp: "",
          sub_category_id: "",
          disable_mrp: true,
        });
        fetchData(); // Fetch updated data after saving
      } else {
        console.error(
          "Failed to update Product. Response status:",
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  const handleRemoveClick = async (id) => {
    try {
      const response = await fetch(ApiUrls.DELETE_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setData(data.filter((product) => product.id !== id));
      } else {
        console.error(
          "Failed to delete Product. Response status:",
          response.status
        );
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
      sub_category_id: "",
      disable_mrp: true,
    });
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch(ApiUrls.ADD_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: newProduct.product_name,
          product_mrp: newProduct.product_mrp,
          sub_category_id: newProduct.sub_category_id,
          disable_mrp: newProduct.disable_mrp,
        }),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setData([...data, addedProduct]);
        handleCancelAddProduct(); // Close the form only after a successful response
        fetchData(); // Fetch updated data after saving
      } else {
        console.error(
          "Failed to add Product. Response status:",
          response.status
        );
        console.error("Response text:", await response.text());
      }
    } catch (error) {
      console.error("Error adding Product:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSubCategories();
  }, []);

  return (
    <div className="Product-container">
      <h1>Product</h1>
      <button className="add-Product" onClick={handleAddProductClick}>
        Add Product
      </button>
      {showAddProductForm && (
        <div className="popup">
          <div className="add-Product-form">
            <h2>Add New Product</h2>
            <select
              className="input-field"
              value={newProduct.sub_category_id}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  sub_category_id: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select Sub-Category
              </option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="input-field"
              placeholder="Product Name"
              value={newProduct.product_name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product_name: e.target.value })
              }
            />
            <input
              type="text"
              className="input-field"
              placeholder="Product MRP"
              value={newProduct.product_mrp}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product_mrp: e.target.value })
              }
            />
            <label>
              Disable MRP:
              <input
                type="checkbox"
                checked={newProduct.disable_mrp}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    disable_mrp: e.target.checked,
                  })
                }
              />
            </label>
            <div className="form-buttons">
              <button className="save-button" onClick={handleSaveProduct}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={handleCancelAddProduct}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="Product-list">
        {data.map((dataObj) => (
          <div className="Product-item" key={dataObj.id}>
            <div>
              <p className="Product-name">{dataObj.product_name}</p>
              <p className="Product-mrp">{dataObj.product_mrp}</p>
              {/* Remove the "Sub-category-id" and "Disable-mrp" information */}
            </div>
            {editedProduct.id === dataObj.id ? (
              <EditProductPopup
              editedProduct={editedProduct}
              handleEditProductName={handleEditProductName}
              handleEditProductMRP={(e) =>
                setEditedProduct({ ...editedProduct, product_mrp: e.target.value })
              }
              handleSaveEditedProduct={handleSaveEditedProduct}
              handleCancelEdit={() => setEditedProduct({
                id: null,
                product_name: "",
                product_mrp: "",
                sub_category_id: "",
                disable_mrp: true,
              })}
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
                      dataObj.sub_category_id,
                      dataObj.disable_mrp
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
