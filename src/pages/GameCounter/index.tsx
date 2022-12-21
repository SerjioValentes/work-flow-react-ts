import React, {useState} from 'react';
import {Box, Button, Dialog, IconButton, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {putToArray, validateEmail} from "../../components/verify";

const GameCounterPage = () => {
    const {register, watch} = useForm()
    // Dialogs
    const [openDialogNewBoard, setOpenDialogNewBoard] = useState(false)

    // Errors
    const [emailError, setEmailError] = useState(null)


    const [usersList, setUsersList] = useState([])

    const AddToUserList = () => {
            putToArray(watch('user'), setUsersList, setEmailError)
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                height: '100vh',
                weight: '100vw',
            }}>
                <div className='flex m-auto'>
                    <Button
                        onClick={() => setOpenDialogNewBoard(true)}
                        {...register('new game')}
                    >create new game board</Button>
                </div>
            </Box>

            <Dialog
                onClose={() => setOpenDialogNewBoard(false)}
                open={openDialogNewBoard}>
                <div className='m-4 p-4'>
                    {/*fontFamily='monospace'*/}
                    <Typography>Create new game board with other users</Typography>
                    <TextField
                        fullWidth
                        sx={{my: 2}}
                    />

                    <div className='flex justify-between'>
                        <div>
                            <TextField
                                fullWidth
                                {...register('user')}
                            />

                            <Typography color='error'>
                                {emailError && emailError}
                            </Typography>
                        </div>
                        <IconButton
                            onClick={AddToUserList}
                            color="primary">
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </div>

                    {usersList && usersList.map(user =>
                        <div key={user}>
                            {user}
                        </div>)}

                        <Button sx={{my: 2, px: 6}} variant='contained'>Create</Button>

                </div>
            </Dialog>

        </div>
    );
};

export default GameCounterPage;
