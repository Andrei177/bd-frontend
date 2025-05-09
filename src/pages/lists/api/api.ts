import { $privateApi } from "../../../shared";
import { CompetititonListItem, Faculty } from "../model/types";

export const getFaculty = async (subjectsIds: number[]) => {
  const response = await $privateApi.post<Faculty[]>("/faculties/available", {
    subjects: subjectsIds,
  });

  return response;
};

export const getCompetitionList = async (directionId: number) => {
  const response = await $privateApi.get<CompetititonListItem[]>(`/directions/${directionId}/competition-list`);

  return response;
};

export const sendRequestOnDirection = async (enrolleeId: number | undefined, directionId: number) => {
  if(!enrolleeId) return Promise.reject({message: "Не передан id абитуриента"})
  const response = await $privateApi.post<{message: string, success: boolean}>("/directions/enroll", {
    enrolleeId,
    directionId
  });

  return response;
};
