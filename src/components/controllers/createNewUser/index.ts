import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import fire, {fireDb} from "../../../firebase";
import {arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";
import {addNewGift} from "../addNewGift";


const auth = getAuth(fire);

export const createNewUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const userInfo = {
                email: userCredential?.user?.email,
                uid: userCredential?.user?.uid,
                tasks: [],
                giftBoards: [],
                invitedFrom: []
            }

            setFirestoreCollection(userInfo)
        })
        .catch((error) => {
            console.log(error)
        });
}


const setFirestoreCollection = async (userInfo: { uid: any; email: any; tasks: any }) => {
    await setDoc(doc(fireDb, "users", userInfo.email), userInfo);
    // await setDoc(doc(fireDb, "unionInfo", 'unionInfo'), userInfo);
    const docRef = doc(fireDb, "unionInfo", 'unionInfo')
    await updateDoc(docRef, {
        allUsers: arrayUnion(userInfo.email)
    });

    console.log('creatNeUser')
}
