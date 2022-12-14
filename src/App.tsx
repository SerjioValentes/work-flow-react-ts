import React, {useState} from 'react';
import {Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './muiStyle';
import { routes } from "./router";
import './index.css';
import MenuWrapper from "./components/MenuWrapper/MenuWrapper";

function App() {
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const authRender = ({ path, component }: { path: string, component: any }) => {
        return <Route key={path} path={path} element={component} />;
    };

    if (accessToken) {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <MenuWrapper>
                    <Routes>
                        {routes.map(authRender)}
                        {/*{hiddenRoutes.map(renderRoute)}*/}
                        {/*<Route*/}
                        {/*    path="*"*/}
                        {/*    element={<Navigate to="/404" replace />}*/}
                        {/*/>*/}
                    </Routes>
                    </MenuWrapper>
                </div>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <LoginPage setAccessToken={setAccessToken}/>
            </ThemeProvider>
        );
    }
}

export default App;
