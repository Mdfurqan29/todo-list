window.register = function(){
    window.location = './register/index.html'
}
window.Login = function () {
    window.location = '../index.html'
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword ,onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set ,push,onChildAdded,remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";


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

var password = document.getElementById("password")
var email = document.getElementById("email")
var arr = []


function checkuser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
    
          dara = user.uid
          LoginMain.style.display = "none"
          todomain.style.display = "inline-flex"
Swal.fire(`Auto Login Success`) 
 getDataFromDatabase()

        } else {
            LoginMain.style.display = "inline-flex"
            todomain.style.display = "none"
          
        }
      });
}
checkuser()
  

var todomain = document.getElementById("todo-Main");
var LoginMain = document.getElementById("Login-Main");
var todoDataMain = document.getElementById("todo-data-main");
var userInp = document.getElementById("user-value");
var dara;
window.login = function(){
    
   if(email.value ===""){
        Swal.fire(`Enter Email`)
    }else if(password.value === ""){
        Swal.fire(`Enter Password`)
    }else if(password.value.length <= 5){
Swal.fire(`Wrong Password`)

    }else{
    signInWithEmailAndPassword(auth,email.value,password.value).then(
        function(user){
        LoginMain.style.display = "none"
        todomain.style.display = "inline-flex"
        dara = user.user.uid
        email.value = ""
        password.value = ""
Swal.fire(`Login Success`)
        }
    ).catch(
        function(){
Swal.fire(`Login Faild`)

        }
    )
}
}


function getDataFromDatabase(){
    var reference = ref(DATABASE,`${dara}`)
    onChildAdded(reference,function(data){
      rander(data.val())
    })
  }
 
window.rander = function(data){
    if(data){
        arr.push(data)

    }
    todoDataMain.innerHTML = ""
    for(var i = 0;i<arr.length;i++){
        todoDataMain.innerHTML += `<div class="todo-data">
        <ul>
            <li>${arr[i].data}</li>
        </ul>
        <i onclick="del(${i})" id="todo-i-c" class="fa-solid fa-xmark"></i>
    </div>`
    }

}
         

window.add = function(){
    if(userInp.value === ""){
Swal.fire(`Enter Your item`)
    }else{
    var arrDatabase = {
    data:userInp.value
    }
    var referId = ref(DATABASE)
    var ID = push(referId).key
    arrDatabase.id = ID
    var reference = ref(DATABASE,`${dara}/${arrDatabase.id}`)
    set(reference,arrDatabase)
Swal.fire(`Success`)
    todoDataMain.innerHTML= ""
    userInp.value=""
    rander()
}
}
window.del = function(i){
    var id = arr[i].id
    var refer = ref(DATABASE,`${dara}/${id}`)
    remove(refer)
arr.splice(i,1)
Swal.fire('Delete Success')
todoDataMain.innerHTML= ""
rander()
}

window.logout = function(){
    signOut(auth).then(
        function(){
        LoginMain.style.display = "inline-flex"
        todomain.style.display = "none"
        arr = []
        Swal.fire(
            'Logout!',
            'Success',
            'success'
          )
        }
    ).catch(
        function(){

        }
    )
}