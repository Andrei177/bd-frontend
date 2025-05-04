import { $privateApi, $publicApi } from "../../../shared"
import { IAchievementEnrollee, IEnrolleeStore, ISubjectEnrollee } from "../model/interfaces";

export const getEnrolleeData = async () => {
    const response = await $privateApi.get<IEnrolleeStore>("/enrollee");
    
    return response;
}

export const getSubjects = async () => {
    const response = await $publicApi.get<Record<"subjects", ISubjectEnrollee[]>>("/subjects");
    
    return response;
}

export const getAchievements = async () => {
    const response = await $publicApi.get<Record<"achievements", IAchievementEnrollee[]>>("/achievements");
    
    return response;
}