import { app as firebase } from '../firebase-config.js';
import { getAuth, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

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

const joinQuizForm = document.getElementById('join-quiz-form');
const makeQuizForm = document.getElementById('make-quiz-form');
const switchFormBtn = document.getElementById('switch-form');
const switchText = document.getElementById("switch-text")

makeQuizForm.style.display = 'none';

switchFormBtn.addEventListener('click', () => {

    if (makeQuizForm.style.display === 'none') {  
        makeQuizForm.style.display = 'flex';
        joinQuizForm.style.display = 'none';
        switchText.innerText = "Switch to join a quiz"
    } else {
        makeQuizForm.style.display = 'none';
        joinQuizForm.style.display = 'flex';
        switchText.innerText = "Switch to make a quiz"
    }

})

joinQuizForm.addEventListener('submit', (e) => {

    e.preventDefault()

    console.log(joinQuizForm.code.value)

})

makeQuizForm.addEventListener('submit', async e => {

    e.preventDefault()

    const name = makeQuizForm.quizname.value;
    const admin = currentUserUID;
    const players = [];
    const inviteCode = Math.random().toString(36).slice(2, 7);
    const questions = [];

    const colRef = collection(db, 'quizzes')
    const docRef = doc(colRef)

    await setDoc(doc(db, 'quizzes', inviteCode), {
        admin: admin,
        inviteCode: inviteCode,
        name: name,
        players: players,
        questions: questions,
    })

    console.log('quiz created!')

    sessionStorage.setItem('inviteCode', inviteCode)

    location.href = '/learn/create/configure.html'

})
