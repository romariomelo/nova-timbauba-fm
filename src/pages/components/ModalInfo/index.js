import React from 'react';
import {View, TouchableOpacity, Text, Linking, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('http://www.novatimbaubafm.com');
          }}>
          <Text style={styles.textModal}>
            <Image
              source={require('../../../assets/world-icon.png')}
              style={{width: 18, height: 18}}
            />{' '}
            Acesse nosso site
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`whatsapp://send?phone=${appInfo.whatsapp}`);
          }}>
          <Text style={styles.textModal}>
            <Image
              source={require('../../../assets/whatsapp-icon.png')}
              style={{width: 18, height: 18}}
            />{' '}
            Participe da nossa programação
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${appInfo.telefone}`);
          }}>
          <Text style={styles.textModal}>
            <Image
              source={require('../../../assets/phone-icon.png')}
              style={{width: 18, height: 18}}
            />{' '}
            Fale conosco
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity
          style={{marginTop: 100}}
          onPress={() => {
            Linking.openURL('http://www.romariomelo.com');
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
