import { FC } from "react";
import s from "./AuthForm.module.css";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { Link } from "react-router-dom";
import { Routes } from "../../app/router/routes";

interface IAuthForm{
    isSignIn: boolean;
}

const AuthForm: FC<IAuthForm> = ({isSignIn}) => {
    return (
        <form className={s.form}>
            <h2 className={s.title}>{isSignIn ? "Вход" : "Регистрация"}</h2>
            
            <label htmlFor="snils">СНИЛС</label>
            <Input type="text" name="snils" placeholder="Введите ваш снилс..."/>

            <label htmlFor="password">Пароль</label>
            <Input type="password" name="password" placeholder="Введите пароль..."/>

            <Button>{isSignIn ? "Войти" : "Зарегистрироваться"}</Button>
            {
                isSignIn
                ?<div className={s.question_line}><span>Нет аккаунта?</span> <Link to={Routes.SIGNUP}>Зарегистрироваться</Link></div>
                :<div className={s.question_line}><span>Есть аккаунт?</span> <Link to={Routes.SIGNIN}>Войти</Link></div>
            }
        </form>
    )
}

export default AuthForm
