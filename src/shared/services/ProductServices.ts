import {ENDPOINTS, HTTP_CLIENT} from '../exporter';

const getCategoryProducts = (params: any) => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.GET_CATEGORY_PRODUCTS}?page=${params.page}`,
    params,
  );
};
const getProductsListing = (params: any) => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.PRODUCT_LISTING}?sort_by=${params.sort_by}&sort_order=${params.sort_order}`,
    params,
  );
};

const getProductDetails = (id:any)=>{
  // console.log('servicccc',id);
  return HTTP_CLIENT.get(
    `${ENDPOINTS.PRODUCT_DETAIL}/${id}`,
  );
}

export {
  getCategoryProducts,
  getProductsListing,
  getProductDetails
};