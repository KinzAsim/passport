import {Platform} from 'react-native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCXhCd0sMWvXdHPsMBldiVXsRRzggucePU';
// AIzaSyBhMoC9OLQs1fxPJkPWxdgC9dui6pIKQoA
export {GOOGLE_MAPS_APIKEY};
export const formateaddress = (value: any) => {
  const formatedlocality = value?.address_components.filter(
    (address_component: any) =>
      ['locality', 'colloquial_area'].some(
        word => ~address_component.types.indexOf(word),
      ),
  );
  const formatedcode = value?.address_components.filter(
    (address_component: any) =>
      ['postal_code', 'colloquial_area'].some(
        word => ~address_component.types.indexOf(word),
      ),
  );
  const formatedState = value?.address_components.filter(
    (address_component: any) =>
      ['administrative_area_level_1', 'colloquial_area'].some(
        word => ~address_component.types.indexOf(word),
      ),
  );
  const formatedCountry = value?.address_components.filter(
    (address_component: any) =>
      ['country', 'colloquial_area'].some(
        word => ~address_component.types.indexOf(word),
      ),
  );
  return {
    city: formatedlocality[0]?.long_name,
    zipcode: formatedcode[0]?.long_name,
    state: formatedState[0]?.long_name,
    country: formatedCountry[0]?.long_name,
  };
};
export const RewiewHanle = (setrewiew: any, detailData: any, data: any) => {
  if (data === 0) {
    setrewiew(detailData?.with_image_review);
  } else if (data === 1) {
    setrewiew(detailData?.five_star);
  } else if (data === 2) {
    setrewiew(detailData?.four_star);
  } else if (data === 3) {
    setrewiew(detailData?.three_star);
  } else if (data === 4) {
    setrewiew(detailData?.two_star);
  } else if (data === 5) {
    setrewiew(detailData?.one_star);
  } else {
    setrewiew(detailData?.reviews);
  }
};

export const ANDROID = Platform.OS === 'android';
export const IOS = Platform.OS === 'ios';
