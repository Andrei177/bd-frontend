import ImageSlider from "react-simple-image-slider"
import s from "./Gallery.module.css"
import { Photo } from "../model/types"

interface IGallery {
    photos: Photo[],
    showGallery: boolean,
    setShowGallery: (bool: boolean) => void
}

export const Gallery = ({ photos, showGallery, setShowGallery }: IGallery) => {
    return (
        <>
            {
                showGallery && <div className={s.gallery}>
                    <div className={s.close_btn} onClick={() => setShowGallery(false)}>Закрыть</div>
                    {
                        photos.length !== 0
                            ? <ImageSlider
                                images={photos}
                                width={"80vw"}
                                height={"80vh"}
                                showBullets={photos.length > 1}
                                showNavs={photos.length > 1}
                            />
                            : <h2>Нет фото</h2>
                    }
                </div>
            }
        </>
    )
}
