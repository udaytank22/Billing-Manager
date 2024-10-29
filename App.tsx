import React from 'react';
import { AuthProvider } from './screens/elements/AuthContext';
import AppNav from './screens/elements/AppNav';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './screens/redux/store/store';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor='#FFF' barStyle='dark-content' />
      <Provider store={store}>
        <AppNav />
      </Provider>
    </>
  );
}
export default App;
