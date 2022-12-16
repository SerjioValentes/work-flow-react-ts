# Template of React / Mui / TypeScript / TailWind / Firestore

## Excluded private files from project:

### Private file include code - src/firebase.ts
```
import { initializeApp } from "firebase/app";
import 'firebase/firestore';

const firebaseConfig:any = {
apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: ""
};
let fire = initializeApp(firebaseConfig);
export default fire;
```

## Other

START Example how to look firestore model for task board and tasks

```
        let tas = [
            {
                title: 'board_1',
                tasks: {
                    title: 'name',
                    descr: 'descr',
                },
            },
            {
                boardTitle: 'board_2',
                tasks: {
                    title: 'name',
                    descr: 'descr',
                },
            },
        ]
```

END Example how to look firestore model

---------- Admin Page ----------
add new arrays to add access for users
We need to download all boards and will try to update  - dont do that - if users wil be 1000
---------- User Page ----------
We have to make object with there users who invited admin
Должен быть еще объект с теми пользователями которые его пригласили

Firebase model how it will looks
```
const originalFireBaseModel = {
email: '',
uid: '',
tasks: '',
invitedFrom: [
            {
                userWhoInvited: 'user4@test.com',
                acceptedBoards: ['giftBoard_01'],
            },
            {
                userWhoInvited: 'user7@test.com',
                acceptedBoards: ['giftBoard_06'],
            },
            ],
giftBoards: [
    {
        giftBoard_01: [
            {
                gift: 'idea_01',
                isItFree: true,
                isItShare: false,
            },
            {
                gift: 'idea_02',
                isItFree: true,
                isItShare: false,
            },
        ],
        includedUsers: ['user1@test.com', 'user2@test.com', 'user3@test.com'],
       
    },
    {
        giftBoard_02: [
            {
                gift: 'idea_01',
                isItFree: true,
                isItShare: false,
            },
            {
                gift: 'idea_02',
                isItFree: true,
                isItShare: false,
            },
                ],
                includedUsers: ['user2@test.com', 'user3@test.com'],
            }
        ],
    }
```


Options of invite to other people to app
    - Send invite to app (because this user not yet registered)
    - When user create gift board with unvited users to this board, automatically will be create this users with random password  
        just create a new users - if user is created it drop a error
How to get collections read here -
https://medium.com/firebase-tips-tricks/how-to-list-all-subcollections-of-a-cloud-firestore-document-17f2bb80a166








