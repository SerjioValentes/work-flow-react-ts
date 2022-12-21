import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {fireDb} from "../../../firebase";
import {createNewUser} from "../createNewUser";

export const addNewGift = async (email: string, gifts: [], boardTitle: string, includedUsers: string[]) => {
    const docRef = doc(fireDb, "users", email)

    const localUserEmail = window.localStorage.getItem('userEmail')

    const giftBoard: object[] = []

    includedUsers.map(async (item: string) => {
        await createNewUser(item, '0987654321')
            .then(async (res) => {
                // START ------- Save access to other people
                    const docRefTemp: any = doc(fireDb, "users", item)

                    const eachInvite = {
                        userWhoInvited: localUserEmail,
                        acceptedBoards: boardTitle,
                    }

                    await updateDoc(docRefTemp, {
                        invitedFrom: arrayUnion(eachInvite)
                    })
                //END------ Save access to other people
            })
    })

    // eslint-disable-next-line array-callback-return
    gifts.map((item) => {
        giftBoard.push(item)
    })

    const resultBoard = {
        [boardTitle]: giftBoard,
        includedUsers
    }

    await updateDoc(docRef, {
        giftBoards: arrayUnion(resultBoard)
    });
}
