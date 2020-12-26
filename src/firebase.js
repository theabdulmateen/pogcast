import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBPfNUuXIgR4WfrUnAWtUdZ9JVpbk0WwEA',
	authDomain: 'pogcast-1a893.firebaseapp.com',
	projectId: 'pogcast-1a893',
	storageBucket: 'pogcast-1a893.appspot.com',
	messagingSenderId: '428204601179',
	appId: '1:428204601179:web:27520bdb7afdfd7cc7347e',
	measurementId: 'G-8S9E71N4ZW',
}
firebase.initializeApp(firebaseConfig)

const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const db = firebase.firestore()

export { db, auth, provider, firebase }
