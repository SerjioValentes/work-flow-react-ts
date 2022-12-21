import GiftBoardPage from "../pages/GiftBoardPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import TasksBoardPage from "../pages/TasksBoardPage";
import GameCounterPage from "../pages/GameCounter";

export const routes: any = [
    {
        path: '/',
        name: 'Home page',
        component: <HomePage/>,
    },
    {
        path: '/tasksBoard',
        name: 'Task board',
        component: <TasksBoardPage/>,
    },
    {
        path: '/giftBoard',
        name: 'Gift board',
        component: <GiftBoardPage />,
    },
    {
        path: '/gamePage',
        name: 'Game boards',
        component: <GameCounterPage />,
    },
]

export const authRoutes = [
    {
        path: '/login',
        component: <LoginPage />
    },
]
