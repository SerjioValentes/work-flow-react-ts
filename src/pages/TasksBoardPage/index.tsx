import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogTitle, Menu, MenuItem, Paper, TextField} from "@mui/material";
import {updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {fireDb} from '../../firebase'
import {doc, getDoc} from "firebase/firestore";
import {useForm} from "react-hook-form";

const Index = () => {
        const [tasks, setTasks] = useState<[] | null>(null)
        const [openChangeTaskDialog, setOpenChangeTaskDialog] = useState<boolean>(false)
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const [temporaryTasksForRemove, setTemporaryTasksForRemove] = useState<{} | null>(null)

        const {watch, register} = useForm()
        const userCollection = doc(fireDb, "users", "test4@user.com");
        const open = Boolean(anchorEl);

        // Open menu
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        // Close menu
        const handleClose = () => {
            setAnchorEl(null);
            setOpenChangeTaskDialog(false)
        };

        const addNewItemToFireStore = async () => {
            const task = {
                title: watch('taskTitle'),
                description: watch('taskDescription'),
            }
            await updateDoc(userCollection, {
                tasks: arrayUnion(task)
            });
            getAllTasks()
        }

        const getAllTasks = async () => {
            const docRef = doc(fireDb, "users", "test4@user.com",);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data()
                setTasks(data.tasks)
            } else
                console.log("No such document!");
        }

        const deleteThisTask = async (title: string, description: string) => {
            const tasksSegment = doc(fireDb, "users", "test4@user.com");

            // Set array which you will want to remove
            const removeArray = {title, description}

            handleClose()
            await updateDoc(tasksSegment, {
                tasks: arrayRemove(removeArray)
            }).then(() => {
                getAllTasks()
            })
        }

        const openDialogTaskEdit = (title: string, description: string) => {
            setTemporaryTasksForRemove({title, description})
            handleClose()
            setOpenChangeTaskDialog(true)
        }

        const editTask = async () => {
            const tasksSegment = doc(fireDb, "users", "test4@user.com");
            handleClose()

            const temporaryTask = {
                title: watch('titleDialog'),
                description: watch('descriptionDialog')
            }

            await updateDoc(tasksSegment, {
                tasks: arrayRemove(temporaryTasksForRemove)
            })

            await updateDoc(tasksSegment, {
                tasks: arrayUnion(temporaryTask)
            }).then(() => {
                getAllTasks()
            })
        }


        useEffect(() => {
            getAllTasks().then(() => 0)
        }, [])

        return (
            <div>
                {/*START--------New task submit*/}
                <div className='mb-4 flex justify-around'>
                    <Paper sx={{display: 'flex', gap: 2, p: 2}} elevation={3}>
                    <TextField
                        {...register('taskTitle')}
                    />
                    <TextField
                        {...register('taskDescription')}
                    />
                    <Button variant='contained' onClick={addNewItemToFireStore}>submit</Button>
                    </Paper>
                </div>
                {/*END--------New task submit*/}

                {/*START-------List of all tasks */}
                <div>
                    {tasks && tasks.map((item: { title: string; description: string }, id) =>
                        <div key={id} className='my-2'>
                            <Paper sx={{
                                px: 4,
                                py: 1,
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                                   elevation={5}>
                                <div>
                                    <div className='text-xl'><strong>{item.title}</strong></div>
                                    <div>{item.description}</div>
                                </div>

                                {/*<div>*/}
                                {/*<Button onClick={() => deleteThisTask(item.title, item.description)}>delete</Button>*/}

                                <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        ...
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => deleteThisTask(item.title, item.description)}>Delete</MenuItem>
                                        <MenuItem onClick={() => openDialogTaskEdit(item.title, item.description)}>Edit</MenuItem>
                                    </Menu>
                                </div>

                                {/*</div>*/}
                            </Paper>

                        </div>)}
                </div>
                {/*END-------List of all tasks */}

                <Dialog onClose={handleClose} open={openChangeTaskDialog}>
                    <div className='m-4'>

                        <DialogTitle>Edit task</DialogTitle>
                        <div className='m-auto'>
                            <div>
                                <TextField
                                    {...register('titleDialog')}
                                    label='title'/>
                            </div>

                            <div className='my-2'>
                                <TextField
                                    {...register('descriptionDialog')}
                                    label='description'/>
                            </div>
                            <div>
                                <Button onClick={editTask}>Edit</Button>
                            </div>
                        </div>
                    </div>
                </Dialog>


            </div>
        );
    }
;

export default Index;
