import { NavigationProp, RouteProp } from "@react-navigation/native";

export interface Wrap {
    children?: any;
    style?: any;
}


export interface QratedBtnType {
    text: any,
    onPress?: () => void,
    textStyle?: any,
    wrapStyle?: any
}

export interface GenericNavigation {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}