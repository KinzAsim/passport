import React, {Component, useState} from 'react';
import {Text, TouchableOpacity,StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RF, THEME } from '../../exporter';

const{primary,gray}=THEME.colors;

function SubmitStars(props:any) {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => props.setDefaultRating(item)}>
            {item <= props.defaultRating ? (
              <FontAwesome
                style={styles.stars}
                name="star"
                size={RF(16)}
                color={primary}
              />
            ) : (
              <FontAwesome
                style={styles.stars}
                // name="star-o"
                name="star"
                size={RF(16)}
                color="#E9E9E9"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
    stars: {
      // marginLeft: 1,
      marginRight: RF(5),
      // borderWidth:1
    },
  });

export default SubmitStars;
