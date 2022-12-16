import React, {useState} from 'react';
import {Button, Dialog, DialogTitle, Divider, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {validateEmail} from "../../components/verify";
import {fireDb} from "../../firebase";
import {doc, getDoc } from 'firebase/firestore';

const GiftBoardPage = () => {
    const {register, watch, reset} = useForm()

    const [gifts, setGifts] = useState<any>([])
    const [usersWhoHaveAccess, setUsersWhoHaveAccess] = useState<any>([])
    const [createNewBoardDialog, setCreateNewBoardDialog] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [boardTitleError, setBoardTitleError] = useState<string | null>(null)

    const clearAllWatchers = () => {
        reset({
            newBoardTitleName: '',
            newGift: '',
        })
    }

    const showMeAllUsers = async () => {
        // const citiesRef = fireDb.collection('users');
        // const snapshot = await citiesRef.get();
        // snapshot.forEach((item:any) => {
        //     console.log(item.id, '=>', item.data());
        // });
    }

    const createNewBoard = () => {
        console.log(watch('newBoardTitleName'))
        console.log(gifts)
        console.log(usersWhoHaveAccess)
        clearAllWatchers()

        if(!watch('newBoardTitleName'))
            setBoardTitleError('Pls add title of board')
    }

    const createNewGift = () => {
        let giftWatcher = watch('newGift');

        const newGift = {
            gift: giftWatcher,
            isItFree: true,
            isItShare: false,
        }

        setGifts((prev: any) => {
            return [...prev, newGift];
        })
        reset({
            newGift: '',
        })
    }

    const createNewUser = () => {
        let userWatcher = watch('newUser');

        if (validateEmail(userWatcher)) {
            setUsersWhoHaveAccess((prev: any) => {
                return [...prev, userWatcher];
            })
            reset({
                newUser: '',
            })
            setEmailError(null);
        } else {
            setEmailError('Enter correct email');
        }
    }

    return (
        <div>
            <Button onClick={showMeAllUsers}>showMeAllUsers</Button>
            <div>
                <div>
                    <Button onClick={() => {
                        setCreateNewBoardDialog(true)
                    }}>
                        Create new gift board
                    </Button>
                </div>


            </div>


            <Dialog
                onClose={() => setCreateNewBoardDialog(false)}
                open={createNewBoardDialog}>
                <div className='p-4'>

                    <div className='flex justify-around'>
                        <TextField
                            placeholder='Title ...'
                            {...register('newBoardTitleName')}/>
                    </div>
                    <div className='flex justify-around mt-1'>
                        <Typography color='error' fontSize={14}>
                            {boardTitleError && boardTitleError}
                        </Typography>
                    </div>
                    <Divider sx={{my: 2}}/>

                    <div className='flex justify-between'>
                        <TextField
                            placeholder='Create new gift ...'
                            {...register('newGift')}/>
                        <Button onClick={createNewGift}>Create</Button>
                    </div>

                    <div className='my-2'>
                        {gifts &&
                            gifts.map((item: { gift: string }) =>
                                <div key={item.gift}>
                                    {item.gift}
                                </div>)}
                    </div>

                    <div className='flex justify-between'>
                        <TextField
                            placeholder='Add users to access to your gift board ...'
                            // error={validateEmail(watch('newUser'))}
                            {...register('newUser')}/>
                        <Button onClick={createNewUser}>Add</Button>
                    </div>
                    <Typography sx={{mt: 1}} fontSize={14} color='error'>
                        {emailError && emailError}
                    </Typography>

                    <div className='my-2 flex'>
                        {usersWhoHaveAccess &&
                            usersWhoHaveAccess.map((item: string) =>
                                <div key={item}>
                                    {item} /
                                </div>)}
                    </div>

                    <div>
                        <Button sx={{my: 1}} variant='contained' onClick={createNewBoard}>Create new Board</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default GiftBoardPage;
