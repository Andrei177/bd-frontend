import { ChangeEvent, useEffect, useState } from "react"
import { useEnrolleeInfo, useEnrolleeStore } from "../../../entities/enrollee"
import { Button, Input, Loader, Modal, Select } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Lists.module.css"
import { getFaculty } from "../api/api"
import { Faculty } from "../model/types"

export const Lists = () => {

  const { isLoading, enrollee } = useEnrolleeInfo();
  const { subjects } = useEnrolleeStore();
  const [formattedSubjects, setFormattedSubjects] = useState(subjects.map(sub => ({ ...sub, checked: false })))
  const [showModal, setShowModal] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>({ faculty_id: 0, name_faculty: "", directions: [] });

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, subj_id: number) => {
    setFormattedSubjects(formattedSubjects.map(sub => {
      if (sub.subject_id == subj_id) return { ...sub, checked: e.target.checked }
      return sub
    }))
  }
  useEffect(() => {
    setFormattedSubjects(subjects.map(sub => ({ ...sub, checked: false })))
  }, [enrollee.enrollee_id])

  const handleChangeFaculty = (e: ChangeEvent<HTMLSelectElement>) => {
    const facultyId = +e.target.value
    const selected = faculties.find(f => f.faculty_id == facultyId)
    if (selected) setSelectedFaculty(selected)
  }

  const handleSaveSubjectsClick = () => {
    const subjectsIds = formattedSubjects.filter(sub => sub.checked).map(sub => sub.subject_id);

    getFaculty(subjectsIds)
      .then(res => {
        console.log("Ответ при запросе факультетов", res)
        setFaculties(res.data)
      })
      .catch(err => {
        console.error("Ошибка при запросе факультетов", err)
      })

    setShowModal(false);
  }

  return (
    <>
      <Navbar />
      {
        isLoading
          ? <Loader />
          : <>
            <div className={s.container}>
              <h1 className={s.title}>Конкурсные списки</h1>
              <div className={s.choice_block}>
                <p>Выберите предметы ЕГЭ</p>
                <Button onClick={() => setShowModal(true)}>Выбрать</Button>
                <p>Выберите факультет</p>
                <Select options={faculties.map(f => ({ label: f.name_faculty, value: f.faculty_id }))} onChange={handleChangeFaculty} />
                <p>Выберите направление</p>
                <Select options={selectedFaculty.directions?.map(d => ({ label: d.name_direction, value: d.number_direction }))} />
              </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <div className={s.inner_modal}>
                <h2>Предметы ЕГЭ</h2>
                {formattedSubjects.map(sub => (
                  <div className={s.subj_item} key={sub.subject_id}><p>{sub.name_subject}</p><Input type="checkbox" checked={sub.checked} onChange={e => handleChangeChecked(e, sub.subject_id)} /></div>
                ))}
                <Button onClick={handleSaveSubjectsClick}>Сохранить</Button>
              </div>
            </Modal></>
      }
    </>
  )
}