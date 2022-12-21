import React, {useEffect, useState} from 'react';
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {fireDb} from "../../firebase";
import {Card, IconButton, List, ListItem, Typography} from "@mui/material";
import {PlaylistAddCheckCircle} from "@mui/icons-material";
import {getUsersCollection} from "../controllers/getUsersCollection";

const GiftBoardForUser = () => {

    const [userEmail, setUserEmail] = useState(window.localStorage.getItem('userEmail'))
    const [accessBoards, setAccessBoards] = useState<any[] | null>(null)

    const getUserInfo = async () => {
        if (userEmail) {
            const docRef = doc(fireDb, "users", userEmail.toString());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data()
                getAllGiftsFromBoard(data.invitedFrom)
            } else {
                console.log("No such document!");
            }
        }
    }

    const getAllGiftsFromBoard = async (invitedFrom: any) => {

        let invitedFromTemp: any[] = []

        Promise.all(invitedFrom.map(async (item: { userWhoInvited: string; acceptedBoards: string }) => {
            const docRef = doc(fireDb, "users", item.userWhoInvited);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
               const data: any = docSnap.data()
                data.giftBoards.map((giftBoardsItem: any) => {
                    for (const itemKey in giftBoardsItem) {
                        if (itemKey === item.acceptedBoards) {
                            const objWithName = {
                                email: item.userWhoInvited,
                                titleBoard: itemKey,
                                gifts: giftBoardsItem[itemKey]
                            }
                            invitedFromTemp.push(objWithName)
                        }
                    }
                })
            } else console.log("No such document!");
        })).then(() => {
            setAccessBoards(invitedFromTemp)
        })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const takeGift = async (gift:string, titleBoard: string, isItShare: boolean, email: string) => {
        const userCollection = doc(fireDb, "users", email);

        let userColl
        getUsersCollection(email, 'giftBoards')
            .then( async res => {
                userColl = res
                    userColl.map((item: any) => {
                    item[titleBoard].map((item: {gift: string; isItFree: boolean}) => {
                        if(item.gift === gift)
                            item.isItFree = false
                    })
                })

                    await updateDoc(userCollection, {
                        giftBoards: userColl
                    })
            })
    }

    return (
        <div>
            <div className='flex gap-5'>
                {accessBoards &&
                    accessBoards.map((invitedFromItem: { titleBoard: string, gifts: [], email: string }, id: number) =>
                        <Card key={id} sx={{width: 320, height: 320, p: 2}}>
                            <Typography fontSize={18}>
                                <strong>{invitedFromItem.titleBoard}</strong>
                            </Typography>
                            <List>
                                {invitedFromItem.gifts.map((gift: { gift: string; isItFree: boolean; isItShare: boolean }) =>
                                    <ListItem key={gift.gift} sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Typography>
                                            {gift.gift}
                                        </Typography>

                                        <IconButton
                                            disabled={!gift.isItFree}
                                            onClick={() => takeGift(gift.gift, invitedFromItem.titleBoard, gift.isItShare, invitedFromItem.email)}
                                            color="primary">
                                            <PlaylistAddCheckCircle/>
                                        </IconButton>
                                    </ListItem>)}
                            </List>
                        </Card>
                    )}
            </div>
        </div>
    );
};

export default GiftBoardForUser;
