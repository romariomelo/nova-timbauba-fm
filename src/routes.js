import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'


import Main from './pages/Main'

const Drawer = createDrawerNavigator({
    Main
})


const Routes = createAppContainer(Drawer)

export default Routes