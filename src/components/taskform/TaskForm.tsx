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
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        if (taskToUpdate) {
            setId(parseInt(taskToUpdate.id));
            setTitle(taskToUpdate.title);
            setDifficulty(taskToUpdate.difficulty);
        }
    }, [taskToUpdate]);

    const addTaskHandler = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (handleUpdate) {  //Editando uma tarefa existente
            handleUpdate(String(id), title, difficulty);

        } else {  //Cria uma nova tarefa
            setId(Math.floor(Math.random() * 1000));
        
            const newTask: ITask = { id: String(id), title, difficulty };

            setTaskList!([...taskList, newTask]);
        }

        setTitle("");
        setDifficulty(0);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else {
            setDifficulty(parseInt(e.target.value));
        }
        console.log(title, difficulty);
    };

    return (
        <form onSubmit={addTaskHandler} className={styles.form}>
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
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade</label>
                <input
                    id="difficulty"
                    type="text"
                    name="difficulty"
                    placeholder="Dificuldade da tarefa"
                    onChange={handleChange}
                    value={difficulty}
                />
            </div>
            <input type="submit" value={buttonText} />
        </form>
    );
};

export default TaskForm;
