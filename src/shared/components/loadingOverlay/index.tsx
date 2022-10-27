import React from 'react';
import {StyleSheet, ActivityIndicator, View} from "react-native";
import {SkypeIndicator} from 'react-native-indicators';
import { Overlay } from 'react-native-elements';
import {GST, RF, THEME} from '../../exporter';

const {primary} = THEME.colors;

const LoadingOverlay = ({
    loading,
  }: {
    loading:any;
  })=> {
   
    return (
        <Overlay isVisible={loading} overlayStyle={styles.overLayView}>
            <View style={styles.loading}>
         <SkypeIndicator color={primary} size={RF(50)} />
         </View>

        </Overlay>
       
        );
}
export default LoadingOverlay;

const styles = StyleSheet.create({
    overLayView:{
        backgroundColor:'rgba(42,67,78,0.5)',
        alignItems:'center',
        justifyContent:'center',
        zIndex:100,
        elevation:1,
        position:'absolute',
        left:0,
        bottom:0,
        top:0,
        right:0,
    },
    loading: {
        alignItems: 'center',
        width:'100%',
    },
   
});