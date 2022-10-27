import {RF, THEME} from '../../../shared/exporter';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomCB from '../../../shared/components/customCB';
import CustomText from '../customText';

const {white, primary} = THEME.colors;
const TermsOfServices = ({
  value,
  onClick,
}: {
  value: boolean;
  onClick: () => void;
}) => {
  return (
    <View style={styles.policiesView}>
      <CustomCB value={value} onPress={onClick} style={{paddingHorizontal: 0, marginLeft: 0}} />
      <View>
        <CustomText size={12}>
          By clicking signup, you agree to our{' '}
          <CustomText style={styles.policiesTxt}>Terms of Service</CustomText>
        </CustomText>
        <CustomText>
          and our{' '}
          <CustomText style={styles.policiesTxt}>Privacy Policy</CustomText>
        </CustomText>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  policiesView: {
    marginTop: RF(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  policiesTxt: {
    color: primary,
    textDecorationLine: 'underline',
    paddingHorizontal: RF(10),
  },
});
export default TermsOfServices;
