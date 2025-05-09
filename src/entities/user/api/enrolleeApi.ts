import { $privateApi, $publicApi } from "../../../shared";
import {
  IEnrolleeInfo,
  ISubjectEnrollee,
} from "../model/interfaces";
import { RequestSetEnrolleeAgrs, FormattedAchievement, ResponseSetEnrollee } from "./enrolleeTypes";

export const getEnrolleeData = async (user_id: number | null) => {
  if(!user_id) return Promise.reject({message: "Не передан id пользователя"})
  const response = await $privateApi.get<IEnrolleeInfo>("/enrollee", {
    params: {
      user_id
    }
  });

  return response;
};

export const saveEnrollee = async (args: RequestSetEnrolleeAgrs) => {
  if(args.status === 'approve') return Promise.reject({message: "Редактирование невозможно, так как Ваши данные уже прошли проверку"})
  const formData = new FormData();

  console.log(args)
  if (args.status) formData.append("status", "unchecked");
  if (args.achievements) {
    args.achievements.forEach((item) => {
      formData.append("achievement_files", item.achievement_file);
    });
  }
  if (args.achievements) {
    formData.append(
      "achievements",
      JSON.stringify(
        args.achievements.map((a) => ({ achievement_id: a.achievement_id }))
      )
    );
  }
  if(args.subjects){
    formData.append(
        "subjects",
        JSON.stringify(
          args.subjects
        )
    );
  }
  if (args.first_name) formData.append("first_name", args.first_name)
  if (args.last_name) formData.append("last_name", args.last_name);
  if (args.patronymic) formData.append("patronymic", args.patronymic);

  if(args.passport_series) formData.append("passport_series", args.passport_series);
  if(args.passport_number) formData.append("passport_number", args.passport_number);

  if (args.scanPassport) formData.append("scanPassport", args.scanPassport);
  if (args.scanCertificate) formData.append("scanCertificate", args.scanCertificate);

  console.log(formData, "данные для отправки на бэкенд")

  const response = await $privateApi.post<ResponseSetEnrollee>("/enrollee", formData);

  return response;
};

export const getSubjects = async () => {
  const response = await $publicApi.get<Record<"subjects", ISubjectEnrollee[]>>(
    "/subjects"
  );

  return response;
};

export const getAchievements = async () => {
  const response = await $publicApi.get<Record<"achievements", FormattedAchievement[]>>("/achievements");

  response.data.achievements.forEach(ach => {
    ach.checked = false;
  })

  return response;
};

export const getCauseReject = async () => {
  const response = await $privateApi.get<Record<"cause_reject", string>>("/enrollee/cause-reject");

  return response;
}
