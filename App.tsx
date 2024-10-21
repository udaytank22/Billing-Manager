import React from 'react';
import { AuthProvider } from './screens/elements/AuthContext';
import AppNav from './screens/elements/AppNav';
import { StatusBar } from 'react-native';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor='#FFF' barStyle='dark-content' />
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </>
  );
}
export default App;
