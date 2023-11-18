import css from "./ImageGalleryItem.module.css";
import { useState } from "react";
import { ImgModal } from "../Modal/Modal";


export const ImageGalleryItem = ({ image, largeImage, tags }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModal = () => {
        setModalIsOpen(prevState => !prevState);
    };

    return (
        <>
            <li className={css.imageGalleryItem} onClick={handleModal}>
                <img className={css.imageGalleryItemImage} src={image} alt={tags} />
            </li>
            {modalIsOpen && <ImgModal isOpen={modalIsOpen} onClose={handleModal} largeImg={largeImage} tags={tags} />}
        </>
    )
};
