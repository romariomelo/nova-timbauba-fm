import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
} from 'react-native';

import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LivePlayer} from 'react-native-live-stream';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import MusicControl from 'react-native-music-control';
import ModalInfo from '../components/ModalInfo';
import getMessage from '../../helpers/messages';
import styles from './styles';
import TopBar from '../components/TopBar';

const primaryColor = '#9fbb32';
const secondaryColor = '#001d7e';

const Main = () => {
  const [stopped, setStop] = useState(true);
  const [loading, setLoading] = useState(false);
  const [server, setServer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [appInfo, setAppInfo] = useState({
    telefone: '8136311193',
    whatsapp: '5581989562717',
  });
  const [time, setTime] = useState(0);

  const remoteAppConfig = 'http://novatimbaubafm.com/app.json';

  const player = useRef(null);

  const sair = React.useCallback(() => {
    const oldTime = time;

    let _timeDiff = new Date().getTime() - oldTime;

    setTime(new Date().getTime());

    if (_timeDiff > 2000) {
      ToastAndroid.show(
        getMessage('press_to_exit').message,
        ToastAndroid.SHORT,
      );
      return true;
    }
    return false;
  }, [time]);

  useEffect(() => {
    asyncOnStart();

    NetInfo.addEventListener(state => {
      if (!state.isInternetReachable) {
        setStop(true);
        ToastAndroid.show(
          getMessage('check_your_connection').message,
          ToastAndroid.SHORT,
        );
      }
    });

    return function cleanup() {
      MusicControl.stopControl();
    };
  }, [asyncOnStart]);

  useEffect(() => {
    const bh = BackHandler.addEventListener('hardwareBackPress', () => {
      return sair();
    });

    return () => {
      bh.remove();
    };
  }, [time, sair]);

  useEffect(() => {
    onStoppedChange();
  }, [stopped, onStoppedChange]);

  const onStoppedChange = React.useCallback(async () => {
    if (stopped) {
      MusicControl.stopControl();
    } else {
      let _isConnected = await isConnected();
      if (!_isConnected) {
        ToastAndroid.show(
          getMessage('connect_to_listen').message,
          ToastAndroid.LONG,
        );
        setStop(true);
      } else {
        getServer();
        createNotification();
      }
    }
  }, [stopped, isConnected]);

  const asyncOnStart = React.useCallback(async () => {
    let _isConnected = await isConnected();
    if (!_isConnected) {
      ToastAndroid.show(
        getMessage('connect_to_listen').message,
        ToastAndroid.LONG,
      );
    } else {
      getAppInfo();
    }
  }, [isConnected]);

  const isConnected = React.useCallback(async () => {
    let retorno;
    await NetInfo.fetch().then(state => {
      if (['wifi', 'cellular', 'ethernet'].indexOf(state.type) === -1) {
        retorno = false;
      } else {
        retorno = true;
      }
    });

    return retorno;
  }, []);

  const getAppInfo = async () => {
    try {
      const response = await axios.get(remoteAppConfig, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.status === 200) {
        setAppInfo(response.data);
      }
    } catch (err) {
      ToastAndroid.show(
        getMessage('no_connection').message,
        ToastAndroid.SHORT,
      );
    }
  };

  const btnControlPress = () => {
    if (stopped) {
      setLoading(true);
      setStop(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setStop(true);
    }
  };

  const createNotification = () => {
    MusicControl.enableControl('stop', true);
    MusicControl.enableControl('closeNotification', true, {when: 'never'});
    MusicControl.enableBackgroundMode(true);
    MusicControl.setNowPlaying({
      title: 'Nova Timbaúba FM',
      artwork: require('../../assets/logo-draw.png'),
      color: 0x333333,
      notificationIcon: 'icon',
    });

    MusicControl.on('stop', () => {
      setStop(true);
    });
  };

  const getServer = async (ultServer = null) => {
    try {
      const api = await axios.get(remoteAppConfig);

      if (ultServer == null) {
        setServer(api.data.servers[0]);
      } else {
        let len = api.data.servers.length;
        if (len > ultServer + 1) {
          setServer(api.data.servers[ultServer + 1]);
        } else {
          ToastAndroid.show(
            getMessage('connectionless_servers').message,
            ToastAndroid.LONG,
          );
          setStop(true);
        }
      }
    } catch (err) {
      setStop(true);
      console.warn('E02: ' + err);
    }
  };

  return (
    <View>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <SafeAreaView>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.imageBackground}>
          <TopBar setModalVisible={setModalVisible} appInfo={appInfo} />
          <View style={styles.container}>
            <Image
              source={require('../../assets/logo-label.png')}
              style={styles.logoLabel}
            />

            <Image
              source={require('../../assets/logo-draw.png')}
              style={styles.logoDraw}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
      <View style={styles.controlContainer}>
        <View style={styles.control} />
        <View style={styles.btnContainer}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={styles.loader}
            />
          ) : stopped ? (
            <TouchableOpacity onPress={btnControlPress}>
              <Icon
                name="play-arrow"
                size={110}
                color="#fff"
                style={styles.btnPlay}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={btnControlPress}>
              <Icon
                name="stop"
                size={110}
                color="#fff"
                style={styles.btnStop}
              />
            </TouchableOpacity>
          )}
          <LivePlayer
            source={{uri: server}}
            ref={player}
            paused={stopped}
            muted={false}
            bufferTime={1000}
            maxBufferTime={1500}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <ModalInfo
        appInfo={appInfo}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
};

export default Main;
