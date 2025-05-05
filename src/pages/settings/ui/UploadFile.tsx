import { ChangeEvent, useRef, useState } from "react"
import s from "./UploadFile.module.css"
import { BACKEND_URL } from "../../../shared"

interface IUploadFile {
    file: Blob | string,
    setFile: (file: Blob | string) => void
}

const UploadFile = ({ file, setFile }: IUploadFile) => {

    const ref = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    }
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <div className={s.wrap}>
            {
                typeof file == "string"
                    ? <img src={BACKEND_URL + file} />
                    : <img src={URL.createObjectURL(file)} />
            }
            <input type="file" accept="image/*" className={s.hide_inp} ref={ref} onChange={handleUpload} />
            <p className={s.title} onClick={handleClick}>Нажмите, чтобы прикрепить файл</p>
        </div>
    )
}

export default UploadFile
