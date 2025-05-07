import { nanoid } from "nanoid"
import { FormattedAchievement } from "../../../entities/enrollee"
import { Button, Input } from "../../../shared"
import s from "./SelectSubjects.module.css"
import { ChangeEvent } from "react"

interface ISelectAchievements {
    achievements: FormattedAchievement[],
    setAchievements: (achivs: FormattedAchievement[]) => void,
    setShowModal: (bool: boolean) => void
}

export const SelectAchievements = ({ achievements, setAchievements, setShowModal }: ISelectAchievements) => {
    
    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, achievement_id: number) => {
        const tmpArr: FormattedAchievement[] = [];
        achievements.forEach(ach => {
            if (ach.achievement_id == achievement_id) {
                tmpArr.push({ ...ach, checked: e.target.checked })
            }
            else {
                tmpArr.push(ach)
            }
        })
        setAchievements([...tmpArr])
    }

    return (
        <div className={s.inner_modal}>
            <h3>Индивидуальные достижения</h3>
            <ul className={s.subjects}>
                {
                    achievements.map(ach =>
                        <li key={ach.name_achievement}>
                            <p key={nanoid()}>{ach.name_achievement}</p>
                            <Input
                                type="checkbox"
                                key={ach.achievement_id}
                                checked={ach.checked}
                                onChange={(e) => handleChangeCheckbox(e, ach.achievement_id)}
                            />
                        </li>
                    )
                }
            </ul>
            <Button onClick={() => setShowModal(false)}>Сохранить</Button>
        </div>
    )
}
