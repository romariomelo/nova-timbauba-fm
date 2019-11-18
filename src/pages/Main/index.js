import React, { useEffect, useState, useRef } from 'react'
import {
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Image,
    View,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
    Text,
    Linking
} from 'react-native'

import Modal from 'react-native-modal';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LivePlayer } from "react-native-live-stream";
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import MusicControl from 'react-native-music-control';

const primaryColor = "#9fbb32";
const secondaryColor = "#001d7e";


const Main = () => {

    const [stoped, setStop] = useState(true)
    const [loading, setLoading] = useState(false)
    const [server, setServer] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [appInfo, setAppInfo] = useState({
        "telefone": "8136311193",
        "whatsapp": "5581989562717"
    });

    const remoteAppConfig = "http://novatimbaubafm.com/app.json";

    const player = useRef(null)

    useEffect(()=> {
          asyncOnStart();
    }, [])
	
	useEffect(()=> {
        onStopedChange();
    }, [stoped]);

    const onStopedChange = async () => {
        if (stoped == true) {
            MusicControl.resetNowPlaying();
        } else {
            let _isConnected = await isConnected();
            if (!_isConnected) {
                ToastAndroid.show('Verifique sua conexão com a internet. Por favor conecte-se a internet para ouvir.', ToastAndroid.LONG);
                setStop(true);
            } else {
                getServer();
                notificar();
            }
        }
    }

    const asyncOnStart = async () => {
        let _isConnected = await isConnected();
          if (!_isConnected) {
            ToastAndroid.show('Verifique sua conexão com a internet. Por favor conecte-se a internet para ouvir.', ToastAndroid.LONG);
          } else {
            getAppInfo();
          }
    }

    const isConnected = async () => {
        let retorno;
        await NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (["wifi", "cellular", "ethernet"].indexOf( connectionInfo.type ) === -1) {
                retorno = false;
            } else {
                retorno = true;
            }
        });
        return retorno;
    }

    const getAppInfo = async () => {
        try {
            const response = await axios.get(remoteAppConfig, {headers: {
                "Cache-Control": "no-cache"
            }});

            if (response.status == 200) {
                setAppInfo(response.data);
            }

        } catch (err) {
            ToastAndroid.show("E01: Sem conexão.", ToastAndroid.SHORT);
        }

    }

    const btnControlPress = () => {
        if (stoped) {
            setLoading(true);
            setStop(!stoped);
            setTimeout(()=> {
                setLoading(false);
            },2000);
        } else {
            setStop(!stoped);
        }
    }

    const notificar = () => {        
        MusicControl.enableControl('stop', true);
        MusicControl.enableControl('closeNotification', true, {when: 'never'});
        MusicControl.setNowPlaying({
            title: 'Nova Timbaúba FM',
            artwork: require("../../assets/logo-draw.png"), //'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
            //artist: 'Michael Jackson',
            //album: '96,9MHz',
            //genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
            //duration: 294, // (Seconds)
            //description: '96,9', // Android Only
            color: 0x001d7e, // Notification Color - Android Only
            //date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
            //rating: 84, // Android Only (Boolean or Number depending on the type)
            notificationIcon: 'icon' // Android Only (String), Android Drawable resource name for a custom notification icon
        });
          MusicControl.on('stop', ()=> {
            setStop(true);
          })
    }

    const getServer = async (ultServer = null) => {
        try {
            const api = await axios.get( remoteAppConfig );

            if ( ultServer == null ) {
                setServer(api.data.servers[0]);
            } else {
                len = api.data.servers.length;
                if ( len > ultServer + 1  ) {
                    setServer( api.data.servers[ultServer + 1] );
                } else {
                    console.log("Não há mais servidores");
                }

            }
        } catch (err) {
            setStop(true);
            console.warn("E02: " + err);
        }
    }

    return (
        <View>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content"  />
        <SafeAreaView>
            <ImageBackground
                source={require('../../assets/background.png')}
                style={{width:"100%", height: "100%"}}>
                    <TouchableOpacity
                        style={styles.btnInfo}
                        onPress={() => {setModalVisible(true)}}>
                        <Icon name="info" size={32} color="#333" style={styles.btnInfos} />
                    </TouchableOpacity>
                    
                    <View style={styles.container}>
                    <Image 
                        source={require('../../assets/logo-label.png')}
                        style={{width: "60%", resizeMode: "contain", marginBottom: -100}}/>

                    <Image 
                        source={require('../../assets/logo-draw.png')}
                        style={{width: "30%", resizeMode: "contain", }}/>

            
                    
                    </View>
                    
            </ImageBackground>
            
        </SafeAreaView>
        <View style={styles.controlContainer}>
            <View style={styles.control}>
            </View>
            <View style={styles.btnContainer}>
                {
                    (loading) ?
                        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} /> :
                        (stoped) ?
                        <TouchableOpacity onPress={btnControlPress}>
                            <Icon name="play-arrow" size={110} color="#fff" style={styles.btnPlay} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={btnControlPress}>
                            <Icon name="stop" size={110} color="#fff" style={styles.btnStop} />
                        </TouchableOpacity>
                }


                { 
                    (!stoped) ?
                        <LivePlayer source={{uri:server}}
                            ref={player}
                            paused={false}
                            muted={false}
                            bufferTime={500}
                            maxBufferTime={1000}
                            resizeMode={"contain"}
                        /> :
                        null
                }
                
            </View>
        </View>
        <Modal
          isVisible={modalVisible}
          style={styles.modal}
          onBackdropPress={()=>{setModalVisible(false)}}
          swipeDirection={['down']}
          onSwipeComplete={()=>{setModalVisible(false)}}>
          <View style={styles.viewModal}>
              <TouchableOpacity
                onPress={()=> {setModalVisible(false)}}>
                  <Text style={styles.textFecharModal}><Icon name="close" size={18} color="#9fbb32" style={styles.btnPlay} /> Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {Linking.openURL("http://www.novatimbaubafm.com")}}>
              <Text style={styles.textModal}><Image source={require("../../assets/world-icon.png")} style={{width: 18, height: 18}} /> Acesse nosso site</Text>
              </TouchableOpacity>
              <View style={styles.divider}></View>

              <TouchableOpacity
                onPress={() => {Linking.openURL(`whatsapp://send?phone=${appInfo.whatsapp}`)}}>
              <Text style={styles.textModal}><Image source={require("../../assets/whatsapp-icon.png")} style={{width: 18, height: 18}} /> Envie-nos uma mensagem</Text>
              </TouchableOpacity>
              <View style={styles.divider}></View>

              <TouchableOpacity
                onPress={() => {Linking.openURL(`tel:${appInfo.telefone}`)}}>
              <Text style={styles.textModal}><Image source={require("../../assets/phone-icon.png")} style={{width: 18, height: 18}} /> Fale conosco</Text>
              </TouchableOpacity>
              <View style={styles.divider}></View>


              <TouchableOpacity
                style={{marginTop: 100}}
                onPress={() => {Linking.openURL("http://www.romariomelo.com")}}>
              <Text style={styles.textModalCredit}>Desenvolvido por: <Image source={require("../../assets/logo-rm.png")} style={{width: 30, height: 18}} /> Romário Melo</Text>
              </TouchableOpacity>
          </View>
        </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%"
    },
    controlContainer: {
        width: "100%",
        height: 150,
        position: "absolute",
        bottom: 0,
        left:0,
        alignItems: "center"
    },
    control: {
        backgroundColor: primaryColor,
        width: "100%",
        height: 100,
        position: "absolute",
        bottom: 0
        
    },
    btnInfo: {
        alignSelf: "flex-end",
        position: "absolute",
        padding: 15,

    },
    btnContainer: {
        width: 126,
        height: 126,
        backgroundColor: secondaryColor,
        borderRadius: 63,
        alignItems: "center"
    },
    btnStop: {
        marginTop: 8
    },
    btnPlay: {
        marginTop: 6
    },
    loader: {
        marginTop: 43
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    viewModal: {
        marginTop: 22,
        backgroundColor: "#fff",
        padding:15,
        borderTopColor: primaryColor,
        borderTopWidth: 5
    },
    textFecharModal: {
        fontSize: 18,
        alignSelf: "flex-end",
        marginRight: 20,
        color: primaryColor
    },
    textModal: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    textModalCredit: {
        fontSize: 14,
        alignSelf: "center",
    },
    divider: {
        borderColor: "#DDD",
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 25,
        marginRight: 25
    }
})

export default Main