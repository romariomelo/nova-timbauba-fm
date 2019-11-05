import React, { useEffect } from 'react'
import {
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView
} from 'react-native'

const Main = ({navigation}) => {
    useEffect(()=> {
        navigation.openDrawer()
    }, [])

    return (
        <View>
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
        <View style={styles.control}>
            <View>
            </View>
        </View>
    </View>
    )
}

Main.navigationOptions = () => {
    return {
        drawerLabel: 'Horário Escolar'
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%"
    },
    control: {
        backgroundColor: "#9fbb32",
        width: "100%",
        height: 150,
        position: "absolute",
        bottom: 0,
        left:0,
    }
})

export default Main