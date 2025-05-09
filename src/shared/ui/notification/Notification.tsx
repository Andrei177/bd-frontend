import s from "./Notification.module.css"

interface INotification {
    notification: { msg: string, show: boolean }
    setNotification: (args: { msg: string, show: boolean }) => void;
}

export const Notification = ({ notification, setNotification }: INotification) => {
    return (
        notification.show && <div className={s.notification_wrap}>
            <p className={s.notification_msg}>{notification.msg}</p>
            <p className={s.close} onClick={() => setNotification({ msg: "", show: false })}>X</p>
        </div>
    )
}