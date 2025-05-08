import { jwtDecode } from "jwt-decode";
import { User } from "../../../entities/user";

export const getInfoByJwt = (token: string): User => {
    return jwtDecode<User>(token);
}