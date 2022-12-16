import React, {useEffect, useState} from 'react';
import {Route, useLocation, Navigate, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './muiStyle';
import {authRoutes, routes } from "./router";
import './index.css';
import MenuWrapper from "./components/MenuWrapper/MenuWrapper";
import {setAccessTokenToStore} from "./store/store";
import {useStore} from "effector-react";
import $store from "./store/store";

function App() {
    const loginPageStore = useStore($store);

    // const [accessToken, setAccessToken] = useState<string | null>(null)

    // const navigate = useNavigate()
    const location = useLocation()

    const authRender = ({ path, component }: { path: string, component: any }) => {
        return <Route key={path} path={path} element={component} />;
    };

    useEffect(() => {
        const localAccessToken = window.localStorage.getItem('accessToken')
        if(localAccessToken){
            setAccessTokenToStore(localAccessToken);
            // setAccessToken(localAccessToken)
        }
        else {
            setAccessTokenToStore(null);
            // setAccessToken(null)
        }
    },[])

    if (loginPageStore.accessToken) {
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
                <LoginPage />
            </ThemeProvider>
        );
    }
}

export default App;
