export interface IEnrollee {
  enrollee_id?: number;
  first_name?: string;
  last_name?: string;
  patronymic?: string;
  passport_series?: string;
  passport_number?: string;
  user_id?: number;
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
export interface IEnrolleeInfo{
  enrollee: IEnrollee;
  snils: string;
  subjects: ISubjectEnrollee[];
  achievements: IAchievementEnrollee[];
  passport_url: string | null;
  certificate_url: string | null;
}
export interface IEnrolleeStore extends IEnrolleeInfo{
  setEnrollee: (data: IEnrollee) => void;
  setSnils: (data: string) => void;
  setSubjects: (data: ISubjectEnrollee[]) => void;
  setAchievements: (data: IAchievementEnrollee[]) => void;
  setPassportUrl: (data: string) => void;
  setCertificateUrl: (data: string) => void;
  setAll: (data: IEnrolleeInfo) => void;
  setEmpty: () => void;
}