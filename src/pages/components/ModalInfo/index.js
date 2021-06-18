import React from 'react';
import {View, TouchableOpacity, Text, Linking, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemMenu from './ItemMenu';

const ModalInfo = ({setModalVisible, modalVisible, appInfo}) => {
  //const [modalVisible, setModalVisible] = React.useState(isVisible);

  return (
    <Modal
      isVisible={modalVisible}
      style={styles.modal}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      swipeDirection={['down']}
      onSwipeComplete={() => {
        setModalVisible(false);
      }}>
      <View style={styles.viewModal}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={styles.textFecharModal}>
            <Icon
              name="close"
              size={18}
              color="#9fbb32"
              style={styles.btnPlay}
            />{' '}
            Fechar
          </Text>
        </TouchableOpacity>

        <ItemMenu
          onPress={() => Linking.openURL('http://www.novatimbaubafm.com')}
          title="Acesse nosso site">
          <Image
            source={require('../../../assets/world-icon.png')}
            style={styles.imgIcon}
          />
        </ItemMenu>

        <ItemMenu
          onPress={() => {
            Linking.openURL(`whatsapp://send?phone=${appInfo.whatsapp}`);
          }}
          title="Participe da nossa programação">
          <Image
            source={require('../../../assets/whatsapp-icon.png')}
            style={styles.imgIcon}
          />
        </ItemMenu>

        <ItemMenu
          onPress={() => {
            Linking.openURL(`${appInfo.social.instagram.url}`);
          }}
          title="Instagram">
          <Image
            source={require('../../../assets/social/instagram_96x96.png')}
            style={styles.imgIcon}
          />
        </ItemMenu>

        <ItemMenu
          onPress={() => {
            Linking.openURL(`${appInfo.social.facebook.url}`);
          }}
          title="Facebook">
          <Image
            source={require('../../../assets/social/facebook_96x96.png')}
            style={styles.imgIcon}
          />
        </ItemMenu>

        <ItemMenu
          title="Fale Conosco"
          onPress={() => {
            Linking.openURL(`tel:${appInfo.telefone}`);
          }}>
          <Image
            source={require('../../../assets/phone-icon.png')}
            style={styles.imgIcon}
          />
        </ItemMenu>

        <TouchableOpacity
          style={{marginTop: 100}}
          onPress={() => {
            Linking.openURL(appInfo.creditos.url);
          }}>
          <Text style={styles.textModalCredit}>
            Desenvolvido por:{' '}
            <Image
              source={require('../../../assets/logo-rm.png')}
              style={{width: 30, height: 18}}
            />{' '}
            Romário Melo
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalInfo;
