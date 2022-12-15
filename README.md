# Template of React / Mui / TypeScript / TailWind / Firestore

## Excluded private files from project:

### 1. src/firebase.ts - private file include code

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

## Other conditions

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
