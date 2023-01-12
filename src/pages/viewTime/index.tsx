import React, {useEffect, useState} from 'react';
import {doc, getDoc} from "firebase/firestore";
import {fireDb} from "../../firebase";
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";

const ViewTimePage = () => {
    const [unionInfo, setUnionInfo] = useState<null | any>(null)
    const [twoMinuteTime, setTwoMinuteTime] = useState<null | string>(null)

    const getUnionInfo = async () => {
        const docRef = doc(fireDb, "unionInfo", 'unionInfo');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let docs: any = docSnap.data()
            setUnionInfo(docs)
        } else console.log("No such document!");

    }

    useEffect(() => {
        if (!unionInfo) {
            getUnionInfo().then(() => {
                return
            })
        } else {
            const userEmail = window.localStorage.getItem('userEmail');

            unionInfo.users.map((item: string | null) => {
                if (item === userEmail) {
                    const interval: any = setInterval(() => {
                        let nowTime: any = new Date()
                        let serverTime: any = new Date(unionInfo.timeWhenStarted * 1000)

                        if (((nowTime - serverTime) / 1000) > 120) {
                            setTwoMinuteTime('Время истекло')
                            return clearInterval(interval);
                        }
                        setTwoMinuteTime((120 - (nowTime - serverTime) / 1000).toFixed(0))

                    }, 1000);
                    return () => {
                        clearInterval(interval);
                    };
                } else {
                    return setTwoMinuteTime('Вас не добавили в список канала')
                }
            })
        }
    }, [unionInfo])

    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <Box sx={{
                display: 'flex',
                m: 'auto',
                alignItems: 'center',
                border: 'solid black 1px',
                borderRadius: 2,
                p: 4,
            }}>
                <Typography variant='h3'>
                    {twoMinuteTime && twoMinuteTime}
                </Typography>
                <Typography sx={{ml: 2}} variant='h6'>
                    {twoMinuteTime === 'Время истекло' || twoMinuteTime === 'Вас не добавили в список канала' ? '' : 'Секунд осталось'}
                </Typography>
            </Box>
        </div>
    );
};

export default ViewTimePage;
