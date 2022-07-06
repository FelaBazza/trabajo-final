import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
//import { buildCard } from "./index.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDu6a0FN4-vHlNzQSrI499B4TpLuvHZwoU",
  authDomain: "trabajo-final-carrito.firebaseapp.com",
  projectId: "trabajo-final-carrito",
  storageBucket: "trabajo-final-carrito.appspot.com",
  messagingSenderId: "958330774667",
  appId: "1:958330774667:web:6f2395e5618e09c5fee08e",
  measurementId: "G-05RHSE6QCZ"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

// Traer documentos






export const getProducts = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));
    const products = []

    querySnapshot.forEach((doc) => {
      products.push (doc);
           
   
   
});
   return products;
 
}
  export const getProduct = async (id)=> {

  const docRef = doc(db, "productos", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

     return docSnap;

}    else {

   
     console.log("No such document!");

}
}