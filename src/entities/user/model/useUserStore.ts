import { create } from "zustand";
import { User } from "./types";

interface IUserStore extends User{
    setUser: (user: User) => void
}

export const useUserStore = create<IUserStore>(set => ({
    userId: null,
    roleId: null,
    userSnils: "",
    setUser: (user) => set({...user})
}))