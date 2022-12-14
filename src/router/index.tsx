import HomePage from "../pages/HomePage";
// import LoginPage from "../pages/LoginPage";
import TasksBoardPage from "../pages/TasksBoardPage";

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
]

// export const hiddenRoutes = [
//     {
//         path: '/404',
//         component: <HomePage />,
//     },
//     {
//         path: '/login',
//         component: <LoginPage  setAccessToken={null}/>
//     },
// ]
