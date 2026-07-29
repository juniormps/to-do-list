import styles from "./TaskForm.module.css";
import { ITask } from "../../interfaces/Task";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
interface TaskFormProps {
    btnText: string;
    buttonText: string;
}

const TaskForm = ({ buttonText }: TaskFormProps) => {

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        setId(Math.floor(Math.random() * 1000));
    }, []);

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title, difficulty);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title") {
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
                    type="text"
                    name="title"
                    placeholder="Título da tarefa"
                    onChange={handleChange}
                />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade</label>
                <input
                    type="text"
                    name="difficulty"
                    placeholder="Dificuldade da tarefa"
                    onChange={handleChange}
                />
            </div>
            <input type="submit" value={buttonText} />
        </form>
    );
};

export default TaskForm;
