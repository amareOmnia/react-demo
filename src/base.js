import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDnWtBNvOnHnKISqMDgZSzWvgAwsTpaGx8",
  authDomain: "cooper-fish-store.firebaseapp.com",
  databaseURL: "https://cooper-fish-store.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
