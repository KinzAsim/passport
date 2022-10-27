import React from 'react';
import {View, ViewPropTypes,Text} from "react-native";
import { RF, THEME } from '../../exporter';

const PropTypes = require('prop-types');


const DropDownRow = (props) => {


    return (
        <View style={props.ContainerStyles} >
            <Text style={props.highlighted?props.highlightedTextStyle:props.textStyle}>{props.text }</Text></View>
    )
};

DropDownRow.propTypes = {
    ContainerStyles:ViewPropTypes.style,
    textStyle:Text.propTypes.style,
    text:PropTypes.string,
    highlighted:PropTypes.bool,
    highlightedTextStyle: Text.propTypes.style,

};

DropDownRow.defaultProps = {
    headerWithBack:   false,
    showLeftComponent:true,
    ContainerStyles:{
        borderBottomWidth:1,
        borderBottomColor:THEME.colors.brightGrey,
        height:RF(40),
        width:"100%",
        justifyContent:"center"
    },
    textStyle:{
        padding:RF(5),
        color:THEME.colors.darkGrey,
        fontSize:RF(12),

    },
    highlightedTextStyle:{
        color:THEME.colors.black,
        padding:RF(5),
        fontSize:RF(12),
    }


};

export default DropDownRow;
