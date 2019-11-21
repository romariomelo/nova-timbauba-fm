import { createAppContainer, createSwitchNavigator } from 'react-navigation'


import Main from './pages/Main'

const SwitchNavigator = createSwitchNavigator({
    Main: {
        screen: Main,
        overrideBackPress: true
    }
})


const Routes = createAppContainer(SwitchNavigator)

export default Routes