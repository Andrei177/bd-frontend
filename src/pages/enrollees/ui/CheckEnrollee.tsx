import { useEffect, useState } from "react"
import s from "./CheckEnrollee.module.css"
import { IEnrolleeInfo } from "../../../entities/user/model/interfaces"
import { getEnrolleeData } from "../../../entities/user"
import { BACKEND_URL, Button, Input, Loader, Modal } from "../../../shared"
import { Gallery } from "./Gallery"
import { Photo } from "../model/types"
import { updateEnrolleeStatus } from "../api/api"

interface ICheckEnrollee {
    userId: number | undefined,
    setUserId: (id: number | undefined) => void,
    setShowModal: (bool: boolean) => void
}

export const CheckEnrollee = ({ userId, setUserId, setShowModal }: ICheckEnrollee) => {

    const [enrolleeData, setEnrolleeData] = useState<IEnrolleeInfo>();
    const [isLoading, setIsLoading] = useState(false);
    const [showGallery, setShowGallery] = useState(false)
    const [showInputCauseReject, setShowInputCauseReject] = useState(false)
    const [photos, setPhotos] = useState<Photo[]>([])
    const [causeReject, setCauseReject] = useState("");

    const handleReject = () => {
        updateEnrolleeStatus(enrolleeData?.enrollee.enrollee_id, 'reject', causeReject)
        .then(res => {
            console.log("Ответ при отклонении статуса данных абитуриента", res)
            setUserId(undefined)
            setShowModal(false)
        })
        .catch(err => {
            console.log("Ошибка при отклонении статуса данных абитуриента", err)
        })
    }

    const handleApprove = () => {
        updateEnrolleeStatus(enrolleeData?.enrollee.enrollee_id, 'approve')
            .then(res => {
                console.log("Ответ при одобрении статуса данных абитуриента", res)
                setUserId(undefined)
                setShowModal(false)
            })
            .catch(err => {
                console.log("Ошибка при одобрении статуса данных абитуриента", err)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        if (userId) {
            getEnrolleeData(userId)
                .then(res => {
                    console.log("Ответ при получении данных абитуриента для проверки", res)
                    setEnrolleeData(res.data)
                })
                .catch(err => {
                    console.error("Ошибка при получении данных абитуриента для проверки", err)
                })
                .finally(() => setIsLoading(false))
        }
    }, [])

    return (
        <div className={s.wrap}>
            {
                isLoading
                    ? <Loader />
                    : <>
                        <p className={s.subtitle}>СНИЛС <span>{enrolleeData?.snils}</span></p>
                        <p className={s.subtitle}>{enrolleeData?.enrollee.last_name} {enrolleeData?.enrollee.first_name} {enrolleeData?.enrollee.patronymic}</p>
                        <div className={s.item}>
                            <p className={s.subtitle}>Паспорт <span>{enrolleeData?.enrollee.passport_series} {enrolleeData?.enrollee.passport_number}</span></p>
                            <Button
                                onClick={() => {
                                    setShowGallery(true);
                                    setPhotos(enrolleeData?.passport_url ? [{ url: BACKEND_URL + enrolleeData?.passport_url }] : [])
                                }}
                            >
                                Проверить
                            </Button>
                        </div>
                        <div className={s.item}>
                            <p className={s.subtitle}>Аттестат</p>
                            <Button
                                onClick={() => {
                                    setShowGallery(true);
                                    setPhotos(enrolleeData?.certificate_url ? [{ url: BACKEND_URL + enrolleeData?.certificate_url }] : [])
                                }}
                            >
                                Проверить
                            </Button>
                        </div>
                        <div className={s.achievements}>
                            <p className={s.subtitle}>Достижения</p>
                            <div>{enrolleeData?.achievements.map(a => <p key={a.achievement_id}>{a.name_achievement} </p>)}</div>
                            <Button
                                onClick={() => {
                                    setShowGallery(true);
                                    setPhotos(enrolleeData?.achievements.map(a => ({ url: BACKEND_URL + a.achievement_file_url, description: a.name_achievement })) || [])
                                }}
                            >
                                Проверить
                            </Button>
                        </div>
                        <div className={s.subjects}>
                            <p className={s.subtitle}>Баллы ЕГЭ</p>
                            {
                                enrolleeData?.subjects.map(s => <p key={s.subject_id}>{s.name_subject} {s.result}</p>)
                            }
                        </div>
                        <div className={s.btns}>
                            <Button onClick={() => setShowInputCauseReject(true)} className={s.red}>Отклонить</Button>
                            <Button onClick={handleApprove}>Принять</Button>
                        </div>
                    </>
            }
            <Modal showModal={showInputCauseReject} setShowModal={setShowInputCauseReject}>
                <div className={s.cause_reject}>
                    <Input value={causeReject} onChange={e => setCauseReject(e.target.value)} placeholder="Напишите что нужно исправить..." />
                    <Button onClick={handleReject}>ОК</Button>
                </div>
            </Modal>
            <Gallery showGallery={showGallery} setShowGallery={setShowGallery} photos={photos} />
        </div>
    )
}

export default CheckEnrollee
