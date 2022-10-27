import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable} from 'react-native';
import {THEME} from '../../../shared/exporter';
import styles from './styles';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import EmptyList from '../../../shared/components/emptyList';
import {Comment} from '../../../shared/components/productDetailComponent';
import moment from 'moment';

const SeeAllReview = ({route}: any) => {
  let data = route?.params?.data;
  const listEmpty = () => {
    return (
      <View style={{alignSelf: 'center'}}>
        <EmptyList
          title={'No Review found.'}
          description={'There is no Review yet.'}
        />
      </View>
    );
  };
  return (
    <>
      <HeaderWrapper showTitle title={route?.params?.title} showBtnLeft />
      <View style={styles.container}>
        <FlatList
          data={data.reverse()}
          keyExtractor={(_: any, index: any) => String(index)}
          ListEmptyComponent={listEmpty}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <Comment
                name={item?.user_detail?.name}
                date={moment(item?.created_at).format('MM-DD-YYYY')}
                comment={item?.review}
                ratings={item?.rating}
                source={{uri: item?.image_path}}
              />
            );
          }}
        />
      </View>
    </>
  );
};
export default SeeAllReview;
