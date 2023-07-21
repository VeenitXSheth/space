import { app as firebase } from '../firebase-config.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

console.log(firebase)

const auth = getAuth(firebase)

const provider = new GoogleAuthProvider(auth)

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {

    e.preventDefault()

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created:', cred.user)
        const alert = document.getElementById('alert')
        alert.style.display = 'none'
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('verification email sent!')
                localStorage.setItem('setUsername', 'True')
                localStorage.setItem('username', username)
                const alert = document.getElementById('alert')
                alert.style.display = 'none'
                location.href = '/learn/app.html'
            })
            .catch((err) => {
                const alert = document.getElementById('alert')
                console.log(err.message)
                alert.innerText = err.message
                alert.style.display = 'flex'
            })
    })
    .catch((err) => {
        console.log(err.message)
    })

})

const btn = document.getElementById('google-btn');
btn.addEventListener('click', () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('joined with google!')
        console.log(result)
        const alert = document.getElementById('alert')
        alert.style.display = 'none'
        sendEmailVerification(auth.currentUser)
            .then(() => {
                const alert = document.getElementById('alert')
                alert.style.display = 'none'
                console.log('verification email sent!')
                location.href = '/learn/app.html'
            })
            .catch((err) => {
                const alert = document.getElementById('alert')
                console.log(err.message)
                alert.innerText = err.message
                alert.style.display = 'flex'
            })
      })
      .catch((err) => {
        const alert = document.getElementById('alert')
        console.log(err.message)
        alert.innerText = err.message
        alert.style.display = 'flex'
      })
  
  })