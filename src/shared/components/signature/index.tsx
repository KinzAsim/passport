import React, {useRef, useState} from 'react';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  getIntakeForm,
  GST,
  postIntakeForm,
  showToast,
  THEME,
  RF,
} from '../../../shared/exporter';

interface Props {
  text: string;
  onOK: () => void;
  handleScroll: (value: any) => void;
}

const Sign: React.FC<Props> = ({text, onOK, handleScroll}) => {
  const ref = useRef(null);
  // const [scrollEnabled, setScrollEnabled] = useState(true);
  const handleSignature = (signature: any) => {
    console.log('signnnnnnn', signature);
    onOK(signature);
  };

  const handleEnd = () => {
    ref.current?.readSignature();
    console.log('sss..');
    handleScroll(true);
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  return (
    <View style={styles.container}>
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        onOK={handleSignature}
        // onEmpty={handleEmpty}
        onBegin={() => handleScroll(false)}
        // onClear={handleClear}
        autoClear={false}
        descriptionText={text}
        // style={{
        //   borderWidth: 1,
        // }}
      />
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    height: RF(200),
    // borderRadius: RF(20),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(144, 196, 89, 0.3)',
    paddingVertical: RF(5),
    paddingHorizontal: RF(10),
  },
  btnText: {
    color: THEME.colors.primary,
  },
});
function setScrollEnabled(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
