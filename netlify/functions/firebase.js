const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyC2lQ0bHcGNs2vaioAGpO-j8OzDWrDox9I",
  authDomain: "kiei451-c5332.firebaseapp.com",
  projectId: "kiei451-c5332",
  storageBucket: "kiei451-c5332.appspot.com",
  messagingSenderId: "60157349058",
  appId: "1:60157349058:web:13a7dd49bea7aa73adff5b",
  measurementId: "G-76T99EBXYQ"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase