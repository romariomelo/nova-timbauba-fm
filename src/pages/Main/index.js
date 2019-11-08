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
    DeviceEventEmitter,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { LivePlayer } from "react-native-live-stream"
import PushNotification from 'react-native-push-notification'
import PushNotificationAndroid from 'react-native-push-notification'


const Main = ({navigation}) => {

    const [stoped, setStop] = useState(true)
    const [loading, setLoading] = useState(false)

    const player = useRef(null)

    useEffect(()=> {

          PushNotification.configure({

            onNotification: function(notification) {
                console.log("NOTIFICATION:", notification.action);
                if (notification.action == 'Stop') {
                    //PushNotification.cancelAllLocalNotifications()
					setStop(true)
                } else if (notification.action == 'Play') {
					setStop(false)
				}
            },
            
            popInitialNotification: true,

            requestPermissions: true,
          })
    }, [])
	
	useEffect(()=> {
        if (stoped == true) {
            PushNotification.cancelAllLocalNotifications()
        }
	}, [stoped])

    const btnControlPress = () => {
        if (stoped) {
            setLoading(true)
            setStop(!stoped)
            setTimeout(()=> {
                setLoading(false)
                notificar()
            },2000)
        } else {
            setStop(!stoped)
        }
    }

    const notificar = () => {
        console.log('notificar')

        
        PushNotification.localNotification({
            id: '63',
            title: "Nova Timbaúba FM", // (optional)
            message: "96,9", // (required)
            vibrate: false,
            playSound: false,
            actions: '["Play", "Stop"]',
            ongoing: true,
        });
    }

    return (
        <View>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content"  />
        <SafeAreaView>
            <ImageBackground
                source={require('../../assets/background.png')}
                style={{width:"100%", height: "100%"}}>
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
                        <LivePlayer source={{uri:"http://radio.novatimbaubafm.com:8204/live"}}
                            ref={player}
                            paused={false}
                            muted={false}
                            bufferTime={500}
                            maxBufferTime={1000}
                            resizeMode={"contain"}
                            onLoading={()=>{console.log("OnLoading")}}
                            onLoad={()=>{console.log("OnLoad")}}
                            onEnd={()=>{console.log("OnEnd")}}
                            onProgress={() => {console.log("OnProgress")}}
                        /> :
                        null
                }
                
            </View>
        </View>
    </View>
    )
}

Main.navigationOptions = () => {
    return {
        drawerLabel: 'Nova Timbaúba FM'
    }
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
        backgroundColor: "#9fbb32",
        width: "100%",
        height: 100,
        position: "absolute",
        bottom: 0
        
    },
    btnContainer: {
        width: 126,
        height: 126,
        backgroundColor: "blue",
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
    }
})

export default Main