import type { ITask } from "../../interfaces/Task";
import styles from "./TaskList.module.css";

interface Props {
    taskList: ITask[];
    handleDelete(id: string): void;
    handleEdit(task: ITask): void;
    handleToggle(id: string): void;
}

const TaskList = ({ taskList, handleDelete, handleEdit, handleToggle }: Props) => {
    return (
        <>
            {taskList.length > 0 ? (
                taskList.map((task) => (
                    <div className={styles.task} key={task.id}>

                        <div className={styles.details}>
                            <h4 className={task.completed ? styles.completed : ""}>
                                {task.title}
                            </h4>
                            <p>Dificuldade: {task.difficulty}</p>
                        </div>

                        <div className={styles.actions}>
                            
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggle(task.id)}
                                className={styles.checkbox}
                                aria-label="Marcar como concluída"
                            />

                            <button
                                className={styles.icon_btn}
                                onClick={() => handleEdit(task)}
                                aria-label="Editar tarefa"
                            >
                                <i className="bi bi-pencil"></i>
                            </button>

                            <button
                                className={styles.icon_btn}
                                onClick={() => handleDelete(task.id)}
                                aria-label="Excluir tarefa"
                            >
                                <i className="bi bi-trash"></i>
                            </button>

                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhuma tarefa cadastrada.</p>
            )}
        </>
    );
};

export default TaskList;
