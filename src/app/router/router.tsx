import { createBrowserRouter } from "react-router-dom";
import { Routes } from "../../shared";
import { SignIn } from "../../pages/sign-in";
import { SignUp } from "../../pages/sign-up";
import { AuthWrapper } from "../../features/auth";
import { Lk } from "../../pages/lk";
import { Lists } from "../../pages/lists";
import { Home } from "../../pages/home";

export const router = createBrowserRouter([
    {
        element: <AuthWrapper/>,
        children: [
            {
                path: Routes.SIGNIN,
                element: <SignIn/>
            },
            {
                path: Routes.SIGNUP,
                element: <SignUp/>
            },
            {
                path: Routes.LK,
                element: <Lk/>
            },
            {
                path: Routes.LISTS,
                element: <Lists/>
            }
        ]
    },
    {
        path: Routes.ROOT,
        element: <Home/>
    },
    {
        path: "*",
        element: <h1>404 Ошибка</h1>
    }
])