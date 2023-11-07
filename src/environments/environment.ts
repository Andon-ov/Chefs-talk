import { initializeApp } from 'firebase/app';

export const environment = {
  firebaseConfig: {
    apiKey: 'AIzaSyBqXpKb2qj9VKAYX_DOaOyGV6e-lsUhxG8',
    authDomain: 'chefs-talks.firebaseapp.com',
    projectId: 'chefs-talks',
    storageBucket: 'chefs-talks.appspot.com',
    messagingSenderId: '821574305127',
    appId: '1:821574305127:web:1ec43d2f164a6f2c151bc2',
    measurementId: 'G-96713DEB05',
  },
  cloudinaryConfig: {
    cloudName: 'dsla98vyk',
    apiKey: '587566495847865',
    apiSecret: 'sJLzQzouizKo51b9Mv0bI8a5pCI',
    uploadPreset:'chefs_talks'
  },
};
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
