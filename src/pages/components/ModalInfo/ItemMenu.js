import React from 'react';
import {TouchableOpacity, Text, Image, View, Linking} from 'react-native';
import styles from './styles';

const ItemMenu = props => {
  const {title, onPress, children} = props;
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textModal}>
          {children} {title}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </>
  );
};

export default ItemMenu;
