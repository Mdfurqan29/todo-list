window.Login = function () {
    window.location = '../index.html'
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { getDatabase, ref, set,push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPz90qozOK5UYUEMNZMBjsB43Dm_6ezdc",
    authDomain: "todo-list-md.firebaseapp.com",
    projectId: "todo-list-md",
    storageBucket: "todo-list-md.appspot.com",
    messagingSenderId: "64651252326",
    appId: "1:64651252326:web:95601dfa84bae5a5f313a7",
    measurementId: "G-WQZZMBV4WN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const DATABASE = getDatabase(app)

var userName = document.getElementById("userName")
var password = document.getElementById("password")
var email = document.getElementById("email")

window.register = function () {
   
    if (userName.value === "") {
        Swal.fire(`Enter User Name`)
    } else if (email.value === "") {
        Swal.fire(`Enter Email`)
    } else if (password.value === "") {
        Swal.fire(`Enter Password`)
    } else if (password.value.length <= 5) {
        Swal.fire(`Password at least 6 characters`)
    } else {
        var users = {
            userName: userName.value,
            email: email.value,
            password: password.value,
        }
        createUserWithEmailAndPassword(auth, email.value, password.value).then(
            function () {
                Swal.fire('Registration Success')
                var referId = ref(DATABASE)
                var ID = push(referId).key
                users.id = ID
                var refer = ref(DATABASE, `UserData/${users.id}`)
                set(refer, users)
                userName.value = ""
                email.value = ""
                password.value = ""
            }
        ).catch(
            function () {
                Swal.fire(`Registration Faild`)

            }
        )
    }

}

