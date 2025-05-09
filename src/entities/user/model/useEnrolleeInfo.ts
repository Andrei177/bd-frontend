import { useEffect, useState } from "react";
import { useEnrolleeStore } from "./useEnrolleeStore";
import { getCauseReject, getEnrolleeData } from "../api/enrolleeApi";
import { useUserStore } from "./useUserStore";

export const useEnrolleeInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState({msg: "", show: false});

  const { setAll, enrollee } = useEnrolleeStore();
  const { userId } = useUserStore();
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
              setNotification({msg: r.data.cause_reject, show: true})
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

  return {enrollee, isLoading, message, notification, setNotification};
};
