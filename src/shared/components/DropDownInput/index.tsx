import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
import {arrowDown} from '../../../assets/images';
import Camera from 'react-native-vector-icons/AntDesign';

export default function DropDownInput({
  list,
  title,
  showPicker,
  onPressPicker,
  onSelect,
  type,
  HeadingTitle,
  selectedRemove,
  keyy,
}: {
  list: any;
  title?: any;
  showPicker: Boolean;
  onPressPicker: () => void;
  onSelect: (txt: string) => void;
  selectedRemove?: () => void;
  type?: any;
  HeadingTitle: string;
  keyy: any;
}) {
  return (
    <>
      <View style={styles.DropdownMainView}>
        <Text style={styles.DropdownHeading}>{HeadingTitle}</Text>

        <View key={keyy} style={styles.DropdownTouch}>
          {type && Number(type) ? (
            <Text style={styles.DropdownOptionText}>{title}</Text>
          ) : (
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', width: '95%'}}>
              {Array.isArray(title) && title.length ? (
                title?.map((el: any, inx: number) => {
                  return (
                    <View
                      key={inx}
                      style={{
                        paddingVertical: RF(5),
                        marginVertical: RF(5),
                        marginHorizontal: RF(5),
                        backgroundColor: 'white',
                        borderRadius: RF(5),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{marginHorizontal: RF(10)}}>
                        {el?.title}
                        asdfasdf
                      </Text>
                      <TouchableOpacity
                        onPress={() => selectedRemove && selectedRemove()}>
                        <Camera
                          style={{zIndex: 1, right: 5, bottom: 3}}
                          name="close"
                          color="black"
                          size={12}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>{title || ''}</Text>
              )}
            </View>
          )}
          <TouchableOpacity onPress={onPressPicker} style={{padding: 5}}>
            <Image
              style={styles.DropdownImage}
              resizeMode="contain"
              source={arrowDown}
            />
          </TouchableOpacity>
        </View>
        {showPicker && (
          <View style={styles.DropdownOptionView}>
            <ScrollView nestedScrollEnabled>
              {list.length > 0 ? (
                <>
                  {list?.map((element: any) => (
                    <TouchableOpacity onPress={() => onSelect(element)}>
                      <Text style={styles.DropdownOptionText1}>{element}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <View>
                  <Text>No selection found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  DropdownMainView: {
    width: '100%',
    alignSelf: 'center',
  },
  DropdownTouch: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // height: 50,
    paddingVertical: RF(15),
    width: '100%',

    // paddingTop: 17,
    backgroundColor: THEME.colors.primaryLight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // borderBottomWidth: 2,
    // borderColor: colors.primary,
    paddingHorizontal: 10,
  },
  DropdownImage: {
    width: 12,
    height: 14,
    marginRight: 5,
  },
  DropdownOptionText: {
    fontSize: 14,
    color: THEME.colors.black,
    // opacity: 0.6,
  },
  DropdownOptionText1: {
    fontSize: 14,
    color: THEME.colors.black,
    opacity: 0.5,
    paddingVertical: 5,
  },
  DropdownOptionView: {
    maxHeight: 180,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 80,
    position: 'absolute',
    zIndex: 111,
    width: '100%',
    elevation: 5,
  },
  DropdownHeading: {
    fontSize: RF(12),
    color: THEME.colors.gray,
    marginBottom: 5,
    marginTop: 10,
  },
});
