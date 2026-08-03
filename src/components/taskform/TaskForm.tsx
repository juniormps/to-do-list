import type { ChangeEvent, SubmitEvent } from "react";
import { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";
import type { ITask } from "../../interfaces/Task";
interface TaskFormProps {
    buttonText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    taskToUpdate?: ITask | null;
    handleUpdate?: (id: string, title: string, difficulty: number) => void;
}

const TaskForm = ({ buttonText, taskList, setTaskList, taskToUpdate, handleUpdate }: TaskFormProps) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [errors, setErrors] = useState<{ title?: string; difficulty?: string }>({});

    useEffect(() => {
        if (taskToUpdate) {
            setId(parseInt(taskToUpdate.id));
            setTitle(taskToUpdate.title);
            setDifficulty(String(taskToUpdate.difficulty));
            setErrors({});
        }
    }, [taskToUpdate]);

    const validate = (): boolean => {
        const newErrors: { title?: string; difficulty?: string } = {};

        if (!title.trim()) {
            newErrors.title = "O título é obrigatório.";
        }

        const difficultyNum = parseInt(difficulty);
        if (!difficulty.trim() || isNaN(difficultyNum) || difficultyNum < 1) {
            newErrors.difficulty = "Informe um número válido maior que zero.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addTaskHandler = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        const difficultyNum = parseInt(difficulty);

        if (handleUpdate) {
            handleUpdate(String(id), title, difficultyNum);

        } else {
            const newTask: ITask = { id: crypto.randomUUID(), title, difficulty: difficultyNum };

            setTaskList!([...taskList, newTask]);
        }

        setTitle("");
        setDifficulty("0");
        setErrors({});
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors({});

        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else {
            setDifficulty(e.target.value);
        }
    };

    return (
        <form onSubmit={addTaskHandler} className={styles.form} noValidate>
            <div className={styles.input_container}>
                <label htmlFor="title">Título</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Título da tarefa"
                    onChange={handleChange}
                    value={title}
                />
                {errors.title && <span className={styles.error}>{errors.title}</span>}
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade</label>
                <input
                    id="difficulty"
                    type="number"
                    name="difficulty"
                    placeholder="Dificuldade da tarefa"
                    onChange={handleChange}
                    value={difficulty}
                    min="1"
                />
                {errors.difficulty && <span className={styles.error}>{errors.difficulty}</span>}
            </div>
            <input type="submit" value={buttonText} />
        </form>
    );
};

export default TaskForm;
