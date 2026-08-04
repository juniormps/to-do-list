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
                            />
                            <i
                                className="bi bi-pencil"
                                onClick={() => handleEdit(task)}
                            ></i>
                            <i
                                className="bi bi-trash"
                                onClick={() => handleDelete(task.id)}
                            ></i>
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
