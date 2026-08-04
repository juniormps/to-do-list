import { useEffect } from "react";
import styles from "./Modal.module.css";

interface Props {
    children: React.ReactNode;
    show: boolean;
    onClose(): void;
    title: string;
}

const Modal = ({ children, show, onClose, title }: Props) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (show) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div id="modal">
            <div className={styles.fade} onClick={onClose}></div>
            
            <div className={styles.modal}>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
