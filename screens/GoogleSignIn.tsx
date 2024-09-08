// GoogleSignIn.js
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '033110507114-qo43diheqv374gef5lcmpphmpeachpmc.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('1111')
    console.log('Google user info:', userInfo);
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated
    } else {
      // Some other error happened
    }
    console.error(error);
  }
};
