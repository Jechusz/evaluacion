import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyB_fMpXYCm5VZVYQ6Zzcue6lca3ujpsbgM",
    authDomain: "trabajadores-3cd6a.firebaseapp.com",
    projectId: "trabajadores-3cd6a",
    storageBucket: "trabajadores-3cd6a.appspot.com",
    messagingSenderId: "435165697916",
    appId: "1:435165697916:web:8adb57e1e9bf4562bc36f9",
    measurementId: "G-E0RBWM0JTR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = (empleado) => {
    addDoc(collection(db, 'Trabajadores'), empleado)
}

export const getAll = (data) => {
    onSnapshot(collection(db, 'Trabajadores'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'Trabajadores', id))
}

export const selectOne = (id) => getDoc(doc(db, 'Trabajadores', id))

export const edit = (id, Pobres) => {
    updateDoc(doc(db, 'Trabajadores', id), Pobres)
}

export const checkDuplicate = async (run) => {
    const q = query(collection(db, 'Trabajadores'), where('run', '==', run))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
}
