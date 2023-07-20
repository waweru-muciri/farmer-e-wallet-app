import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TransactionsScreen from '../screens/TransactionsScreen';
import TransactionInputScreen from '../screens/TransactionInputScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {AppIcon, AppStyles} from '../AppStyles';
import DrawerContainer from '../components/DrawerContainer';
import LoansScreen from '../screens/LoansScreen';
import LoanInputForm from '../screens/LoanInputForm';
import WithdrawalsScreen from '../screens/WithdrawalsScreen';
import WithdrawalsInputScreen from '../screens/WithdrawalsInputScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavingsScreen from '../screens/SavingsScreen';
import SavingsInputScreen from '../screens/SavingsInputScreen';

const Stack = createStackNavigator();

// login stack
const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: {paddingLeft: 10},
      })}
    />
    <Stack.Screen
      name="Transactions Screen"
      component={TransactionsScreen}
    />
    <Stack.Screen
      name="Loans Screen"
      component={LoansScreen}
    />
    <Stack.Screen
      name="Products Screen"
      component={ProductsScreen}
    />
    <Stack.Screen
      name="Profile Screen"
      component={ProfileScreen}
    />
    <Stack.Screen
      name="Withdrawals Screen"
      component={WithdrawalsScreen}
    />
    <Stack.Screen
      name="WithdrawalInputScreen"
      component={WithdrawalsInputScreen}
    />
    <Stack.Screen
      name="LoanInputScreen"
      component={LoanInputForm}
    />
    <Stack.Screen
      name="Savings Screen"
      component={SavingsScreen}
    />
    <Stack.Screen
      name="SavingsInputScreen"
      component={SavingsInputScreen}
    />
    <Stack.Screen
      name="TransactionInputScreen"
      component={TransactionInputScreen}
    />
  </Stack.Navigator>
);


// drawer stack
const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {outerWidth: 200},
      drawerPosition: 'left',
      headerShown: false,
    }}
    drawerContent={({navigation}) => (
      <DrawerContainer navigation={navigation} />
    )}>
    <Drawer.Screen name="HomeStack" component={HomeStack} />
  </Drawer.Navigator>
);

// Manifest of possible screens
const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="LoginStack"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="LoginStack" component={LoginStack} />
    <Stack.Screen name="DrawerStack" component={DrawerStack} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
  },
  iconStyle: {tintColor: AppStyles.color.tint, width: 30, height: 30},
});

export default AppNavigator;
