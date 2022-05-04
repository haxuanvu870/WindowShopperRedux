import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopScreen from '../screens/ShopScreen';
import ItemDetails from '../screens/ItemDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import Reviews from '../screens/ReviewsScreen';
import SubmitReview from '../screens/SubmitReviewScreen';
import CartScreen from '../screens/CartScreen';
import Account from '../screens/AccountScreen';
import { Image } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AccountStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen
      name="Account"
      component={Account}
    />

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ShopStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen
      name="Shop"
      component={ShopScreen}
    />

    <Stack.Screen
      name="ItemDetails"
      component={ItemDetails}
    />

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CreateAccount"
      component={CreateAccountScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Reviews"
      component={Reviews}
    />

    <Stack.Screen
      name="SubmitReview"
      component={SubmitReview}
    />
  </Stack.Navigator>
);

const CartStack = ({ navigation }) => (
  <Stack.Navigator >
    <Stack.Screen
      name="Cart"
      component={CartScreen}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CreateAccount"
      component={CreateAccountScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator initialRouteName="ShopStack"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#8f21fe',
        },
      }}
    >
      <Tab.Screen
        name="ShopStack"
        component={ShopStack}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../assets/bar_shop.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }} />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../assets/bar_account.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }} />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../assets/bar_cart.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack