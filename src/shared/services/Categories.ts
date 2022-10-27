import {ENDPOINTS, HTTP_CLIENT} from '../exporter';

export const getCategoryProducts = (params: any) => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.GET_CATEGORY_PRODUCTS}?page=${params.page}`,
    params,
  );
};

