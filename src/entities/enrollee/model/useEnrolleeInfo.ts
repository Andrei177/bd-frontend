import { useEffect, useState } from "react";
import { useEnrolleeStore } from "./useEnrolleeStore";
import { getEnrolleeData } from "../api/enrolleeApi";

export const useEnrolleeInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAll, enrollee } = useEnrolleeStore();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!enrollee.enrollee_id) {
      setIsLoading(true);
      getEnrolleeData()
        .then((res) => {
          setAll(res.data);
          console.log("Ответ при получении данных абитуриента", res);
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
