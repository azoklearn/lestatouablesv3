// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVU1_aeRg-k4LOuOsBErY14kvMMS4Kbco",
  authDomain: "lestatouables-43ef0.firebaseapp.com",
  projectId: "lestatouables-43ef0",
  storageBucket: "lestatouables-43ef0.firebasestorage.app",
  messagingSenderId: "1026149035253",
  appId: "1:1026149035253:web:c2adfa4fcbd932983a69bc",
  measurementId: "G-T15QVPBS2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Fonctions pour gérer les données
export const firebaseService = {
    // Flash items
    async getFlashItems() {
        try {
            const querySnapshot = await getDocs(collection(db, 'flashItems'));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Erreur lors de la récupération des flash items:', error);
            return [];
        }
    },

    async addFlashItem(item) {
        try {
            const docRef = await addDoc(collection(db, 'flashItems'), item);
            return docRef.id;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du flash item:', error);
            throw error;
        }
    },

    async updateFlashItem(id, item) {
        try {
            await updateDoc(doc(db, 'flashItems', id), item);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du flash item:', error);
            throw error;
        }
    },

    async deleteFlashItem(id) {
        try {
            await deleteDoc(doc(db, 'flashItems', id));
        } catch (error) {
            console.error('Erreur lors de la suppression du flash item:', error);
            throw error;
        }
    },

    // LDermo creations
    async getLDermoCreations() {
        try {
            const querySnapshot = await getDocs(collection(db, 'ldermoCreations'));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Erreur lors de la récupération des créations LDermo:', error);
            return [];
        }
    },

    async addLDermoCreation(creation) {
        try {
            const docRef = await addDoc(collection(db, 'ldermoCreations'), creation);
            return docRef.id;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la création LDermo:', error);
            throw error;
        }
    },

    async updateLDermoCreation(id, creation) {
        try {
            await updateDoc(doc(db, 'ldermoCreations', id), creation);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la création LDermo:', error);
            throw error;
        }
    },

    async deleteLDermoCreation(id) {
        try {
            await deleteDoc(doc(db, 'ldermoCreations', id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la création LDermo:', error);
            throw error;
        }
    },

        // Sinkolor creations
        async getSinkolorCreations() {
            try {
                const querySnapshot = await getDocs(collection(db, 'sinkolorCreations'));
                return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Erreur lors de la récupération des créations Sinkolor:', error);
                return [];
            }
        },

        // LDermo tarifs
        async getLDermoTarifs() {
            try {
                const querySnapshot = await getDocs(collection(db, 'ldermoTarifs'));
                return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Erreur lors de la récupération des tarifs LDermo:', error);
                return [];
            }
        },

        async addLDermoTarif(tarif) {
            try {
                const docRef = await addDoc(collection(db, 'ldermoTarifs'), tarif);
                return docRef.id;
            } catch (error) {
                console.error('Erreur lors de l\'ajout du tarif LDermo:', error);
                throw error;
            }
        },

        async updateLDermoTarif(id, tarif) {
            try {
                await updateDoc(doc(db, 'ldermoTarifs', id), tarif);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du tarif LDermo:', error);
                throw error;
            }
        },

        async deleteLDermoTarif(id) {
            try {
                await deleteDoc(doc(db, 'ldermoTarifs', id));
            } catch (error) {
                console.error('Erreur lors de la suppression du tarif LDermo:', error);
                throw error;
            }
        },

    async addSinkolorCreation(creation) {
        try {
            const docRef = await addDoc(collection(db, 'sinkolorCreations'), creation);
            return docRef.id;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la création Sinkolor:', error);
            throw error;
        }
    },

    async updateSinkolorCreation(id, creation) {
        try {
            await updateDoc(doc(db, 'sinkolorCreations', id), creation);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la création Sinkolor:', error);
            throw error;
        }
    },

    async deleteSinkolorCreation(id) {
        try {
            await deleteDoc(doc(db, 'sinkolorCreations', id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la création Sinkolor:', error);
            throw error;
        }
    },

    // Écouter les changements en temps réel
    onFlashItemsChange(callback) {
        return onSnapshot(collection(db, 'flashItems'), callback);
    },

    onLDermoCreationsChange(callback) {
        return onSnapshot(collection(db, 'ldermoCreations'), callback);
    },

        onSinkolorCreationsChange(callback) {
            return onSnapshot(collection(db, 'sinkolorCreations'), callback);
        },

        onLDermoTarifsChange(callback) {
            return onSnapshot(collection(db, 'ldermoTarifs'), callback);
        }
};
