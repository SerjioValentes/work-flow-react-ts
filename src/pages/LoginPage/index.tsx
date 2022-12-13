import React, {useState} from 'react';
import {useStore} from 'effector-react';
import $store, {setNewEmail, setNewPassword} from '../../store/store';

import {Button, TextField} from "@mui/material";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import fire from "../../firebase";

const LoginPage = () => {
    const loginPageStore = useStore($store);
    const auth = getAuth(fire);

    const [isSignUp, setIsSignUp] = useState(false)

    // test functions
    const checkSome = () => {console.log(loginPageStore)}

    // change sign In log In buttons
    const changeSignLogIn = () => {setIsSignUp(prevState => !prevState)}
    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, loginPageStore.email, loginPageStore.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('userCredential:')
                console.log(user)
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    }

    const logIn = () => {
        createUserWithEmailAndPassword(auth, loginPageStore.email, loginPageStore.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('user:')
                console.log(user)
                console.log('----------')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode:')
                console.log(errorCode)
                console.log('----------')
                console.log('errorMessage:')
                console.log(errorMessage)
            });

    }

    return (
        <div>
            <div className='border-sky-500 flex h-screen'>
                <div className='m-auto p-20 rounded-xl border-2 border-'>
                    <div>
                        <button onClick={checkSome}>LogIn / SignIn</button>
                    </div>

                    <div>
                        <TextField
                            value={loginPageStore.email}
                            onChange={(e) => setNewEmail(e.target.value)}
                            sx={{my: 2}}/>
                    </div>

                    <div>
                        <TextField
                            value={loginPageStore.password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{my: 2}}/>
                    </div>
                    <div className='flex justify-end'>
                        <Button onClick={changeSignLogIn}>{isSignUp ? 'Sign In' : 'Log In'}</Button>
                    </div>

                    {isSignUp ?
                    <div className='text-center mt-6'>
                        <Button onClick={logIn} type='submit' variant='contained'>Log In</Button>
                    </div>
                        :
                    <div className='text-center mt-6'>
                        <Button onClick={signIn} type='submit' variant='contained'>Sign In</Button>
                    </div>}

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
