import React from 'react';
import { AuthProvider } from './screens/elements/AuthContext';
import AppNav from './screens/elements/AppNav';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
export default App;
