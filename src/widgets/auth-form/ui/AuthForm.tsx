import { FC, MouseEvent, useState } from "react";
import s from "./AuthForm.module.css";
import { Link } from "react-router-dom";
import { Routes, Button, Input, Loader } from "../../../shared";
import { AuthFormSchema } from "../model/auth-form.schema";
import { signin, signup } from "../../../features/auth";
import { z } from "zod";

interface IAuthForm {
    isSignIn: boolean;
}

export const AuthForm: FC<IAuthForm> = ({ isSignIn }) => {

    const [formData, setFormData] = useState({ snils: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            AuthFormSchema.parse(formData)
            setErrors({})
            setIsLoading(true);
            if (isSignIn) {
                signin(formData.snils, formData.password)
                    .then(res => {
                        console.log("Ответ при входе", res)
                    })
                    .catch(err => {
                        console.error(err, "Ошибка при входе")
                    })
                    .finally(() => setIsLoading(false))
            }
            else {
                signup(formData.snils, formData.password)
                    .then(res => {
                        console.log("Ответ при входе", res)
                    })
                    .catch(err => {
                        console.error(err, "Ошибка при входе")
                    })
                    .finally(() => setIsLoading(false))
            }
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                const formatedErrors: Record<string, string> = {}
                err.errors.forEach(error => {
                    formatedErrors[error.path[0]] = error.message
                })

                setErrors(formatedErrors);
            }
        }
    }

    return (
        <div className={s.layout}>
            <form className={s.form} onSubmit={handleSubmit}>
                {isLoading && <div className={s.loader_wrap}><Loader/></div>}
                <h2 className={s.title}>{isSignIn ? "Вход" : "Регистрация"}</h2>
                <div className={s.form_item}>
                    <label htmlFor="snils">СНИЛС</label>
                    <Input
                        type="text"
                        name="snils"
                        placeholder="Введите ваш снилс..."
                        value={formData.snils}
                        onChange={(e) => setFormData({ ...formData, snils: e.target.value })}
                    />
                    <p className={s.err}>{errors.snils && errors.snils}</p>
                </div>
                <div className={s.form_item}>
                    <label htmlFor="password">Пароль</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Введите пароль..."
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <p className={s.err}>{errors.password && errors.password}</p>
                </div>
                <Button>{isSignIn ? "Войти" : "Зарегистрироваться"}</Button>
                {
                    isSignIn
                        ? <div className={s.question_line}><span>Нет аккаунта?</span> <Link to={Routes.SIGNUP}>Зарегистрироваться</Link></div>
                        : <div className={s.question_line}><span>Есть аккаунт?</span> <Link to={Routes.SIGNIN}>Войти</Link></div>
                }
            </form>
        </div>
    )
}
