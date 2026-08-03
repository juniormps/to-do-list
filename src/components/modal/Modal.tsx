import styles from "./Modal.module.css";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

const Modal = ({ children, isOpen }: Props) => {
    if (!isOpen) return null;

    return (
        <div id="modal" className={styles.modal}>
            <div className={styles.modalContent}>
                {children}
            </div>
            <div className={styles.modalOverlay}>
                <h2>Texto do Modal</h2>
            </div>
        </div>
    );
};

export default Modal;