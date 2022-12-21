# Template of React / Mui / TypeScript / TailWind / Firestore

## If you wanna to see gift board and game counter pages check giftBoard - branch

## Excluded private files from project:

### Private file include code - src/firebase.ts

Firebase model how it will looks
```
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
                whoseGift: 'user2@test.com',
                shareWithWho: ['user2223@test.com', 'user02@test.com']
                isItFree: false,
                isItShare: true,
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
```







