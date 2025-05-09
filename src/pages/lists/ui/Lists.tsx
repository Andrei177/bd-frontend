import { ChangeEvent, useEffect, useState } from "react"
import { useEnrolleeInfo, useEnrolleeStore } from "../../../entities/user"
import { Button, Input, Loader, Modal, Notification, Select } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Lists.module.css"
import { getCompetitionList, getFaculty, sendRequestOnDirection } from "../api/api"
import { CompetititonListItem, Direction, Faculty } from "../model/types"
import { AxiosError } from "axios"
import cn from "classnames"

export const Lists = () => {

  const { isLoading, enrollee } = useEnrolleeInfo();
  const { subjects } = useEnrolleeStore();

  const [notificationAfterRequest, setNotificationAfterRequest] = useState({msg: "", show: false});

  const [list, setList] = useState<CompetititonListItem[]>([]);
  const [formattedSubjects, setFormattedSubjects] = useState(subjects.map(sub => ({ ...sub, checked: false })))
  const [showModal, setShowModal] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>({ faculty_id: 0, name_faculty: "", directions: [] });
  const [selectedDirection, setSelectedDirection] = useState<Direction>({ direction_id: 0, number_direction: "", name_direction: "", plan: 0, subjects: [] });

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, subj_id: number) => {
    setFormattedSubjects(formattedSubjects.map(sub => {
      if (sub.subject_id == subj_id) return { ...sub, checked: e.target.checked }
      return sub
    }))
  }

  const handleChangeFaculty = (e: ChangeEvent<HTMLSelectElement>) => {
    const facultyId = +e.target.value
    const selected = faculties.find(f => f.faculty_id == facultyId)
    if (selected) {
      setSelectedFaculty(selected)
      if (selected.directions[0]) setSelectedDirection(selected.directions[0])
    }
  }
  const handleChangeDirection = (e: ChangeEvent<HTMLSelectElement>) => {
    const directionId = +e.target.value
    const selected = selectedFaculty.directions.find(d => d.direction_id == directionId)
    if (selected) setSelectedDirection(selected)
  }

  const handleSaveSubjectsClick = () => {
    const subjectsIds = formattedSubjects.filter(sub => sub.checked).map(sub => sub.subject_id);

    getFaculty(subjectsIds)
      .then(res => {
        console.log("Ответ при запросе факультетов", res)
        setFaculties(res.data)
        if (res.data[0]) {
          setSelectedFaculty(res.data[0])
          if (res.data[0].directions[0]) setSelectedDirection(res.data[0].directions[0])
        }
      })
      .catch(err => {
        console.error("Ошибка при запросе факультетов", err)
      })

    setShowModal(false);
  }

  const handleSendRequest = () => {
    sendRequestOnDirection(enrollee.enrollee_id, selectedDirection.direction_id)
    .then(res => {
      console.log("Ответ при подаче заявки на направление", res)
      if(res.data.success) setNotificationAfterRequest({msg: res.data.message, show: true})
      getList()
    })
    .catch(err => {
      console.log("Ошибка при подаче заявки на направление", err)
      if(err instanceof AxiosError && err.response?.data.message){
        setNotificationAfterRequest({msg: err.response?.data.message, show: true})
      }
    })
  }

  const getList = () => {
    if (selectedDirection.direction_id != 0) {
      getCompetitionList(selectedDirection.direction_id)
        .then(res => {
          console.log("Конкурсный список направления", res)
          setList(res.data)
        })
        .catch(err => {
          console.error("Ошибка при получении конкурсного списка", err)
        })
    }
  }

  useEffect(() => {
    setFormattedSubjects(subjects.map(sub => ({ ...sub, checked: false })))
  }, [enrollee.enrollee_id])

  useEffect(() => {
    getList();
  }, [selectedDirection])

  return (
    <>
      <Navbar />
      <Notification notification={notificationAfterRequest} setNotification={setNotificationAfterRequest}/>
      {
        isLoading
          ? <Loader />
          : <>
            <div className={s.container}>
              <h1 className={s.title}>Конкурсные списки</h1>
              <div className={s.choice_block}>
                <div>
                  <p>Выберите предметы ЕГЭ</p>
                  <Button onClick={() => setShowModal(true)}>Выбрать</Button>
                </div>
                <div>
                  <p>Выберите факультет</p>
                  <Select options={faculties.map(f => ({ label: f.name_faculty, value: f.faculty_id }))} onChange={handleChangeFaculty} />
                </div>
                <div>
                  <p>Выберите направление</p>
                  <Select
                    options={selectedFaculty.directions?.map(d => ({ label: d.name_direction, value: d.direction_id }))}
                    onChange={handleChangeDirection}
                  />
                  {
                    enrollee.status == "approve"
                    && <Button className={s.request_btn} onClick={handleSendRequest}>Подать заявку</Button>
                  }
                </div>
              </div>
              {
                !!selectedDirection.direction_id
                && <div className={s.direction_wrap}>
                  <div className={s.direction_info}>
                    <p>Направление: <span>{selectedDirection.number_direction} {selectedDirection.name_direction}</span></p>
                    <p>План набора: <span>{selectedDirection.plan}</span></p>
                    <p>Минимальные баллы ЕГЭ: 
                      <ul className={s.subjects_list}>
                        {selectedDirection.subjects.map(s => (
                          <li key={s.subject_id}>{s.name_subject}: {s.min_result}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                  <div className={s.list}>
                    {
                      list.length > 0
                        ? list.map((item, i) => (
                          <p className={cn(s.list_item, item.enrollee_id == enrollee.enrollee_id && s.me)} key={item.enrollee_id}>{i + 1}. {item.full_name} {item.total_score}</p>
                        ))
                        : <h3>Пока нет абитуриентов на этом направлении</h3>
                    }
                  </div>
                </div>
              }
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