import { IAchievementEnrollee } from "../model/interfaces"

export type DirectionResponse = {
  direction_id: number;
  name_direction: string;
  number_direction: string;
};

export type AchievementItem = {
    achievement_id: number,
    achievement_file: Blob
}
export type SubjectItem = {
    subject_id: number,
    result: number
}
export type RequestSetEnrolleeAgrs = Partial<{
    scanPassport: Blob,
    scanCertificate: Blob,
    passport_series: string,
    passport_number: string,
    first_name: string,
    last_name: string,
    patronymic: string,
    achievements: AchievementItem[],
    subjects: SubjectItem[],
    status: 'reject' | 'approve' | 'unchecked'
}>
export type ResponseSetEnrollee = {
    success: boolean,
    enrolleeId: number,
    files: {
        scanPassport: string,
        scanCertificate: string,
        achievements: string[]
    }
}
export type FormattedAchievement = IAchievementEnrollee & { checked: boolean, file?: Blob }