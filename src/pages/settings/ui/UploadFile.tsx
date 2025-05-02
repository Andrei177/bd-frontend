import { ChangeEvent, useRef } from "react"
import s from "./UploadFile.module.css"

const UploadFile = () => {

    const ref = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    }
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0]);
        }
    }

    return (
        <div className={s.wrap}>
            <input type="file" accept="image/*" className={s.hide_inp} ref={ref} onChange={handleUpload} />
            <p className={s.title} onClick={handleClick}>Нажмите, чтобы прикрепить файл</p>
        </div>
    )
}

export default UploadFile
