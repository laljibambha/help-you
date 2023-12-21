class ApiUrls {
  static BASE_URL = "http://192.168.1.37:4005/";
  static LOGIN = `${ApiUrls.BASE_URL}admin/login`
  static GET_SERVICE = `${ApiUrls.BASE_URL}service/getService`;
  static ADD_SERVICE = `${ApiUrls.BASE_URL}service/upload`;
  static UPDATE_SERVICE = `${ApiUrls.BASE_URL}service/updateService`;
  static DELETE_SERVICE = `${ApiUrls.BASE_URL}service/deleteService`;
  static UPDATE_SERVICE_IMAGE = `${ApiUrls.BASE_URL}service/updateServiceImage`;
  static GET_CATEGORY = `${ApiUrls.BASE_URL}category/getCategory`
  static ADD_CATEGORY = `${ApiUrls.BASE_URL}category/upload`
  static UPDATE_CATEGORY = `${ApiUrls.BASE_URL}category/updateCategory`
  static DELETE_CATEGORY = `${ApiUrls.BASE_URL}category/deleteCategory`
  static UPDATE_CATEGORY_IMAGE = `${ApiUrls.BASE_URL}category/updateCategoryImage`
  static GET_SUBCATEGORY = `${ApiUrls.BASE_URL}sub_category/getSubcategory`
  static ADD_SUBCATEGORY = `${ApiUrls.BASE_URL}sub_category/upload`
  static UPDATE_SUBCATEGORY = `${ApiUrls.BASE_URL}sub_category/updateSubcategory`
  static DELETE_SUBCATEGORY = `${ApiUrls.BASE_URL}sub_category/deleteSubcategory`
  static UPDATE_SUBCATEGORY_IMAGE = `${ApiUrls.BASE_URL}sub_category/updatesub_categoryImage`
  static GET_PRODUCT = `${ApiUrls.BASE_URL}product/getProduct`
  static ADD_PRODUCT = `${ApiUrls.BASE_URL}product/addProduct`
  static UPDATE_PRODUCT = `${ApiUrls.BASE_URL}Product/updateProduct`
  static DELETE_PRODUCT = `${ApiUrls.BASE_URL}Product/deleteProduct`
  static GET_ORDER = `${ApiUrls.BASE_URL}order/GetOrders`
  // static GET_USER = `${ApiUrls.BASE_URL}user/getUser`
  static GET_HELP = `${ApiUrls.BASE_URL}help/gethelp`
  // Add more post-related endpoints as needed
}

export default ApiUrls;
