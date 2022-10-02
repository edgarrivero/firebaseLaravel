// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, onSnapshot, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3bzbCK79ATn5JRmoawEEVhp0LB6vcrz4",
    authDomain: "testsert-b4494.firebaseapp.com",
    databaseURL: "https://testsert-b4494-default-rtdb.firebaseio.com",
    projectId: "testsert-b4494",
    storageBucket: "testsert-b4494.appspot.com",
    messagingSenderId: "269145679875",
    appId: "1:269145679875:web:31022e45368cf76fcc8636",
    measurementId: "G-3ELRTL385G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

export const saveTask = (amount,date,typeCar,user) => {
    const docRef = addDoc(collection(db, 'comprobante'), {
        cantidad: amount,
        created_at: date,
        esverificado: true,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuvg8_C7Oo9ZZiP_ok5EYkpmo6e1VjT4w3Lrq9px51uVqsYW2boae0F9c0suMbIvRzuzk&usqp=CAU",
        nombreSolicitante: user,
        tipoVehiculo: typeCar
    })

    return docRef;
}

export const getTask = () => getDocs(collection(db, 'comprobante'));

export const onGetTasks = (callback) => onSnapshot(collection(db,'comprobante'), callback)

export const deleteTask = (id) => deleteDoc(doc(db,"comprobante",id));

export const editTask = (id) => getDoc(doc(db,"comprobante",id));

export const updateTask = (id, newFields) => updateDoc(doc(db,"comprobante",id),newFields);


