import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import fire from "../../firebase";
import {Button} from "@mui/material";

const HomePage = () => {
    const auth = getAuth(fire);

    const signOutUser = () => {

        signOut(auth).then((res:any) => {
            // Sign-out successful.
            console.log(res)
        }).catch((error:any) => {
            console.log(error)
            // An error happened.
        });
    }

    return (
        <div className=''>
            <Button onClick={signOutUser}>signOut</Button>
        </div>
    );
};

export default HomePage;
