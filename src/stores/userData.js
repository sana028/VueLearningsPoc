import { defineStore } from "pinia";
import { db, storage } from "@/firebaseConfig.mjs";
import { doc, getDoc, updateDoc, arrayUnion , arrayRemove } from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";
import { DOWNLOAD, DOWNLOADSDOC } from "@/helpers/DB/constant.mjs";

export const useSearchStore = defineStore("search", () => {
  const downloadTheFile = (fielName) => {
    const starsRef = storageRef(storage, `${fielName}`);
    console.log(starsRef);
    getDownloadURL(starsRef)
      .then(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok.");

        const blob = await response.blob();
        const tempUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = tempUrl;
        anchor.download = fielName;

        document.body.appendChild(anchor);
        anchor.click();

        document.body.removeChild(anchor);

        setTimeout(() => {
          URL.revokeObjectURL(tempUrl);
        }, 100);
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            alert("you doesn't have permission to downloaf");
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
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
    } catch (error) {
      console.log(error);
    }
  };

  const getFileNames = async () => {
    try {
      const docRef = doc(db, DOWNLOAD, DOWNLOADSDOC);
      await getDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTheFile = async (fileName,file) => {

    const deleteRef = storageRef(storage, `${fileName}`);
    deleteObject(deleteRef)
      .then(() => {
        alert("deleted successfully");
        const docRef = doc(db,DOWNLOAD,DOWNLOADSDOC);
        updateDoc(docRef,{files:arrayRemove(file)});
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  return { downloadTheFile, storeFileName, getFileNames, deleteTheFile };
});
