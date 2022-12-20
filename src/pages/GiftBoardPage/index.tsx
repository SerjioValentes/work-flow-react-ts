import React, {useState} from 'react';
import {
    Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    TextField,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {validateEmail} from "../../components/verify";
import {addNewGift} from '../../components/controllers/addNewGift';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import GiftBoardForUser from '../../components/GiftBoardForUser';

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

    const createNewBoard = async () => {
        const localUserEmail = window.localStorage.getItem('userEmail')

        if (localUserEmail)
            addNewGift(localUserEmail, gifts, watch('newBoardTitleName'), usersWhoHaveAccess)

        setCreateNewBoardDialog(false);

        // clearAllWatchers()
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

    const addNewUser = () => {
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

    const deleteGift = (name: string) => {
        const result = gifts.filter((item:{gift: string}) => item.gift !== name)
        setGifts(result)
    }

    const deleteEmailFromList = (name: string) => {
        const result = usersWhoHaveAccess.filter((item: string) => item !== name)
        setUsersWhoHaveAccess(result)
    }

    return (
        <div>
            <div>
                <div>
                    <Button onClick={() => {
                        setCreateNewBoardDialog(true)
                    }}>
                        Create new gift board
                    </Button>
                </div>
            </div>

            <GiftBoardForUser />


            <Dialog
                onClose={() => setCreateNewBoardDialog(false)}
                open={createNewBoardDialog}>
                <div className='p-10'>

                    <div className='flex justify-around'>
                        <TextField
                            fullWidth
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
                            fullWidth
                            placeholder='Create new gift ...'
                            {...register('newGift')}/>

                        <IconButton
                            onClick={createNewGift}
                            color="primary">
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </div>

                    <div className='my-2'>
                        <List>
                            {gifts &&
                                gifts.map((item: { gift: string }) =>
                                    <div key={item.gift}>
                                        <ListItem sx={{display: 'flex', justifyContent: 'space-between', p: 2}}>
                                            <div>
                                                {item.gift}
                                            </div>

                                            <IconButton
                                                onClick={() => deleteGift(item.gift)}
                                                color="primary">
                                                <DeleteIcon />
                                            </IconButton>

                                        </ListItem>

                                    </div>)}
                        </List>
                    </div>

                    <div className='flex justify-between'>
                        <TextField
                            placeholder='Add users to access to your gift board ...'
                            // error={validateEmail(watch('newUser'))}
                            {...register('newUser')}/>

                        <IconButton
                            onClick={addNewUser}
                            color="primary">
                            <AddCircleOutlineIcon/>
                        </IconButton>

                    </div>
                    <Typography sx={{mt: 1}} fontSize={14} color='error'>
                        {emailError && emailError}
                    </Typography>

                    <List>
                        {usersWhoHaveAccess &&
                            usersWhoHaveAccess.map((item: string) =>
                                <div key={item}>
                                    <ListItem>
                                        <div>
                                        {item}
                                        </div>

                                        <IconButton
                                            onClick={() => deleteEmailFromList(item)}
                                            color="primary">
                                            <DeleteIcon />
                                        </IconButton>

                                    </ListItem>
                                </div>)}
                    </List>

                    <div>
                        <Button sx={{my: 1}} variant='contained' onClick={createNewBoard}>Create new Board</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default GiftBoardPage;
