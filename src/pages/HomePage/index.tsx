import {Button, Divider, IconButton, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {validateEmail} from '../../components/verify'
import {fireDb} from "../../firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import {doc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {createNewUser} from '../../components/createNewUser'
import AddBoxIcon from '@mui/icons-material/AddBox';

const HomePage = () => {
    const [userList, setUserList] = useState<[] | null>(null);
    const [eachUser, setEachUser] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [lockLinkButton, setLockLinkButton] = useState(false)

    const navigate = useNavigate()

    const addUser = () => {
        let userArray = userList

        if (!userList) {
            userArray = []
        }

        if (validateEmail(eachUser)) {
            // @ts-ignore
            userArray.push(eachUser)
            setError(null)
        } else {
            setError('Введите корректное имя пользователя')
        }
        setUserList(userArray)
        setEachUser('')
    }

    const createLink = async () => {
        if (!userList || userList.length === 0)
            return setError('Добавьте пользователей')

        setLockLinkButton(true)

        const data = {
            users: userList,
            timeWhenStarted: new Date().getTime() / 1000
        }
        await setDoc(doc(fireDb, "unionInfo", "unionInfo"), data);

        userList?.map(item => {
            createNewUser(item, '0987654321')
        })
        setLockLinkButton(false)
        navigate('/view-time', {replace: true})

    }

    const addUserOnChange = (e: any) => {
        setEachUser(e.target.value)
    }

    return (
        <div className='w-[100vw] flex'>
            <div className='m-auto'>
                <Typography variant='h5' textAlign='center' sx={{my: 2}}>
                    Добавить пользователя
                </Typography>
                <div className='flex justify-between'>
                    <TextField
                        label='enterUsers'
                        value={eachUser}
                        onChange={addUserOnChange}/>

                    <IconButton onClick={addUser}>
                        <AddBoxIcon fontSize="large"/>
                    </IconButton>
                </div>
                <Typography fontSize={14} color='error'>
                    {error && error}
                </Typography>
                <div>
                    {userList?.map(eachUser =>
                        <div key={eachUser} className='flex justify-between w-[30%]'>
                            <div>
                                {eachUser}
                            </div>

                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </div>)}
                </div>

                <Divider sx={{my: 4}}/>

                <div className='flex justify-center'>
                    <Button disabled={lockLinkButton} variant='contained' onClick={createLink}>Создать ссылку</Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
