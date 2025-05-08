import { $privateApi } from "../../../shared"
import { Faculty } from "../model/types";

export const getFaculty = async (subjectsIds: number[]) => {
    const response = await $privateApi.post<Faculty[]>("/faculties/available", {
        subjects: subjectsIds
    })

    return response;
}