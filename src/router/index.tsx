import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ViewTimePage from "../pages/viewTime";

export const routes: any = [
    {
        path: '/',
        name: 'Home page',
        component: <HomePage/>,
    },
    {
        path: '/view-time',
        name: 'Time page',
        component: <ViewTimePage/>,
    }
]

export const authRoutes: any = [
    {
        path: '/login',
        name: 'Login page',
        component: <LoginPage/>
    }
]
