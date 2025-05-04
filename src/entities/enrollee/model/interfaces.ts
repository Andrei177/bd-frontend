export interface IEnrollee {
  enrollee_id: number | null;
  first_name: string | null;
  last_name: string | null;
  patronymic: string | null;
  passport_series: string | null;
  passport_number: string | null;
  user_id: number | null;
}
export interface ISubjectEnrollee {
  subject_id: number;
  name_subject: string;
  result: number;
}
export interface IAchievementEnrollee {
  achievement_id: number;
  name_achievement: string;
  achievement_file_url: string;
  bonus: number;
}
export interface IEnrolleeStore {
  enrollee: IEnrollee;
  snils: string;
  subjects: ISubjectEnrollee[];
  achievements: IAchievementEnrollee[];
  passport_url: string | null;
  certificate_url: string | null;

  setEnrollee: (data: IEnrollee) => void;
  setSnils: (data: string) => void;
  setSubjects: (data: ISubjectEnrollee[]) => void;
  setAchievements: (data: IAchievementEnrollee[]) => void;
  setPassportUrl: (data: string) => void;
  setCertificateUrl: (data: string) => void;
  setAll: (data: IEnrolleeStore) => void;
}