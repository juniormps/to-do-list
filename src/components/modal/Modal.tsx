import styles from "./Modal.module.css";

interface Props {
    children: React.ReactNode;
    show: boolean;
    onClose(): void;
}

const Modal = ({ children, show, onClose }: Props) => {
    if (!show) return null;

    return (
        <div id="modal">
            <div className={styles.fade} onClick={onClose}>
            </div>
            <div className={styles.modal}>
                <h2>Editar Tarefa</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;