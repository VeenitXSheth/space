import { app as firebase } from '../firebase-config.js';
import { GoogleAuthProvider, signInWithPopup,getAuth, signInWithEmailAndPassword } from 'firebase/auth'

console.log(firebase)

const auth = getAuth(firebase)

const provider = new GoogleAuthProvider(auth)

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {

    e.preventDefault()

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user signed in:', cred.user)
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

const btn = document.getElementById('google-btn');
btn.addEventListener('click', () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('signed in with google!')
        console.log(result)
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