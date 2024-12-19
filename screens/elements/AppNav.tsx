import React, { useEffect, Suspense } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkStoredToken } from '../redux/slices/authSlice'; // Import checkStoredToken

// Lazy load AppStack and AuthStack
const AppStack = React.lazy(() => import('./AppStack'));
const AuthStack = React.lazy(() => import('./AuthStack'));

const AppNav = () => {
  const dispatch = useDispatch();
  const { isLoading, userToken, loginError } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load token when the app starts
    dispatch(checkStoredToken());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (loginError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{loginError}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Suspense
        fallback={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      >
        {userToken ? <AppStack /> : <AuthStack />}
      </Suspense>
    </NavigationContainer>
  );
};

export default AppNav;
