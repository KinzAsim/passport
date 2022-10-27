import React, {useEffect, useState} from 'react';
import {Pressable, Linking, View, Alert} from 'react-native';
import CustomText from '../../../shared/components/customText';
import {scanDispensaryQR, showToast, THEME} from '../../../shared/exporter';
import {code, bG} from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import {RNCamera} from 'react-native-camera';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
const {white} = THEME.colors;

const Scan = ({navigation}: any) => {
  const [loading, setloading] = useState(false);
  const [barcodeReaded, setbarcodeReaded] = useState(true);
  const [qrCode, setQrCode] = useState<any>();

  const onBarCodeRead = (e: any) => {
    if (barcodeReaded) {
      setbarcodeReaded(false);
      setQrCode(e.data);
      onOpenIntakeForm(e.data);
    }
  };

  const onOpenIntakeForm = (code: any) => {
    setloading(true);
    const params = {
      qr_code: code,
    };
    scanDispensaryQR(params)
      .then((res: any) => {
        if (res?.data?.status === true) {
          showToast('Success', 'Welcome to dispensary', true);
          navigation.navigate('Dispensary', {data: res?.data?.data});
          setbarcodeReaded(true);
        } else {
          showToast('Request Failed', res?.data?.message, false);
          setTimeout(() => {
            setbarcodeReaded(true);
          }, 3000);
        }
      })
      .catch((err: any) => {
        showToast(
          'Request Failed',
          err?.response.data?.message,
          false,
        );
      })
      .finally(() => setloading(false));
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        style={{flex: 1}}
        captureAudio={false}
        onBarCodeRead={e => onBarCodeRead(e)}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
        <FastImage source={bG} style={styles.imgBG}>
          <Section />
        </FastImage>
      </RNCamera>

      <LoadingOverlay loading={loading} />
    </View>
  );
};

const Section = ({onPress}: {onPress?: () => void}) => {
  return (
    <Pressable style={styles.textView} onPress={onPress}>
      <CustomText color={white} size={16} bold>
        Scan QR Code for check in
      </CustomText>
      <FastImage source={code} style={styles.scanImg} />
      <Pressable>
        <CustomText color={white} size={14} semiBold>
          Align scan code between squares
        </CustomText>
      </Pressable>
    </Pressable>
  );
};

export default Scan;
