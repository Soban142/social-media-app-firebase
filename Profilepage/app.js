var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userGender = document.getElementById('userGender');
var userDescription = document.getElementById('userDescription');
var logOutBtn = document.querySelector('.logoutBtn');
var myProfile = document.querySelector('.myProfile');

// Getting elements for creation of a post.
var hidden = document.querySelector('.hidden');
const overlay = document.querySelector('.overlay')
var creationOfPost =  document.querySelector('.postField');
var postDescription = document.querySelector('.postCaption')
const postBtn = document.querySelector('.postBtn');
const postBox = document.querySelector('.postBox');
const postDiv = document.querySelector('.postDiv');


import { getAuth, getFirestore, signOut, auth, db, doc, getDoc, onAuthStateChanged, setDoc, addDoc, collection, query, getDocs, where } from "../firebaseconfig.js";

let currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uniqueIdOfCurrentData = user.uid;
        addUserData(uniqueIdOfCurrentData);
        currentUser = uniqueIdOfCurrentData;
    } else {
        window.location.href = '../loginpage/index.html'
    }
  });


async function addUserData(uid) {
    try{
        const docRef = await doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const userData = docSnap.data();

            let {dob, email, firstName, gender, Surname} = docSnap.data();

            userName.textContent = `${firstName} ${Surname}`
            userEmail.textContent = email;
            userDescription.textContent = userData.userDescription || "No description added";
            userGender = gender;

        } else {
            console.log("No such document!");
        }
    } catch (error){
        console.log(error)
    }
}

creationOfPost.addEventListener('click', postCreator);
postBtn.addEventListener('click', postHandler)

function postCreator () {
    postBox.classList.remove('hidden');
    overlay.classList.remove('hidden');
} 

async function postHandler() {
    postBox.classList.add('hidden');
    overlay.classList.add('hidden');

    try {
        const docRef = await addDoc(collection(db, "posts"), {
            postCaption: postDescription.value,
            authorId : currentUser
        });
        addPostData(currentUser)
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


async function addPostData(userId) {

    postDiv.innerHTML = ''
    const q = query(collection(db, "posts"), where ('authorId', "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( async (doc) => {
        
        let postTime = new Date().getTime()
        let {authorId, postCaption} = doc.data();
        console.log(doc.id)
        const authorDetails = await getAuthorData(authorId);

        var postContent = `<div class="post">
            <div class="authorDetails">
                <img src="../assests/avatarDummy.png" alt="" class="userPostImg">
                <div class="">
                    <div class="postData postUserName">${authorDetails?.firstName} ${authorDetails?.surName}</div>
                    <div class="postData postUserDesc">${authorDetails.userDescription || "No description added"}</div>
                    <div class="postData postTime">${postTime}</div>
                </div>
            </div>
                <div class="postCaption">${postCaption}</div>
                <div>
                    <img src="../assests/dummyPostImage.jpg" alt="" id="postImage">
                </div>
            </div>`;

        var postParent = document.createElement('div');
        postParent.innerHTML = postContent;

        postDiv.appendChild(postParent);
    });
}

async function getAuthorData(authorUId) {
    const docRef = doc(db, "users", authorUId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}































































// var isLoggedInUser = JSON.parse(localStorage.getItem('isloggedUser'))
// console.log(isLoggedInUser)

// var userName = document.getElementById('userName');
// var userEmail = document.getElementById('userEmail');
// var userGender = document.getElementById('userGender');
// var userDescription = document.getElementById('userDescription');
// var creationOfPost =  document.querySelector('.postField');
// var logOutBtn = document.querySelector('.logoutBtn');
// var myProfile = document.querySelector('.myProfile');


// if(!isLoggedInUser){
//     window.location.href="../index.html";
// }

// logOutBtn.addEventListener('click', () => {
//     // localStorage.removeItem
//     window.location.href="../index.html";
// })

// userName.textContent = `${isLoggedInUser.fname} ${isLoggedInUser.lname}`
// userEmail.textContent = `${isLoggedInUser.email}`
// userGender.textContent = `${isLoggedInUser.genderIdentity}`
// // if(isLoggedInUser.description){
// //     userDescription.innerText = `${isLoggedInUser.description}`
// // } else{
// //     userDescription.innerText= 'No description added'
// // }

// userDescription.innerText = isLoggedInUser.description || "No description added"


// //   || CREATION OF A POST


// var hidden = document.querySelector('.hidden');
// var postBox = document.querySelector('.postBox');
// var overlay = document.querySelector('.overlay');
// var postBtn = document.querySelector('.postBtn');
// var postDiv = document.querySelector('.postDiv');
// var postDescription = document.querySelector('.postCaption')


// let posts = JSON.parse(localStorage.getItem('posts')) || []

// // console.log(posts)





// posts.filter(post => post.postUserEmail === isLoggedInUser.email).forEach((post) => {
//     var postContent = `<div class="post">
//     <div class="authorDetails">
//         <img src="../assests/avatarDummy.png" alt="" class="userPostImg">
//         <div class="">
//             <div class="postData postUserName">${post.postUserName}</div>
//             <div class="postData postUserDesc">${post.postUserDescription || "No description added"}</div>
//             <div class="postData postTime">${post.postTime}</div>
//         </div>
//     </div>
//     <div class="postCaption">${post.postCaption}</div>
//     <div>
//         <img src="../assests/dummyPostImage.jpg" alt="" id="postImage">
//     </div>
// </div>`;

// var postParent = document.createElement('div');
// postParent.innerHTML = postContent;


// postDiv.appendChild(postParent);

// });



// overlay.addEventListener('click', () => {
//     postBox.classList.add('hidden');
//     overlay.classList.add('hidden');
// })

// creationOfPost.addEventListener('click', postCreator);
// postBtn.addEventListener('click', postHandler)

// function postCreator () {
//     postBox.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// } 

// function postHandler() {
//     var postContent = `<div class="post">
//     <div class="authorDetails">
//         <img src="../assests/avatarDummy.png" alt="" class="userPostImg">
//         <div class="">
//             <div class="postData postUserName">${isLoggedInUser.fname} ${isLoggedInUser.lname}</div>
//             <div class="postData postUserDesc">${isLoggedInUser.description || "No description added"}</div>
//             <div class="postData postTime">${new Date().toLocaleString().split(',')[1]}</div>
//         </div>
//     </div>
//     <div class="postCaption">${postDescription.value}</div>
//     <div>
//         <img src="../assests/dummyPostImage.jpg" alt="" id="postImage">
//     </div>
// </div>`;

// var postParent = document.createElement('div');
// postParent.innerHTML = postContent;
// console.log(postParent);


// postDiv.appendChild(postParent);


// postBox.classList.add('hidden');
// overlay.classList.add('hidden');

// postData = {
//     postUserName : `${isLoggedInUser.fname} ${isLoggedInUser.lname}`,
//     postUserDescription: isLoggedInUser.description,
//     postUserEmail: isLoggedInUser.email,
//     postCaption: postDescription.value.trim(),
//     // postImg: 
//     postTime: new Date().toLocaleString().split(',')[1],
// }

// // console.log(postData.postTime)

// posts.push(postData);

// localStorage.setItem('posts',JSON.stringify(posts));
// }