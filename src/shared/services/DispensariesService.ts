import {ENDPOINTS, HTTP_CLIENT} from '../exporter';

export const getDispensaryDetails = (id: any) => {  
  return HTTP_CLIENT.get(
    `${ENDPOINTS.DISPENSARY_DETAIL}/${id}`,
  );
};

export const scanDispensaryQR = (params: any) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.SCAN_DISPENSARY_QR}`, params);
};

export const userCheckInDispensary = (params: any) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.USER_CHECKIN_DISPENSARY}`, params);
};

export const getIntakeForm = (obj:any) => {
  return HTTP_CLIENT.get(
    `${ENDPOINTS.INTAKE_FORM}?dispensary_id=${obj.id}`
  );
};

export const postIntakeForm = (params: any) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.INTAKE_FORM}`, params);
};
