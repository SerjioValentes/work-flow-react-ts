import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fire, {fireDb} from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(fire);

export const createNewUser = async (email: any, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userInfo = {
                email: userCredential?.user?.email,
                uid: userCredential?.user?.uid,
            }
            setFirestoreCollection(userInfo)
        })
        .catch((error) => {
            console.log(error)
        });
}


const setFirestoreCollection = async (userInfo: { uid: any; email: any }) => {
    await setDoc(doc(fireDb, "users", userInfo.email), userInfo);
}
