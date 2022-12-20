import {arrayRemove, arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import {fireDb} from "../../../firebase";

export const getUsersCollection = async (path: string, secondPath: string) => {
    const docRef = await doc(fireDb, "users", path);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data: any = docSnap.data()
        return data[secondPath]
    } else console.log("No such document!");
}


export const updateUserDocInCollections = async (email: string, removeArray:any, arrayUnion: any, pathRemove:string) => {
    const userCollection = doc(fireDb, "users", email);

    await updateDoc(userCollection, {
        [pathRemove]: arrayRemove(removeArray)
    })

    await updateDoc(userCollection, {
        [pathRemove]: arrayUnion(arrayUnion)
    }).then()
}


// Add data to collection
// await db.collection('cities').doc('new-city-id').set(data);
