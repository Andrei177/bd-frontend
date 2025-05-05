import { nanoid } from "nanoid"
import { getSubjects, ISubjectEnrollee, useEnrolleeStore } from "../../../entities/enrollee"
import { Button, Input } from "../../../shared"
import s from "./SelectSubjects.module.css"
import { ChangeEvent, useEffect } from "react"

interface ISelectSubjects {
    subjects: ISubjectEnrollee[],
    setSubjects: (subj: ISubjectEnrollee[]) => void,
    setShowModal: (bool: boolean) => void
}

export const SelectSubjects = ({ subjects, setSubjects, setShowModal }: ISelectSubjects) => {

    const { subjects: subjectsStore } = useEnrolleeStore();

    useEffect(() => {
        getSubjects()
            .then(res => {
                const tmpArr: ISubjectEnrollee[] = res.data.subjects;

                subjectsStore.forEach(sub => {
                    if (sub.result) {
                        for (let i = 0; i < tmpArr.length; i++) {
                            if (sub.subject_id == tmpArr[i].subject_id) {
                                tmpArr[i] = { ...tmpArr[i], result: sub.result }
                            }
                        }
                    }
                })

                setSubjects([...tmpArr])
            })
            .catch(err => console.error("Ошибка при получении предметов", err))
    }, [])

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, subject_id: number) => {
        const tmpArr: ISubjectEnrollee[] = [];
        subjects.forEach(sub => {
            if (sub.subject_id == subject_id) {
                tmpArr.push({ ...sub, result: +e.target.value })
            }
            else {
                tmpArr.push(sub)
            }
        })
        setSubjects([...tmpArr])
    }

    return (
        <div className={s.inner_modal}>
            <h3>Предметы ЕГЭ</h3>
            <ul className={s.subjects}>
                {
                    subjects.map(sub =>
                        <li key={sub.name_subject}>
                            <p key={nanoid()}>{sub.name_subject}</p>
                            <Input
                                type="number"
                                max={100}
                                min={0}
                                placeholder="Баллы"
                                key={sub.subject_id}
                                value={sub.result}
                                onChange={(e) => handleChangeInput(e, sub.subject_id)}
                            />
                        </li>
                    )
                }
            </ul>
            <Button onClick={() => setShowModal(false)}>Сохранить</Button>
        </div>
    )
}
