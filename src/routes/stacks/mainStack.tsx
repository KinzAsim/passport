import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import StoreDetails from '../../screens/general/store detail';
import ProductDetails from '../../screens/general/product detail';
import SeeAllProducts from '../../screens/general/seeAllProducts';
import Favorites from '../../screens/general/favorites';
import SupportForSettings from '../../screens/auth/SupportOfSettings';
import EditProfile from '../../screens/general/EditProfile';
import Settings from '../../screens/general/settings';
import RejectedOffers from '../../screens/general/rejectedOffers';
import SupportForSubmitReviews from '../../screens/general/supportForSubmitReviews';
import Filters from '../../screens/general/filter';
import NoCoupen from '../../screens/general/noCoupen';
import PrivacyPolicy from '../../screens/general/privacyPolicy';
import TermsAndConditions from '../../screens/general/terms&Conditions';
import AboutUs from '../../screens/general/aboutUs';
import MyTabs from '../tabs/mainTabs';
import Dispensary from '../../screens/general/dispensary';
import IntakeForm from '../../screens/general/intakeForm';
import SuccessFormSubmit from '../../screens/auth/successFormSubmit';
import SuccessRedeem from '../../screens/auth/successRedeem';
import FavoriteCouponDispensory from '../../screens/general/favoriteCouponDispensory';
import Reviews from '../../screens/general/reviews';
import OfferDetail from '../../screens/general/offerDetail';
import AllCoupons from '../../screens/general/seeAllCoupons';
import RedeemCoupon from '../../screens/general/redeemCopon';
import SeeAllReview from '../../screens/general/seeAllReview';
import DispensaryCoupons from '../../screens/general/favoriteCouponDispensory';
import CouponDetail from '../../screens/general/couponDetail';
import DetailSingleCoupon from '../../screens/general/detailSingleCoupon';
import SuccessForProductReview from '../../screens/general/successForProductReview';
import VerifyPhoneNumber from '../../screens/general/verifyPhoneNumber';

const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen name="StoreDetails" component={StoreDetails} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="SeeAllProducts" component={SeeAllProducts} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen
          name="SupportForSettings"
          component={SupportForSettings}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="RejectedOffers" component={RejectedOffers} />
        <Stack.Screen
          name="SupportForSubmitReviews"
          component={SupportForSubmitReviews}
        />
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen name="NoCoupen" component={NoCoupen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Dispensary" component={Dispensary} />
        <Stack.Screen name="IntakeForm" component={IntakeForm} />
        <Stack.Screen name="SuccessFormSubmit" component={SuccessFormSubmit} />
        <Stack.Screen name="SuccessRedeem" component={SuccessRedeem} />
        <Stack.Screen
          name="FavoriteCouponDispensory"
          component={FavoriteCouponDispensory}
        />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="OfferDetail" component={OfferDetail} />
        <Stack.Screen name="AllCoupons" component={AllCoupons} />
        <Stack.Screen name="RedeemCoupon" component={RedeemCoupon} />
        <Stack.Screen name="SeeAllReview" component={SeeAllReview} />
        <Stack.Screen name="DispensaryCoupons" component={DispensaryCoupons} />
        <Stack.Screen name="CouponDetail" component={CouponDetail} />
        <Stack.Screen name="SuccessForProductReview" component={SuccessForProductReview} />
        <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
        <Stack.Screen
          name="DetailSingleCoupon"
          component={DetailSingleCoupon}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
