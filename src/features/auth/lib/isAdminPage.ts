import { Routes } from "../../../shared"

export const isAdminPage = (pathname: string) => {
    return pathname == Routes.ENROLLEES
}