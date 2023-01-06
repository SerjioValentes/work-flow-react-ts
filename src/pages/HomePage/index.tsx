import { Button, Divider, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
// import { getAuth, signOut } from "firebase/auth";
// import fire from "../../firebase";

const HomePage = () => {

    
    // const auth = getAuth(fire);

    // const chanelLink = {
    //     users: ['user01@test.com', 'user02@test.com'],
    //     dateOfCreation: new Date,
    // }

    const createLink = () => {
        console.log('oj');
        
    }

    return (
        <div>
            <div>

              <div>
            <TextField 
            label='enterUsers'
            />
            <Button>Добавить пользователя</Button>
            </div>  
            <Divider sx={{my: 4}} />
            <Button
            onChange={createLink}
            >Создать ссылку</Button>
            </div>
            

            
        </div>
    );
};

export default HomePage;
