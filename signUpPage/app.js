var firstName = document.querySelector('#fname');
var surName = document.querySelector('#lname');
var signupEmail = document.querySelector('#email');
var phnNum = document.querySelector('#phoneNum');
var signUpPass = document.querySelector('#signUpPass');
var signUpBtn = document.querySelector('.signupBtn');
var hidden = document.querySelector('.hidden');

let dayValue;
let monthValue;
let yearValue;
let gender;

function getDayHandler(d){
  console.log(d)
  dayValue = d;
}
window.getDayHandler = getDayHandler;

function getMonthHandler(m){
  console.log(m)
  monthValue = m;
}
window.getMonthHandler = getMonthHandler;

function getYearHandler(y){
  console.log(y)
  yearValue = y;
}
window.getYearHandler = getYearHandler;

function getGenderHandler(gIdentity){
  console.log(gIdentity)
  gender = gIdentity;
}
window.getGenderHandler = getGenderHandler;


import { auth, app, db, getFirestore, collection, addDoc, setDoc, doc, getDoc, getAuth, createUserWithEmailAndPassword} from '../firebaseconfig.js'


signUpBtn.addEventListener('click', signUpHandler);

async function signUpHandler () {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail.value, signUpPass.value);
      const user = await userCredential.user;
      console.log(user);

      if(userCredential.user){
        addUserData(user.uid);
      }
    }
  catch (error) {
    const errorCode = error.code;
    console.log(errorCode);
  }   
}

async function addUserData(uid) {
  try {
      const response = await setDoc(doc(db, "users", uid), {
        firstName: firstName.value,
        surName: surName.value,
        dob: `${dayValue} ${monthValue}, ${yearValue}`,
        email: signupEmail.value,
        phoneNum: phnNum.value,
        gender: gender
    });

    window.location.href = '../loginpage/index.html';
  } catch (error) {
    console.log(error)
  }
    
}




// for(i = 0; i < day.length; i++){
//     day[i].addEventListener('click', () => {
//         console.log(day[i])
//     })
// }



// var dayBtn = document.querySelector('.dayBtn')
// var monthBtn = document.querySelector('.monthBtn')
// var yearBtn = document.querySelector('.yearBtn')
// var dayBtn = document.querySelector('.dayBtn')

// var day = document.querySelectorAll('.day')
// console.log(day)
// var month = document.querySelectorAll('.month')
// var year = document.querySelectorAll('.year')

// var string = 'soban'
// console.log(string.length)



// let dayValue;
// let monthValue;
// let yearValue;
// let gender;

// let persons = JSON.parse(localStorage.getItem('persons')) || []
// console.log(persons)

// createBtn.addEventListener('click', createHandler)
// signUpBtn.addEventListener('click', signUpHandler)
// loginBtn.addEventListener('click', loginHandler)

// function createHandler() {
//     overlay.classList.remove('hidden')

// }


// function loginHandler() {
//     console.log(loginEmail.value)
//     console.log(loginPassword.value)

//     if(loginEmail.value !== '' && loginPassword.value !== ''){
        
//         if(loginEmail.value.indexOf('@mail.com') === -1) return alert('Please enter a valid email address');

//     } else return alert('Please fill out the fields');

//     const personDetected = persons.filter((person) => {
//         return person.email === loginEmail.value
//     })

//     console.log(personDetected);

//     if(!personDetected.length) return alert('This email is not registered, please create an account before logging in.');

//     if(loginPassword.value === personDetected[0].password){
//         alert('User is logging in');

//         localStorage.setItem('isloggedUser', JSON.stringify(personDetected[0]));

//         window.location.href="./landingpage/index.html";

//     } else {
//         alert('User credentials mismatched!');
//     }
// }


// function signUpHandler() {
    
//     const personDetected = persons.filter((person) => {
//         return person.email === signupEmail.value;
//     })

//     console.log(personDetected)

//     if(personDetected.length) return alert("Email address already in use, please use another email address");


//     // var signupChar = signUpPass.value

//     if(firstName.value !== '' && firstName.value !== '' && signupEmail.value !== '' && signUpPass.value !== '' && dayValue !== undefined && monthValue !== undefined && yearValue !== undefined && gender !== undefined){
//         if(signUpPass.value.length < 8){
//             alert('Password must contain of atleast 8 characters.');
//         }

//         var personData = {
//             fname: firstName.value,
//             lname: surName.value,
//             dob: new Date(`${yearValue}-${monthValue}-${dayValue}`),
//             email: signupEmail.value,
//             password: signUpPass.value,
//             genderIdentity: gender,
//         };

    
//         persons.push(personData)

//         localStorage.setItem('persons', JSON.stringify(persons));

        
//         alert("Click 'Ok' to signup!")

//         firstName.value = ""
//         surName.value = ""
//         new Date(`${yearValue}-${monthValue}-${dayValue}`) 
//         signupEmail.value = ""
//         signUpPass.value = ""
//         gender = ""
//     }

//     else{
//         alert('Please fill out all the fields')
//     }
// }




