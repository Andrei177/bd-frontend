import { useEffect, useState } from "react";
import { getSubjects } from "../api/enrolleeApi";
import { useEnrolleeStore } from "./useEnrolleeStore";
import { ISubjectEnrollee } from "./interfaces";

export const useSubjectsInfo = () => {
  const [visibleSubjects, setVisibleSubjects] = useState<ISubjectEnrollee[]>([]);
  const { subjects: subjectsStore, enrollee} = useEnrolleeStore();
  useEffect(() => {
    getSubjects()
      .then((res) => {
        const tmpArr: ISubjectEnrollee[] = res.data.subjects;

        subjectsStore.forEach((sub) => {
          if (sub.result) {
            for (let i = 0; i < tmpArr.length; i++) {
              if (sub.subject_id == tmpArr[i].subject_id) {
                tmpArr[i] = { ...tmpArr[i], result: sub.result };
              }
            }
          }
        });

        setVisibleSubjects([...tmpArr]);
        console.log("ПОЛУЧИЛИ ПРЕДМЕТЫ")
      })
      .catch((err) => console.error("Ошибка при получении предметов", err));
  }, [enrollee.enrollee_id]);

  return {visibleSubjects, setVisibleSubjects}
};
