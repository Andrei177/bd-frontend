import { createBrowserRouter } from "react-router-dom";
import { Routes } from "../../shared";
import { SignIn } from "../../pages/sign-in";
import { SignUp } from "../../pages/sign-up";

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