import { Routes } from "../../../shared"

export const isPublicPage = (pathname: string) => {
    return pathname == Routes.SIGNIN || pathname == Routes.SIGNUP || pathname == Routes.ROOT
}