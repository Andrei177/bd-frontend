import { useEffect, useState } from "react";
import { getAchievements } from "../api/enrolleeApi";
import { FormattedAchievement } from "../api/types";
import { useEnrolleeStore } from "./useEnrolleeStore";

export const useAchievementsInfo = () => {
  const { achievements: achievementsStore, enrollee } = useEnrolleeStore();
  const [visibleAchievements, setVisibleAchievements] = useState<FormattedAchievement[]>([]);
  useEffect(() => {
    getAchievements()
      .then((res) => {
        const tmpArr: FormattedAchievement[] = res.data.achievements;

        achievementsStore.forEach((ach) => {
          if (ach.achievement_id) {
            for (let i = 0; i < tmpArr.length; i++) {
              if (ach.achievement_id == tmpArr[i].achievement_id) {
                tmpArr[i] = { ...ach, checked: true };
              }
            }
          }
        });
        setVisibleAchievements([...tmpArr]);
        console.log("ПОЛУЧИЛИ ДОСТИЖЕНИЯ")
      })
      .catch((err) => console.error("Ошибка при получении достижений", err));
  }, [enrollee.enrollee_id]);

  return { visibleAchievements, setVisibleAchievements }
};
