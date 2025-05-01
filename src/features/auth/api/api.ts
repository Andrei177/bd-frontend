import { $privateApi } from "../../../shared"
import { AuthResponse } from "../model/responses-types";

export const refreshTokens = async () => {
    const response = await $privateApi.get<AuthResponse>("/auth/refresh")

    if(response.data?.accessToken){
        localStorage.setItem("accessToken", response.data.accessToken)
    }

    return response;
}

export const signin = async (snils: string, password: string) => {
    const response = await $privateApi.post<AuthResponse>("/user/signin", {
        userSnils: snils,
        userPassword: password
    })

    if(response.data.accessToken){
        localStorage.setItem("accessToken", response.data.accessToken)
    }

    return response;
}

export const signup = async (snils: string, password: string) => {
    const response = await $privateApi.post<AuthResponse>("/user/signup", {
        userSnils: snils,
        userPassword: password
    })

    if(response.data.accessToken){
        localStorage.setItem("accessToken", response.data.accessToken)
    }

    return response;
}

export const logout = async () => {
    const response = await $privateApi.post<AuthResponse>("/user/logout", {})

    if(response.status == 200){
        localStorage.removeItem("accessToken")
    }

    return response;
}