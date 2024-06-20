import { defineStore } from "pinia";
import { db, storage } from "@/firebaseConfig.mjs";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { DOWNLOAD, DOWNLOADSDOC } from "@/helpers/DB/constant.mjs";


export const useSearchStore = defineStore('search', () => {
    const downloadTheFile = (fielName) => {
        const starsRef = storageRef(storage, `${fielName}`);
        getDownloadURL(starsRef)
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    //   const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
            })
            .catch((error) => {

                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
    };

    const storeFileName = async (file) => {
        try {
            console.log(file);
            const docRef = doc(db, DOWNLOAD, DOWNLOADSDOC);
            await updateDoc(docRef, { files: arrayUnion(file) });
        }
        catch (error) {
            console.log(error);
        }

    }

    const getFileNames = async () => {
        try {
            const docRef = doc(db, DOWNLOAD, DOWNLOADSDOC);
            await getDoc(docRef);
        } catch (error) {
            console.log(error);
        }
    }

    return { downloadTheFile, storeFileName, getFileNames }
})
