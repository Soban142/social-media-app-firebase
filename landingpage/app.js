// var isLoggedInUser = JSON.parse(localStorage.getItem('isloggedUser'))
// console.log(isLoggedInUser)

const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const phnNum = document.getElementById('userContactNo');
const userGender = document.getElementById('userGender');
const userDescription = document.getElementById('userDescription');
const userImage = document.getElementById('userImage');
const logOutBtn = document.querySelector('.logoutBtn');
const myProfile = document.querySelector('.myProfile');
const userPostingImg = document.querySelector('.userPostingImg')

// Getting elements for creation of a post.
const hidden = document.querySelector('.hidden');
const overlay = document.querySelector('.overlay')
const creationOfPost =  document.querySelector('.postField');
const postDescription = document.querySelector('.postCaption');
const uploadPostImg = document.querySelector('#uploadPostImg')
const postBtn = document.querySelector('.postBtn');
const postBox = document.querySelector('.postBox');
const postDiv = document.querySelector('.postDiv');


import { getAuth, getFirestore, auth, db, doc, getDoc, onAuthStateChanged, signOut, setDoc, addDoc, collection, query, getDocs, ref, uploadBytesResumable, getDownloadURL, storage, updateDoc, deleteDoc, serverTimestamp, orderBy } from "../firebaseconfig.js";

console.log(serverTimestamp, "==>>>serverTimestamp")

let currentUser;

addPostData()

let postIdUniversal;

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

                let {dob, email, firstName, gender, surName, phoneNum, profilePic} = docSnap.data();
                console.log(surName)
                userName.textContent = `${firstName} ${surName}`;
                userEmail.textContent = email;
                phnNum.textContent = phoneNum;
                userImage.src = `${profilePic || '../assests/avatarDummy.png'}`,
                userDescription.textContent = userData.userDescription || "No description added";
                userGender.textContent = gender;
                userPostingImg.src = `${profilePic || '../assests/avatarDummy.png'}`

            } else {
                console.log("No such document!");
            }
        } catch (error){
            console.log(error)
        }
    }

    creationOfPost.addEventListener('click', postCreator);
    postBtn.addEventListener('click', postHandler)

    overlay.addEventListener('click', () => {
        postBox.classList.add('hidden');
        overlay.classList.add('hidden');
    })

    function postCreator () {
        postBox.classList.remove('hidden');
        overlay.classList.remove('hidden');

        // postDescription.disabled = true;
        postDescription.focus()
    } 

async function postHandler() {
    postBox.classList.add('hidden');
    overlay.classList.add('hidden');

    
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    const file = uploadPostImg.files[0];
    console.log(file)

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        }
    }, 
    (error) => {
        
        switch (error.code) {
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;
        case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
            try {
                 const docRef = await addDoc(collection(db, "posts"), {
                     postCaption: postDescription.value,
                     authorId : currentUser,
                     postImage : downloadURL,
                     postTime: serverTimestamp()
            });
                 addPostData(currentUser)

                console.log("Document written with ID: ", docRef.id);
                postId = docRef.id;
          } catch (e) {
                console.error("Error adding document: ", e);
          }
        });
    }
);
}

async function updatePostHandler() {
    postBox.classList.add('hidden');
    overlay.classList.add('hidden');

    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };
  
    const file = uploadPostImg.files[0];
  // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        const washingtonRef = doc(db, "posts", postIdUniversal);
        try {
            await updateDoc(washingtonRef, {
                postCaption: postDescription.value,
                authorId : currentUser,
                postImage : downloadURL,
                postTime: serverTimestamp()
            });
            addPostData();
        } catch (error) {
            console.log(error)
        }
      });
    }
  );
    postBtn.adaEventListener('click', postHandler)
    postBtn.removeEventListener('click', updatePostHandler)
}


function editHandler(postId) {
    postCreator();
    console.log('edit handler working')
    console.log(postId)

    postIdUniversal = postId

    postBtn.removeEventListener('click', postHandler)
    postBtn.addEventListener('click', updatePostHandler)
}

async function deleteHandler(postId) {
    console.log(postId, "delete button working properly")

    await deleteDoc(doc(db, "posts", postId));
    alert("Your post deleted successfully")
    addPostData();
}

async function addPostData(userId) {

    postDiv.innerHTML = ''

    const q = query(collection(db, "posts"), orderBy("postTime", "desc"));
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach(async (doc) => {
        // console.log(doc.data().authorId)
        // console.log(doc.id, '===>', doc.data());
        // let postTime = new Date().getTime();
        let {authorId, postCaption, postImage, postTime} = doc.data();
        console.log(new Date(postTime.seconds * 1000))
        console.log(postTime)
        const authorDetails = await getAuthorData(authorId);

        var postContent = 
        `<div class="post">
            <div class="authorDetails">
                <div class="postUpperDiv">
                    <div>
                        <img src="${authorDetails.profilePic || '../assests/avatarDummy.png'}" alt="" class="userPostImg">
                    </div>
                    <div>
                        <div class="postData postUserName">${authorDetails?.firstName} ${authorDetails?.surName}</div>
                        <div class="postData postUserDesc">${authorDetails.userDescription || "No description added"}</div>
                        <div class="postData postTime">${new Date(postTime.seconds * 1000)}</div>
                    </div>
                </div>${authorId === currentUser ? `<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    :
                </button>
                <ul class="dropdown-menu">
                    <div>
                        <li><button class="dropdown-item" type="button" onClick="editHandler('${doc.id}')">Edit</button></li>
                        <li><button class="dropdown-item" type="button" onClick="deleteHandler('${doc.id}')">Delete </button></li>
                    </div>
                </ul>
            </div>` : ''}        
            </div>
            <div class="postCaption">${postCaption}</div>
            <div>
                <img src="${postImage || '../assests/dummyPostImage.jpg'}" alt="" id="postImage">
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

logOutBtn.addEventListener('click', logoutHandler)

function logoutHandler() {
    signOut(auth).then(() => {
        console.log(`Sign-out successful`)
        window.location.href = "../loginpage/index.html"
    }).catch((error) => {
        console.error(error)
    });
}


window.editHandler = editHandler;
window.deleteHandler = deleteHandler;

















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
// if(isLoggedInUser.description){
//     userDescription.innerText = `${isLoggedInUser.description}`
// } else{
//     userDescription.innerText= 'No description added'
// }

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

// // myProfile.addEventListener('click', profileHnadler)



// posts.forEach((post) => {
//     var postContent = `<div class="post">
//     <div class="authorDetails">
//         <img src="../assests/avatarDummy.png" alt="" class="userPostImg">
//         <div class="">
//             <div class="postData postUserName">${post.postUserName}</div>
//             <div class="postData postUserDesc">${post.postUserDescription || "No description added"}</div>
//             <div class="postData postTime">${post.postTime}</div>
//         </div>
//     </div>
//         <div class="postCaption">${post.postCaption}</div>
//         <div>
//             <img src="../assests/dummyPostImage.jpg" alt="" id="postImage">
//         </div>
//     </div>`;

//     var postParent = document.createElement('div');
//     postParent.innerHTML = postContent;


//     postDiv.appendChild(postParent);

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


// // postDiv.appendChild(postParent);


// postBox.classList.add('hidden');
// overlay.classList.add('hidden');

// let postData = {
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

// console.log(new Date().toLocaleString().split(',')[1])



// if('1' === '1'){
//     console.log('largest')
// }

// else{
//     console.log('not largest')
// }