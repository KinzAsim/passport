import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getNearbyDispensaries, RF, showToast, THEME} from '../../exporter';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import EmptyList from '../emptyList';
import LoadingOverlay from '../loadingOverlay';
const {white, primary, dimGray, gray} = THEME.colors;

const Categories = ({
  data = [],
  onOpenList,
  navigation,
  type,
  coordinates
}: {
  data: any;
  onOpenList: () => void;
  navigation:any,
  type:any,
  coordinates:any
}) => {

  const [detailData,setDetailData] = useState([])
  const [id,setId] = useState<any>()
  const [loading,setLoading] = useState(false)

  const onOpenItemDetail = (type: any,item: any) => {
    setId(item?.id)
    setDetailData(data)
    navigation.navigate('SeeAllProducts', 
    {id: item?.id, flag: 'Category Dispensaries',title:'Category Dispensaries',lat:coordinates[1],lon:coordinates[0]});
  };

  const listEmpty = () => {
    return (
      <View style={{marginLeft: RF(80)}}>
        <EmptyList
          title={'No Data found.'}
          description={'There is no data category yet.'}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <CustomText bold size={18}>
          Categories
        </CustomText>
        {data?.length > 0 ? (
          <>
            <Pressable onPress={onOpenList}>
              <CustomText color={primary} size={14}>
                See All
              </CustomText>
            </Pressable>
          </>
        ) : (
          <View></View>
        )}
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} scrollEnabled={false} horizontal>
        <FlatList
          data={data?.filter((item: any, index: any) => index <= 7)}
          scrollEnabled={false}
          numColumns={4}
          ListEmptyComponent={listEmpty}
          keyExtractor={(_: any, index: any) => String(index)}
          renderItem={({item, index}: any) => {
            return (
              <>
                  <Section
                    name={item?.name}
                    onPress={()=>onOpenItemDetail(type,item)}
                    image={item?.image_path}
                  />
              </>
            );
          }}
        />
        <LoadingOverlay loading={loading}/>
      </ScrollView>
    </View>
  );
};

const Section = ({
  name,
  onPress,
  image,
}: {
  name: any;
  onPress: () => void;
  image: any;
}) => {
  return (
    <View style={styles.cardView} >
      <Pressable onPress={onPress} style={{alignItems:'center'}}>
      <View style={styles.card}>
        <FastImage source={{uri:image}} style={styles.img} />
      </View>
      <CustomText bold size={12} numberOfLines={2}>
        {name}
      </CustomText>
      </Pressable>
    </View>
  );
};

const SeeMore = ({name, onPress}: {name: any; onPress: () => void}) => {
  return (
    <Pressable style={[styles.cardView,{justifyContent:'flex-start',alignItems:'flex-start'}]} onPress={onPress}>
      <View style={styles.dots}>
        <Icon
          name="dots-two-horizontal"
          color={primary}
          size={30}
          style={styles.icon}
        />
        <Icon name="dots-two-horizontal" color={primary} size={30} />
      </View>
      <CustomText bold size={12} numberOfLines={name.length > 10 ? 2 : 0} style={{marginLeft:RF(20)}}>
        {name}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: RF(15),
    paddingHorizontal: RF(10),
    backgroundColor: dimGray,
    paddingBottom: RF(20),
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
  },
  card: {
    width: RF(70),
    height: RF(70),
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(5),
    marginVertical: RF(5),
  },
  dots: {
    width: RF(70),
    height: RF(70),
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RF(5),
  },
  img: {
    width: RF(50),
    height: RF(50),
    borderRadius:RF(10)
  },
  cardView: {
    backgroundColor: dimGray,
    // flex: 1,
    alignItems:'flex-start',
    justifyContent: 'flex-start',
  },
  icon: {marginBottom: -15},
});

export default Categories;
