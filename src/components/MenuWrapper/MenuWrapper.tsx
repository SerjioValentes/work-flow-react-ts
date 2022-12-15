import React from 'react';
import {routes} from "../../router";
import {Button} from "@mui/material";
import {NavLink as RouterLink, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {setAccessTokenToStore} from "../../store/store";

const MenuWrapper = ({children}: any) => {

    const navigate = useNavigate()

    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then((res) => {
            // Sign-out successful.
            localStorage.clear()
            setAccessTokenToStore(null);
            navigate("/login");
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }

    return (
        <div>
            <div className='flex justify-between bg-error'>
                {/*START--------map routes for get menu name*/}
                <div className='flex'>
                    {routes.map((item: { name: string, path: string, component: any }): any =>
                        <div key={item.name?.toString()}>
                            <Button
                                key={item.path}
                                to={item.path}
                                component={RouterLink}>
                                {item?.name}
                            </Button>
                        </div>)}
                </div>
                {/*END--------map routes for get menu name*/}

                <div>
                    <Button onClick={logOut}>Log Out</Button>
                </div>
            </div>

            <div className='m-6'>
                {children}
            </div>
        </div>
    );
};

export default MenuWrapper;
