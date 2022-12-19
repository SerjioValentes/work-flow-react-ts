import React, {useState} from 'react';
import {useStore} from 'effector-react';
import $store, {setAccessTokenToStore, setNewEmail, setNewPassword} from '../../store/store';
import {Box, Button, TextField, Typography} from "@mui/material";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import fire, {fireDb} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";


const LoginPage = () => {
    // FireBase auth
    const auth = getAuth(fire);

    // Effector store
    const loginPageStore = useStore($store);

    // React states
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorData, setErrorData] = useState<string | null>(null);
    const [errorEmail, setErrorEmail] = useState<string | null>(null);

    const navigate = useNavigate();

    // Test functions
    const checkSome = () => {
        console.log(loginPageStore);
    };

    const validateEmail = (email: any) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const clearAllErrors = () => {
        setErrorEmail(null);
        setErrorData(null);
    };

    // Change sign In log In buttons
    const changeSignLogIn = () => {
        clearAllErrors();
        setIsSignUp(prevState => !prevState);
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, loginPageStore.email, loginPageStore.password)
            .then((userCredential: any) => {
                // setAccessToken(userCredential.user.accessToken);

                window.localStorage.setItem('accessToken', userCredential.user.accessToken);
                window.localStorage.setItem('userEmail', userCredential.user.email);
                setAccessTokenToStore(userCredential.user.accessToken);
                navigate("/", {replace: true});
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password')
                    setErrorData('Wrong password or email');

                if (errorCode === 'auth/user-not-found')
                    setErrorData('User not found');
            });
    };

    const logIn = () => {
        clearAllErrors();
        if (validateEmail(loginPageStore.email) !== null) {
            setErrorEmail(null);

            createUserWithEmailAndPassword(auth, loginPageStore.email, loginPageStore.password)
                .then((userCredential) => {

                    const userInfo = {
                        email: userCredential?.user?.email,
                        uid: userCredential?.user?.uid,
                        tasks: [],
                        giftBoards: [],
                        invitedFrom: [],
                    }

                    setFirestoreCollection(userInfo)
                        .then(() => {signIn()})
                })
                .catch((error) => {
                    const errorCode = error.code;

                    if (errorCode === 'auth/email-already-in-use')
                        setErrorEmail('This email already in use');

                    if (errorCode === 'auth/weak-password')
                        setErrorData('Password should be at least 6 characters');
                });
        } else
            setErrorEmail('Enter correct email address')
    };

    // Adding first document to user collection
    const setFirestoreCollection = async (userInfo: { uid: any; email: any; tasks: any }) => {
        await setDoc(doc(fireDb, "users", userInfo.email), userInfo);
        // await setDoc(doc(fireDb, "unionInfo", 'unionInfo'), userInfo);

        const docRef = doc(fireDb, "unionInfo", 'unionInfo')

        await updateDoc(docRef, {
            allUsers: arrayUnion(userInfo.email)
        });

    }

    return (
        <div className='border-sky-500 flex h-screen'>
            <Box sx={{
                m: 'auto',
                p: 20,
                borderRadius: 10,
                border: '1px solid black',
                boxShadow: '67px 36px 0px -6px #546e7a',
                color: 'se'

            }}>
                <div>
                    <Typography variant='h3' fontFamily='monospace'>Enter</Typography>
                </div>

                <div>
                    <TextField

                        value={loginPageStore.email}
                        onChange={(e) => setNewEmail(e.target.value)}
                        sx={{
                            my: 2
                        }}/>
                </div>

                <div className='text-xs text-error'>{errorEmail !== null && errorEmail}</div>

                <div>
                    <TextField
                        type='password'
                        value={loginPageStore.password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{my: 2}}/>
                </div>

                <div className='text-xs text-error'>{errorData !== null && errorData}</div>

                <div className='flex justify-end'>
                    <Button
                        sx={{
                        fontFamily: 'monospace',
                        m: 0,
                        p: 0
                    }}
                            onClick={changeSignLogIn}>{isSignUp ? 'Sign In' : 'Sign Up'}</Button>
                </div>

                {!isSignUp ?
                    <div className='text-center mt-6'>
                        <Button
                            sx={{
                                py: 1,
                                px: 4,
                                fontFamily: 'monospace',
                            }}
                            color='secondary' onClick={signIn} type='submit' variant='contained'>Sign In</Button>
                    </div>
                    :
                    <div className='text-center mt-6'>
                        <Button onClick={logIn} type='submit' variant='contained'>Sign Up</Button>
                    </div>}

            </Box>
        </div>
    );
};

export default LoginPage;
