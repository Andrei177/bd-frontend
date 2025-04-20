import { createBrowserRouter } from "react-router-dom";
import { Routes } from "../../shared/config/routes";
import SignIn from "../../pages/sign-in/ui/SignIn";
import SignUp from "../../pages/sign-up/ui/SignUp";

export const router = createBrowserRouter([
    {
        path: Routes.ROOT,
        element: <h1>Добро пожаловать!</h1>
    },
    {
        path: Routes.SIGNIN,
        element: <SignIn/>
    },
    {
        path: Routes.SIGNUP,
        element: <SignUp/>
    }
])