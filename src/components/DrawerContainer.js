import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from '../components/MenuButton';
import { AppIcon } from '../AppStyles';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { logout } from '../reducers';

export default function DrawerContainer({ navigation }) {
  const auth = getAuth();
  const dispatch = useDispatch();
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Products"
          onPress={() => {
            navigation.navigate('Products Screen');
          }}
        />
        <MenuButton
          title="Transactions"
          onPress={() => {
            navigation.navigate('Transactions Screen');
          }}
        />
        <MenuButton
          title="Savings"
          onPress={() => {
            navigation.navigate('Savings Screen');
          }}
        />
        <MenuButton
          title="Loans"
          onPress={() => {
            navigation.navigate('Loans Screen');
          }}
        />
        <MenuButton
          title="Withdrawals"
          onPress={() => {
            navigation.navigate('Withdrawals Screen');
          }}
        />
        <MenuButton
          title="Profile"
          onPress={() => {
            navigation.navigate('Profile Screen');
          }}
        />
        <MenuButton
          title="Log Out"
          source={AppIcon.images.logout}
          onPress={async () => {
            await signOut(auth)
              .then(() => {
                dispatch(logout());
                navigation.navigate('LoginStack');
              }); //logout on redux
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});
