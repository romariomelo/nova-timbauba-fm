import React from 'react';
import {View, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './styles';

const TopBar = props => {
  const {setModalVisible, appInfo} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`whatsapp://send?phone=${appInfo.whatsapp}`);
        }}
        style={styles.btn}>
        <Image
          source={require('../../../assets/icons/whatsapp_128x128.png')}
          style={styles.imgSocial}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Linking.openURL(appInfo.social.instagram.url);
        }}
        style={styles.btn}>
        <Image
          source={require('../../../assets/icons/instagram_128x128.png')}
          style={styles.imgSocial}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Linking.openURL(appInfo.social.facebook.url);
        }}
        style={styles.btn}>
        <Image
          source={require('../../../assets/icons/facebook_128x128.png')}
          style={styles.imgSocial}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.btn}>
        <Image
          source={require('../../../assets/icons/info_128x128.png')}
          style={styles.imgSocial}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
