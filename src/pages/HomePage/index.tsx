import { Button } from '@mui/material';
import React from 'react';
import axios from "axios";
import {fireDb} from "../../firebase";
import {collection, doc, getDoc, query, where} from 'firebase/firestore';

const HomePage = () => {


    const showMeMore = async () => {
        const userEmail = window.localStorage.getItem('userEmail')
        // const accessToken = window.localStorage.getItem('accessToken')

        // axios({
        //     url: `https://trello-ts-react.firebaseapp.com/users/${userEmail}.json?auth=${accessToken}/`
        // }).then(res => {
        //     console.log(res)
        // })

        if(userEmail){
            const getDocRef = doc(fireDb, `users/${userEmail}`);
            const docSnap = await getDoc(getDocRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

    }

    return (
        <div>
            Home Page
            <div>
                <Button onClick={showMeMore}>show</Button>
            </div>
        </div>
    );
};

export default HomePage;
