import AuthScreen from './src/Screens/AuthScreen';
import { createStackNavigator, createSwitchNavigator} from 'react-navigation';
import CreateNAccount from './src/Screens/CreateNAccount';
import PrivateScreen from './src/Screens/PrivateScreen';

const AuthStack = createStackNavigator({
  Home: {
    screen: AuthScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: CreateNAccount,
    navigationOptions: {
      title: "Sign Up"
    },
  }
})

const AppStack = createStackNavigator({
  Private: {
    screen: PrivateScreen,
    navigationOptions: {
      header: null,
    },
  }
})

export default createSwitchNavigator({
      Home: AuthScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Home"
    }       
  );
