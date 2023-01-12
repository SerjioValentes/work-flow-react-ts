import React, {useEffect} from 'react';
import {Route, useLocation, Navigate, Routes} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './muiStyle';
import {authRoutes, routes } from "./router";
import './index.css';
import MenuWrapper from "./components/MenuWrapper/MenuWrapper";
import {setAccessTokenToStore} from "./store/store";

function App() {
    const accessToken = window.localStorage.getItem('accessToken')

    const location = useLocation()

    const authRender = ({ path, component }: { path: string, component: any }) => {
        return <Route key={path} path={path} element={component} />;
    };

    useEffect(() => {
        const localAccessToken = window.localStorage.getItem('accessToken')
        if(localAccessToken){
            setAccessTokenToStore(localAccessToken);
        }
        else {
            setAccessTokenToStore(null);
        }
    },[])

    if (accessToken) {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <MenuWrapper>
                        <Routes>
                            {routes.map(authRender)}
                        </Routes>
                    </MenuWrapper>
                </div>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Routes>
                    {authRoutes.map(authRender)}
                    <Route path="*"
                           element={<Navigate replace state={{ from: location }} to="/login" />}
                    />
                </Routes>
            </ThemeProvider>
        );
    }
}

export default App;
