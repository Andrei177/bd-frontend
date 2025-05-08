import { useEffect, useState } from "react";
import { useEnrolleeStore } from "./useEnrolleeStore";
import { getCauseReject, getEnrolleeData } from "../api/enrolleeApi";
import { useUserStore } from "./useUserStore";

export const useEnrolleeInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAll, enrollee } = useEnrolleeStore();
  const { userId } = useUserStore();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!enrollee.enrollee_id) {
      setIsLoading(true);
      getEnrolleeData(userId)
        .then((res) => {
          setAll(res.data);
          console.log("Ответ при получении данных абитуриента", res);
          if(res.data.enrollee.status == 'reject'){
            getCauseReject()
            .then(r => {
              console.log("Ответ на запрос причины отклонения данных", r)
              alert(r.data.cause_reject)
            })
            .catch(e => {
              console.log("Ошибка на запрос причины отклонения данных", e)
            })
          }
        })
        .catch((err) => {
          console.error("Ошибка при получении данных абитуриента", err);
          setMessage("Данные не найдены");
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return {enrollee, isLoading, message};
};
