import { useEffect, useState } from "react"
import { refreshTokens } from "../api/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loader, Routes } from "../../../shared";
import s from "./AuthWrapper.module.css"
import { isPublicPage } from "../lib/isPublicPage";

export const AuthWrapper = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        setIsLoading(true)
        refreshTokens()
        .then(res => {
            console.log("Ответ при обновлении токенов", res)
            if(isPublicPage(pathname)){
                navigate(Routes.LK, { replace: true })
            }
        })
        .catch(err => {
            console.log("Ошибка при обновлении токенов", err)
            if(!isPublicPage(pathname)){
                navigate(Routes.SIGNIN, { replace: true })
            }
            //navigate(Routes.LK, { replace: true }) при разработке, когда бэк отключен
        })
        .finally(() => {
            setTimeout(() => setIsLoading(false), 0)
        })
    }, [])

    if(isLoading){
        return <div className={s.loader_wrap}><Loader/></div>
    }
    
    return <Outlet/>
}
