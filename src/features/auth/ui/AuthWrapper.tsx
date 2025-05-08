import { useEffect, useState } from "react"
import { refreshTokens } from "../api/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loader, Routes } from "../../../shared";
import s from "./AuthWrapper.module.css"
import { isPublicPage } from "../lib/isPublicPage";
import { ADMIN_ROLE_ID, useUserStore } from "../../../entities/user";
import { getInfoByJwt } from "../lib/getInfoByJwt";
import { isAdminPage } from "../lib/isAdminPage";

export const AuthWrapper = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { setUser } = useUserStore();

    useEffect(() => {
        setIsLoading(true)
        refreshTokens()
            .then(res => {
                console.log("Ответ при обновлении токенов", res)
                const decodedInfo = getInfoByJwt(res.data.accessToken);
                setUser(decodedInfo);
                if (decodedInfo.roleId == ADMIN_ROLE_ID) {
                    if (isPublicPage(pathname) || !isAdminPage(pathname)) {
                        navigate(Routes.ENROLLEES, { replace: true })
                    }
                }
                else {
                    if (isPublicPage(pathname) || isAdminPage(pathname)) {
                        navigate(Routes.LK, { replace: true })
                    }
                }
            })
            .catch(err => {
                console.log("Ошибка при обновлении токенов", err)
                if (!isPublicPage(pathname)) {
                    navigate(Routes.SIGNIN, { replace: true })
                }
            })
            .finally(() => {
                setTimeout(() => setIsLoading(false), 10)
            })
    }, [])

    if (isLoading) {
        return <div className={s.loader_wrap}><Loader /></div>
    }

    return <Outlet />
}
