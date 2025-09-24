// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "studio-1904272487-e176f",
  "appId": "1:482996367524:web:b71cd2f81dd73592a1f631",
  "apiKey": "AIzaSyAC4rXYoyjI0ab9DYjuPR5fi647gvQU-Uk",
  "authDomain": "studio-1904272487-e176f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "482996367524"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
