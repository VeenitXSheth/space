import { app as firebase } from '../firebase-config.js';
import { getAuth, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

console.log(firebase)

const auth = getAuth(firebase)
const db = getFirestore(firebase)

const signOutBtn = document.getElementById('sign-out');
signOutBtn.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('signed out')
        location.href = '/index.html'
    })
    .catch((err) => {
        console.log(err.message)
    })
})

let currentUserUID;

onAuthStateChanged(auth, user => {

    if (user) {
        console.log('they are welcome here')
        currentUserUID = user.uid;
        console.log(currentUserUID)
        const displayNameText = document.getElementById('displayName')
        if (localStorage.getItem('setUsername') === 'True') {
            console.log('setting username')
            updateProfile(user, {
                displayName: localStorage.getItem('username')
            }).then(() => {
                localStorage.setItem('setUsername', 'False');
                // displayNameText.innerText = user.displayName
            }).catch((err) => {
                console.log(err.message);
            })
        } else {
            console.log('username already set');
            localStorage.setItem('setUsername', 'False');
            // displayNameText.innerText = user.displayName;
        }
    } else {
        console.log('get out');
        location.href = '/auth/login.html';
    }
     
})
