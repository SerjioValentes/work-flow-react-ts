import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

export const routes: any = [
    {
        path: '/',
        name: 'Home page',
        component: <HomePage/>,
    },
]

export const authRoutes = [
    {
        path: '/login',
        component: <LoginPage />
    },
]
