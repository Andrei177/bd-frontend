import { create } from "zustand";
import { IEnrolleeStore } from "./interfaces";

export const useEnrolleeStore = create<IEnrolleeStore>((set) => ({
  enrollee: {
    enrollee_id: undefined,
    first_name: "",
    last_name: "",
    patronymic: "",
    passport_series: "",
    passport_number: "",
    user_id: undefined,
  },
  snils: "",
  subjects: [],
  achievements: [],
  passport_url: "",
  certificate_url: "",
  setEnrollee: (data) => set({ enrollee: { ...data } }),
  setSnils: (data) => set({ snils: data }),
  setSubjects: (data) => set({ subjects: data }),
  setAchievements: (data) => set({ achievements: data }),
  setPassportUrl: (data) => set({ passport_url: data }),
  setCertificateUrl: (data) => set({ certificate_url: data }),
  setAll: (data) => set({ ...data }),
  setEmpty: () =>
    set({
      enrollee: {
        enrollee_id: undefined,
        first_name: "",
        last_name: "",
        patronymic: "",
        passport_series: "",
        passport_number: "",
        user_id: undefined,
      },
      snils: "",
      subjects: [],
      achievements: [],
      passport_url: "",
      certificate_url: "",
    }),
}));
