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
import {useNavigate} from "react-router-dom";



const LoginPage = ({setAccessToken}: { setAccessToken: any }) => {
    // FireBase auth
    const auth = getAuth(fire);

    // Effector store
    const loginPageStore = useStore($store);

    // React states
    const [isSignUp, setIsSignUp] = useState(false)
    const [errorData, setErrorData] = useState<string | null>(null)
    const [errorEmail, setErrorEmail] = useState<string | null>(null)

    const navigate = useNavigate()

    // Test functions
    const checkSome = () => {console.log(loginPageStore)}

    const validateEmail = (email:any) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const clearAllErrors = () => {
        setErrorEmail(null)
        setErrorData(null)
    }

    // Change sign In log In buttons
    const changeSignLogIn = () => {
        clearAllErrors()
        setIsSignUp(prevState => !prevState)
    }

    const signIn = () => {

        signInWithEmailAndPassword(auth, loginPageStore.email, loginPageStore.password)
            .then((userCredential:any) => {

                setAccessToken(userCredential.user.accessToken)
                console.log(userCredential.user.accessToken)
                navigate("/", { replace: true });

            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                // const errorMessage = error.message;
                if(errorCode === 'auth/wrong-password')
                    setErrorData('Wrong password or email')

                if(errorCode === 'auth/user-not-found')
                    setErrorData('User not found')

            });
    }

    const logIn = () => {
        clearAllErrors()
        if(validateEmail(loginPageStore.email) !== null){
            setErrorEmail(null)

        createUserWithEmailAndPassword(auth, loginPageStore.email, loginPageStore.password)
            .then((userCredential) => {
                // Signed in
                // const codeError = userCredential.code('auth/weak-password')
                console.log(userCredential.user)
            })
            .catch((error) => {
                const errorCode = error.code;

                console.log(error)
                if(errorCode === 'auth/email-already-in-use')
                    setErrorEmail('This email already in use')

                if(errorCode === 'auth/weak-password')
                    setErrorData('Password should be at least 6 characters')
            });
        }else{
            setErrorEmail('Enter correct email address')
        }
    }

    return (
            <div className='border-sky-500 flex h-screen'>
                <div className='m-auto p-20 rounded-xl border-2 border-'>
                    <div>
                        <button onClick={checkSome}>{isSignUp ? 'Sign In' : 'Log In'}</button>
                    </div>

                    <div>
                        <TextField
                            value={loginPageStore.email}
                            onChange={(e) => setNewEmail(e.target.value)}
                            sx={{my: 2}}/>
                    </div>

                    <div className='text-xs text-error'>{ errorEmail !== null && errorEmail }</div>

                    <div>
                        <TextField
                            type='password'
                            value={loginPageStore.password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{my: 2}}/>
                    </div>

                    <div className='text-xs text-error'>{ errorData !== null && errorData }</div>

                    <div className='flex justify-end'>
                        <Button onClick={changeSignLogIn}>{isSignUp ? 'Sign In' : 'Log In'}</Button>
                    </div>

                    {!isSignUp ?
                    <div className='text-center mt-6'>
                        <Button color='secondary' onClick={signIn} type='submit' variant='contained'>Sign In</Button>
                    </div>
                        :
                    <div className='text-center mt-6'>
                        <Button onClick={logIn} type='submit' variant='contained'>Log In</Button>
                    </div>}

                </div>
            </div>
    );
};

export default LoginPage;
