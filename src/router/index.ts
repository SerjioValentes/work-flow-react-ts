import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

export const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    // {
    //     path: '/login',
    //     component: LoginPage,
    // },
]

export const hiddenRoutes = [
    {
        path: '/404',
        component: HomePage,
    }
]
