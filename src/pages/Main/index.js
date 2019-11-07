import React, { useEffect, useState, useRef } from 'react'
import {
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Image,
    View,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { LivePlayer } from "react-native-live-stream"

const Main = ({navigation}) => {

    const [stoped, setStop] = useState(true)
    const [loading, setLoading] = useState(false)

    const player = useRef(null)

    useEffect(()=> {
        console.log('didMount')
    }, [])

    const btnControlPress = () => {
        if (stoped) {
            setLoading(true)
            setStop(!stoped)
            setTimeout(()=> {
                setLoading(false)
            },2000)
        } else {
            setStop(!stoped)
        }
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