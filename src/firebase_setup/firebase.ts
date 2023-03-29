import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: 'AIzaSyB5ZV7JfeKbTh6Ulo2zNe6Y8by4fuWbWcM',
  authDomain: 'fs14-frontend-1ee53.firebaseapp.com',
  projectId: 'fs14-frontend-1ee53',
  storageBucket: 'fs14-frontend-1ee53.appspot.com',
  messagingSenderId: '776144953616',
  appId: '1:776144953616:web:941b2ecd995ec72d404595',
  measurementId: 'G-CX344GZFC1'
}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const singInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential!.accessToken
      // The signed-in user info.
      const user = result.user

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}
const analytics = getAnalytics(app)
