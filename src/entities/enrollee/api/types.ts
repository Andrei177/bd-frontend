export type AchievementItem = {
    achievement_id: number,
    achievementFile: Blob
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
    subjects: SubjectItem[]
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