import React from 'react';
import {routes} from "../../router";
import {Button} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";

const MenuWrapper = ({children}:any) => {

    return (
        <div>
            {routes.map((item: { name: string, path: string, component: any}): any =>
                    <div key={item.name?.toString()}>
                        <Button
                            key={item.path}
                            to={item.path}
                            component={RouterLink}
                        >
                        {item?.name}
                        </Button>
                    </div>)}
            {children}
        </div>
    );
};

export default MenuWrapper;
