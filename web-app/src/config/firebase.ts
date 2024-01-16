import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBwfET_G-bP1_vXVejSLrTEAUavitvBYqc",
  authDomain: "chat-app-a127a.firebaseapp.com",
  projectId: "chat-app-a127a",
  storageBucket: "chat-app-a127a.appspot.com",
  messagingSenderId: "25788061701",
  appId: "1:25788061701:web:4569296bd14dffc7fca46c"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)