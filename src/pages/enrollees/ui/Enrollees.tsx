import { useEffect, useState } from "react"
import { Navbar } from "../../../widgets/navbar"
import s from "./Enrollees.module.css"
import { ShortEnrollee } from "../api/types"
import { getNotApproveEnrolleesList } from "../api/api"
import { Modal } from "../../../shared"
import CheckEnrollee from "./CheckEnrollee"

export const Enrollees = () => {

    const [enrolleesList, setEnrolleesList] = useState<ShortEnrollee[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);

    const handleClickEnrollee = (userId: number) => {
        setSelectedUserId(userId)
        setShowModal(true)
    }

    useEffect(() => {
        if (!selectedUserId) {
            getNotApproveEnrolleesList()
                .then(res => {
                    console.log("Ответ при получении списка абитуриентов", res)
                    setEnrolleesList(res.data.enrollees)
                })
                .catch(err => {
                    console.error("Ошибка при получении списка абитуриентов", err)
                })
        }
    }, [selectedUserId])

    return (
        <>
            <Navbar />
            <div className={s.container}>
                <h1 className={s.title}>Проверка абитуриентов</h1>
                <div className={s.list}>
                    {/* <div className={s.item}>СНИЛС ФАМИЛИЯ ИМЯ ОТЧЕСТВО</div> */}
                    {
                        enrolleesList.map((e, i) => (
                            <div onClick={() => handleClickEnrollee(e.user_id)} className={s.item} key={e.enrollee_id}>
                                <div>{i + 1}</div>
                                <div>{e.user_snils} {e.last_name} {e.first_name} {e.patronymic}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <CheckEnrollee userId={selectedUserId} setUserId={setSelectedUserId} setShowModal={setShowModal}/>
            </Modal>
        </>
    )
}