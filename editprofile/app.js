const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const phoneNum = document.getElementById('phNum');
const profilePicPath = document.getElementById('myfile');
const editBtn = document.querySelector('.editBtn');



// import { storage, ref, uploadBytesResumable, getDownloadURL, onAuthStateChanged, auth, db, doc, getDoc  } from "../firebaseconfig.js";


// onAuthStateChanged(auth, (user) => {
//     if (user) {
    
//       const uid = user.uid;
//       fetchingUserData(uid);
//     } else {
//       // User is signed out
//       // ...
//       window.location.href = '../signUpPage/index.html'
//     }
//   });


// async function fetchingUserData(userId) {
//    try {
//         const docRef = doc(db, "users", userId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             console.log("Document data:", docSnap.data());
//             let  {firstName: fname, dob, gender, surName, phnNum} = docSnap.data();
//             console.log(fname, dob, surName, gender, phnNum);

//             firstName.value = fname;
//             // gender.value = gender;
//             lastName.value = surName;
//             phoneNum.value = phnNum;

//         } else {
//             console.log("No such document!");
//         }
//    } catch (error) {
//         alert(error);
//    } 
    
// }



let editHandler = function  () {
    
    console.log(firstName.value, lastName.value, phoneNum.value, profilePicPath.files[0])
    // Create the file metadata
//     /** @type {any} */
//     const metadata = {
//         contentType: 'image/jpeg'
//     };
  
//   // Upload file and metadata to the object 'images/mountains.jpg'
// //   const storageRef = ref(storage, 'images/' + file.name);
//   const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
//   // Listen for state changes, errors, and completion of the upload.
//   uploadTask.on('state_changed',
//   (snapshot) => {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//       switch (snapshot.state) {
//           case 'paused':
//               console.log('Upload is paused');
//               break;
//               case 'running':
//                   console.log('Upload is running');
//                   break;
//                 }
//             }, 
//             (error) => {
//                 // A full list of error codes is available at
//                 // https://firebase.google.com/docs/storage/web/handle-errors
//                 switch (error.code) {
//                     case 'storage/unauthorized':
//           // User doesn't have permission to access the object
//           break;
//           case 'storage/canceled':
//               // User canceled the upload
//               break;
              
//               // ...
  
//               case 'storage/unknown':
//                   // Unknown error occurred, inspect error.serverResponse
//                   break;
//                 }
//             }, 
//     () => {
//       // Upload completed successfully, now we can get the download URL
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//         });
//     }
//     );
    
}

editBtn.addEventListener('click', editHandler);