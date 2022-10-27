import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native';
import {
    THEME,
    RF,
  } from '../../exporter';
  const {gray} = THEME.colors;

const EmptyList = ({  
    title,
    description,
    titleStyles,desStyles
  }: {
    titleStyles?:any,
    desStyles?:any,
    title?: any;
    description?:any
  })=> {
    return(
        <View style={styles.container}>
            <Text style={[styles.title,titleStyles]}>{title}</Text>
            <Text style={[styles.description,desStyles]}>{description}</Text>
        </View>
    )
}
export default EmptyList;
const styles= StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center' 
    },
    title:{
        color:gray,
        fontWeight: 'bold',
        fontSize: RF(12)
    },
    description:{
        color:gray,
        // fontWeight: 'bold',
        fontSize: RF(10)
    }
});

